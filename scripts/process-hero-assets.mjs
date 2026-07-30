import path from 'node:path'
import sharp from 'sharp'

const [artifactSource, metatronSource] = process.argv.slice(2)

if (!artifactSource || !metatronSource) {
  throw new Error('Usage: node scripts/process-hero-assets.mjs <artifact-chroma.png> <metatron-source.png>')
}

const root = process.cwd()

async function extractMagenta(source) {
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i]
    const green = data[i + 1]
    const blue = data[i + 2]
    const distance = Math.hypot(255 - red, green, 255 - blue)
    const magentaExcess = (red + blue) / 2 - green
    const distanceAlpha = Math.max(0, Math.min(1, (distance - 30) / 72))
    const hueAlpha = Math.max(0, Math.min(1, (115 - magentaExcess) / 95))
    const extractionAlpha = Math.min(distanceAlpha, hueAlpha)
    const alpha = Math.max(0, Math.min(1, (extractionAlpha - 0.42) / 0.58))

    if (alpha > 0.02 && extractionAlpha < 0.995) {
      data[i] = Math.max(0, Math.min(255, (red - 255 * (1 - extractionAlpha)) / extractionAlpha))
      data[i + 1] = Math.max(0, Math.min(255, green / extractionAlpha))
      data[i + 2] = Math.max(0, Math.min(255, (blue - 255 * (1 - extractionAlpha)) / extractionAlpha))

      const neutralEdgeLimit = data[i + 1] * 1.18 + 10
      data[i] = Math.min(data[i], neutralEdgeLimit)
      data[i + 2] = Math.min(data[i + 2], neutralEdgeLimit)
    }
    data[i + 3] = Math.round(alpha * 255)
  }

  await sharp(data, { raw: info })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({
      width: 768,
      height: 768,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(path.join(root, 'public', 'automation-artifact.webp'))
}

async function extractMetatron(source) {
  const { data, info } = await sharp(source)
    .extract({ left: 38, top: 555, width: 484, height: 484 })
    .resize(512, 512)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const output = Buffer.alloc(info.width * info.height * 4)

  for (let sourceIndex = 0, targetIndex = 0; sourceIndex < data.length; sourceIndex += 3, targetIndex += 4) {
    const red = data[sourceIndex]
    const green = data[sourceIndex + 1]
    const blue = data[sourceIndex + 2]
    const warmthPenalty = Math.max(0, blue - red) * 0.65
    const lineSignal = red - warmthPenalty
    const alpha = Math.max(0, Math.min(145, (lineSignal - 62) * 3.4))

    output[targetIndex] = 224
    output[targetIndex + 1] = 228
    output[targetIndex + 2] = 218
    output[targetIndex + 3] = Math.round(alpha)
  }

  await sharp(output, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, palette: true })
    .toFile(path.join(root, 'public', 'metatron-cube.png'))
}

await Promise.all([
  extractMagenta(artifactSource),
  extractMetatron(metatronSource),
])

console.log('Hero assets generated.')
