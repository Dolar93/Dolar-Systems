import path from 'node:path'
import sharp from 'sharp'

const inputs = process.argv.slice(2)
if (inputs.length !== 6) {
  throw new Error(
    'Usage: node scripts/process-courtyard-sprites.mjs <gateway> <rail> <relay> <circuit> <spine> <rune-core>',
  )
}

const root = process.cwd()
const jobs = [
  [inputs[0], 'courtyard-gateway.webp', 1024, 512],
  [inputs[1], 'courtyard-data-rail.webp', 1024, 512],
  [inputs[2], 'courtyard-relay-core.webp', 768, 768],
  [inputs[3], 'courtyard-living-circuit.webp', 768, 768],
  [inputs[4], 'courtyard-data-spine.webp', 512, 1024],
  [inputs[5], 'courtyard-rune-core.webp', 768, 768],
]

async function removeMagenta(source, outputName, width, height) {
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  let minX = info.width
  let minY = info.height
  let maxX = 0
  let maxY = 0

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const index = (y * info.width + x) * 4
      const red = data[index]
      const green = data[index + 1]
      const blue = data[index + 2]
      const magentaDominance = (red + blue) / 2 - green
      const looksLikeKey = red > 145 && blue > 125
      const alpha = looksLikeKey && magentaDominance > 18 ? 0 : 255

      data[index + 3] = alpha
      if (alpha > 20) {
        minX = Math.min(minX, x)
        minY = Math.min(minY, y)
        maxX = Math.max(maxX, x)
        maxY = Math.max(maxY, y)
      }
    }
  }

  if (minX > maxX || minY > maxY) {
    throw new Error(`No foreground object detected in ${source}`)
  }

  const contentWidth = maxX - minX + 1
  const contentHeight = maxY - minY + 1
  const padding = Math.round(Math.max(contentWidth, contentHeight) * 0.045)
  const left = Math.max(0, minX - padding)
  const top = Math.max(0, minY - padding)
  const right = Math.min(info.width - 1, maxX + padding)
  const bottom = Math.min(info.height - 1, maxY + padding)

  const { data: resizedData, info: resizedInfo } = await sharp(data, { raw: info })
    .extract({
      left,
      top,
      width: right - left + 1,
      height: bottom - top + 1,
    })
    .resize({
      width,
      height,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      withoutEnlargement: false,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let index = 0; index < resizedData.length; index += 4) {
    const red = resizedData[index]
    const green = resizedData[index + 1]
    const blue = resizedData[index + 2]
    const alpha = resizedData[index + 3]
    const magentaDominance = (red + blue) / 2 - green
    if (alpha < 190 || (red > 140 && blue > 120 && magentaDominance > 35)) {
      resizedData[index] = 0
      resizedData[index + 1] = 0
      resizedData[index + 2] = 0
      resizedData[index + 3] = 0
    }
  }

  await sharp(resizedData, { raw: resizedInfo })
    .webp({ lossless: true, effort: 6 })
    .toFile(path.join(root, 'public', outputName))
}

for (const [source, outputName, width, height] of jobs) {
  await removeMagenta(source, outputName, width, height)
}

console.log('Courtyard sprites generated.')
