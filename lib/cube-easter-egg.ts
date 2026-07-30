export type CubeStage = 0 | 1 | 2 | 3

const CUBE_IMAGES = [
  '/cube-off.webp',
  '/cube-runes.webp',
  '/cube-fire.webp',
  '/cube-fire.webp',
] as const

export function nextCubeStage(stage: CubeStage): CubeStage {
  return Math.min(stage + 1, 3) as CubeStage
}

export function cubeImageForStage(stage: CubeStage): string {
  return CUBE_IMAGES[stage]
}

export function isPageIgnited(stage: CubeStage): boolean {
  return stage === 3
}
