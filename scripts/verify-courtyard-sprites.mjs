import assert from 'node:assert/strict'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const sprites = [
  ['courtyard-gateway.webp', 1024, 512],
  ['courtyard-data-rail.webp', 1024, 512],
  ['courtyard-relay-core.webp', 768, 768],
  ['courtyard-living-circuit.webp', 768, 768],
  ['courtyard-data-spine.webp', 512, 1024],
  ['courtyard-rune-core.webp', 768, 768],
]

for (const [filename, width, height] of sprites) {
  const source = path.join(root, 'public', filename)
  const metadata = await sharp(source).metadata()
  assert.equal(metadata.width, width, `${filename} has the wrong width`)
  assert.equal(metadata.height, height, `${filename} has the wrong height`)
  assert.equal(metadata.hasAlpha, true, `${filename} must have transparency`)

  const corners = await sharp(source)
    .ensureAlpha()
    .extract({ left: 0, top: 0, width: 1, height: 1 })
    .raw()
    .toBuffer()
  assert.equal(corners[3], 0, `${filename} must have a transparent corner`)

  const { data } = await sharp(source)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
  let visiblePixels = 0
  let magentaPixels = 0
  for (let index = 0; index < data.length; index += 4) {
    if (data[index + 3] <= 20) continue
    visiblePixels += 1
    const magentaDominance = (data[index] + data[index + 2]) / 2 - data[index + 1]
    if (data[index] > 140 && data[index + 2] > 120 && magentaDominance > 45) {
      magentaPixels += 1
    }
  }
  assert.ok(
    magentaPixels / visiblePixels < 0.001,
    `${filename} still contains a magenta fringe`,
  )
}

console.log('Courtyard sprite assets are valid.')
