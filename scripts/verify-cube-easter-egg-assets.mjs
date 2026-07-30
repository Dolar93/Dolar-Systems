import assert from 'node:assert/strict'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const cubeFiles = ['cube-off.webp', 'cube-runes.webp', 'cube-fire.webp']

for (const filename of cubeFiles) {
  const metadata = await sharp(path.join(root, 'public', filename)).metadata()
  assert.equal(metadata.width, 768, `${filename} must be 768px wide`)
  assert.equal(metadata.height, 768, `${filename} must be 768px high`)
  assert.equal(metadata.hasAlpha, true, `${filename} must preserve transparency`)
}

const fire = await sharp(path.join(root, 'public', 'rune-fire-sheet.webp')).metadata()
assert.equal(fire.width, 2912)
assert.equal(fire.height, 1440)
assert.equal(fire.hasAlpha, true, 'rune-fire-sheet.webp must have a transparent background')

const transparentCorner = await sharp(path.join(root, 'public', 'rune-fire-sheet.webp'))
  .ensureAlpha()
  .extract({ left: 0, top: 0, width: 1, height: 1 })
  .raw()
  .toBuffer()
assert.equal(transparentCorner[3], 0, 'rune-fire-sheet.webp background must be transparent')

async function alphaCoverage(frame) {
  const left = (frame % 4) * 728
  const top = Math.floor(frame / 4) * 720
  const { data, info } = await sharp(path.join(root, 'public', 'rune-fire-sheet.webp'))
    .extract({ left, top, width: 728, height: 720 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  let visiblePixels = 0
  for (let index = 3; index < data.length; index += 4) {
    if (data[index] > 16) visiblePixels += 1
  }
  return visiblePixels / (info.width * info.height)
}

const [firstFrameCoverage, replacementFrameCoverage] = await Promise.all([
  alphaCoverage(0),
  alphaCoverage(7),
])
assert.ok(
  Math.abs(firstFrameCoverage - replacementFrameCoverage) < 0.01,
  'The damaged eighth fire frame must be replaced with a complete frame',
)

console.log('Cube and rune-fire assets are valid.')
