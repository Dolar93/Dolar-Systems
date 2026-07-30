import { access, readFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const courtyardPath = path.join(root, 'components', 'ui', 'Courtyard.tsx')
const heroPath = path.join(root, 'components', 'sections', 'Hero.tsx')
const interactiveCubePath = path.join(root, 'components', 'ui', 'InteractiveAutomationCube.tsx')
const runeFireSpritePath = path.join(root, 'components', 'ui', 'RuneFireSprite.tsx')

await Promise.all([access(interactiveCubePath), access(runeFireSpritePath)])

const [courtyard, hero, interactiveCube, runeFireSprite] = await Promise.all([
  readFile(courtyardPath, 'utf8'),
  readFile(heroPath, 'utf8'),
  readFile(interactiveCubePath, 'utf8'),
  readFile(runeFireSpritePath, 'utf8'),
])

if (!courtyard.includes('InteractiveAutomationCube')) {
  throw new Error('Courtyard must render InteractiveAutomationCube')
}
if (courtyard.includes('/metatron-cube.png') || courtyard.includes("k: 'pool'")) {
  throw new Error('The Metatron pool tile must be removed')
}
if (courtyard.includes("k: 'slate'") || courtyard.includes("k: 'moss'")) {
  throw new Error('Legacy colored placeholder slabs must be removed')
}
if (!courtyard.includes("{ c: 1,  r: 3, cs: 2, rs: 2, k: 'artifact' }")) {
  throw new Error('The interactive cube must occupy the former Metatron tile')
}
for (const sprite of [
  '/courtyard-gateway.webp',
  '/courtyard-data-rail.webp',
  '/courtyard-relay-core.webp',
  '/courtyard-living-circuit.webp',
  '/courtyard-data-spine.webp',
  '/courtyard-rune-core.webp',
]) {
  if (!courtyard.includes(sprite)) {
    throw new Error(`Courtyard must render ${sprite}`)
  }
}
if (courtyard.includes('/automation-artifact.webp')) {
  throw new Error('Courtyard still references the legacy automation artifact')
}
if (!/className="pointer-events-none absolute inset-0"\s+style=\{\{ background: 'radial-gradient/.test(courtyard)) {
  throw new Error('Courtyard vignette must not intercept cube clicks')
}
if (!interactiveCube.includes('nextCubeStage') || !interactiveCube.includes('motion.button')) {
  throw new Error('Interactive cube must use the click-state model and button semantics')
}
if (interactiveCube.includes('await controls.start')) {
  throw new Error('Cube state changes must not wait on an interruptible hover animation')
}
if (!hero.includes('RuneFireSprite') || !hero.includes('easterEggIgnited')) {
  throw new Error('Hero must render the rune-fire sheet after the third click')
}
if (!runeFireSprite.includes("mixBlendMode: 'normal'")) {
  throw new Error('Transparent rune fire must retain its green color over light stone')
}
if (courtyard.includes('Lilia') || courtyard.includes('M50 78 C34')) {
  throw new Error('Legacy lotus artwork is still present')
}

console.log('Hero assets and Courtyard integration are valid.')
