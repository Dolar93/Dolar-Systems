import assert from 'node:assert/strict'
import {
  cubeImageForStage,
  isPageIgnited,
  nextCubeStage,
} from '../lib/cube-easter-egg.ts'

assert.equal(nextCubeStage(0), 1)
assert.equal(nextCubeStage(1), 2)
assert.equal(nextCubeStage(2), 3)
assert.equal(nextCubeStage(3), 3)

assert.equal(cubeImageForStage(0), '/cube-off.webp')
assert.equal(cubeImageForStage(1), '/cube-runes.webp')
assert.equal(cubeImageForStage(2), '/cube-fire.webp')
assert.equal(cubeImageForStage(3), '/cube-fire.webp')

assert.equal(isPageIgnited(0), false)
assert.equal(isPageIgnited(2), false)
assert.equal(isPageIgnited(3), true)

console.log('Cube easter-egg state model is valid.')
