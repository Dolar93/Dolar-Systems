'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 110
const SPREAD = 18
const DEPTH = 6
const CONNECT_DIST = 3.8

function ParticleNetwork() {
  const groupRef = useRef<THREE.Group>(null)

  const { points, lines } = useMemo(() => {
    const pts = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pts[i * 3 + 0] = (Math.random() - 0.5) * SPREAD
      pts[i * 3 + 1] = (Math.random() - 0.5) * SPREAD
      pts[i * 3 + 2] = (Math.random() - 0.5) * DEPTH
    }

    const lineVerts: number[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = pts[i * 3] - pts[j * 3]
        const dy = pts[i * 3 + 1] - pts[j * 3 + 1]
        const dz = pts[i * 3 + 2] - pts[j * 3 + 2]
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < CONNECT_DIST) {
          lineVerts.push(
            pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2],
            pts[j * 3], pts[j * 3 + 1], pts[j * 3 + 2],
          )
        }
      }
    }

    return { points: pts, lines: new Float32Array(lineVerts) }
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime() * 0.035
    groupRef.current.rotation.y = t
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.08
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#00D4FF"
          size={0.055}
          transparent
          opacity={0.55}
          sizeAttenuation
        />
      </points>

      {lines.length > 0 && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[lines, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#00D4FF" transparent opacity={0.1} />
        </lineSegments>
      )}
    </group>
  )
}

export default function GridBackground() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 58 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ParticleNetwork />
      </Canvas>
    </div>
  )
}
