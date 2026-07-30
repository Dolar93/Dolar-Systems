import path from 'node:path'
import sharp from 'sharp'

const [offSource, runesSource, fireSource, flameSheetSource] = process.argv.slice(2)

if (!offSource || !runesSource || !fireSource || !flameSheetSource) {
  throw new Error(
    'Usage: node scripts/process-cube-easter-egg-assets.mjs <off.png> <runes.png> <fire.png> <flames.png>',
  )
}

const root = process.cwd()
const crop = { left: 150, top: 50, width: 1748, height: 1748 }
const cubePolygon = [
  [1024, 365],
  [1675, 720],
  [1675, 1358],
  [1038, 1720],
  [380, 1358],
  [380, 720],
]

function pointInPolygon(x, y, polygon) {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]
    const intersects = yi > y !== yj > y
      && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersects) inside = !inside
  }
  return inside
}

function distanceToSegment(x, y, ax, ay, bx, by) {
  const dx = bx - ax
  const dy = by - ay
  const lengthSquared = dx * dx + dy * dy
  const t = lengthSquared === 0
    ? 0
    : Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / lengthSquared))
  return Math.hypot(x - (ax + t * dx), y - (ay + t * dy))
}

function distanceToPolygon(x, y, polygon) {
  let distance = Infinity
  for (let i = 0; i < polygon.length; i++) {
    const [ax, ay] = polygon[i]
    const [bx, by] = polygon[(i + 1) % polygon.length]
    distance = Math.min(distance, distanceToSegment(x, y, ax, ay, bx, by))
  }
  return distance
}

async function extractCube(source, outputName, emissionMode) {
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const index = (y * info.width + x) * 4
      const red = data[index]
      const green = data[index + 1]
      const blue = data[index + 2]
      const insideCube = pointInPolygon(x, y, cubePolygon)
      const edgeDistance = insideCube ? 0 : distanceToPolygon(x, y, cubePolygon)

      let alpha = insideCube ? 255 : Math.max(0, 255 - edgeDistance * 510)

      if (!insideCube && emissionMode === 'flame') {
        const greenExcess = green - (red + blue) / 2
        const flameZone = x > 550 && x < 1500 && y < 720
        const brightCore = flameZone ? Math.max(0, (Math.max(red, green, blue) - 180) * 3) : 0
        const greenGlow = flameZone ? Math.max(0, (greenExcess - 24) * 8) : 0
        alpha = Math.max(alpha, Math.min(240, Math.max(brightCore, greenGlow)))
      }

      if (x > 1690 && y > 1650) alpha = 0
      data[index + 3] = Math.round(alpha)
    }
  }

  await sharp(data, { raw: info })
    .extract(crop)
    .resize({
      width: 768,
      height: 768,
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(path.join(root, 'public', outputName))
}

async function extractFlameSheet(source) {
  const { data, info } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let index = 0; index < data.length; index += 4) {
    const maximum = Math.max(data[index], data[index + 1], data[index + 2])

    if (maximum <= 7) {
      data[index] = 0
      data[index + 1] = 0
      data[index + 2] = 0
      data[index + 3] = 0
      continue
    }

    const alpha = Math.min(255, Math.round((maximum - 5) * 1.02))
    const unpremultiply = 255 / Math.max(alpha, 1)
    data[index] = Math.min(255, Math.round(data[index] * unpremultiply))
    data[index + 1] = Math.min(255, Math.round(data[index + 1] * unpremultiply))
    data[index + 2] = Math.min(255, Math.round(data[index + 2] * unpremultiply))
    data[index + 3] = alpha
  }

  // The eighth source cell contains Gemini's watermark, which becomes a dead
  // transparent patch after background removal. Reuse the complete first frame;
  // it also gives the animation a clean bridge back to the beginning of the loop.
  const frameWidth = info.width / 4
  const frameHeight = info.height / 2
  for (let y = 0; y < frameHeight; y++) {
    const sourceStart = y * info.width * 4
    const sourceEnd = sourceStart + frameWidth * 4
    const destinationStart = ((frameHeight + y) * info.width + frameWidth * 3) * 4
    data.copy(data, destinationStart, sourceStart, sourceEnd)
  }

  await sharp(data, { raw: info })
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(path.join(root, 'public', 'rune-fire-sheet.webp'))
}

await Promise.all([
  extractCube(offSource, 'cube-off.webp', 'none'),
  extractCube(runesSource, 'cube-runes.webp', 'none'),
  extractCube(fireSource, 'cube-fire.webp', 'none'),
  extractFlameSheet(flameSheetSource),
])

console.log('Cube easter-egg assets generated.')
