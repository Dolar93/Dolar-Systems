'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const NODE_COUNT = 240
const NEIGHBORS = 4 // edges per node — keeps the mesh dense but legible

/* ── Brain-shaped node cloud: two overlapping lobes, points biased
   toward the outer shell so it reads as a folded cortex rather than
   a solid random blob. ──────────────────────────────────────────── */
function generateBrainNodes(count: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  const ax = 1.55, ay = 1.05, az = 1.3
  for (let i = 0; i < count; i++) {
    const side = i % 2 === 0 ? -1 : 1
    const u = Math.random()
    const v = Math.random()
    const theta = 2 * Math.PI * u
    const phi = Math.acos(2 * v - 1)
    const rShell = 0.5 + Math.random() * 0.5
    const sx = Math.sin(phi) * Math.cos(theta)
    const sy = Math.sin(phi) * Math.sin(theta)
    const sz = Math.cos(phi)
    pts.push(
      new THREE.Vector3(
        side * 0.5 + sx * ax * rShell,
        sy * ay * rShell * 0.85 + 0.25,
        sz * az * rShell,
      ),
    )
  }
  return pts
}

/* ── Connect each node to its k nearest neighbours — bounded edge
   count, reads as an organised network rather than a hairball. ──── */
function buildEdges(nodes: THREE.Vector3[], k: number): [number, number][] {
  const edges = new Set<string>()
  for (let i = 0; i < nodes.length; i++) {
    const dists = nodes
      .map((p, j) => ({ j, d: i === j ? Infinity : nodes[i].distanceTo(p) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
    for (const { j } of dists) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      edges.add(key)
    }
  }
  return [...edges].map((key) => {
    const [a, b] = key.split('-').map(Number)
    return [a, b]
  })
}

/* ── Soft circular sprite, drawn on an offscreen canvas — no network
   font/texture fetch, so it can never silently fail to load. ────── */
function useStarSprite() {
  return useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.4, 'rgba(255,255,255,0.6)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])
}

/* ── Ambient background starfield ─────────────────────────────────── */
function Starfield({ sprite }: { sprite: THREE.Texture }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const n = 500
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 24
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14 + 1.5
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.5}
        color="#F5F3EF"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ── The neural network — nodes + synapses, forming a brain shape ── */
function NeuralBrain({ sprite, started }: { sprite: THREE.Texture; started: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const edgeMatRef = useRef<THREE.LineBasicMaterial>(null)
  const nodeMatRef = useRef<THREE.PointsMaterial>(null)
  const t0 = useRef<number | null>(null)

  const nodes = useMemo(() => generateBrainNodes(NODE_COUNT), [])
  const edges = useMemo(() => buildEdges(nodes, NEIGHBORS), [nodes])

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3)
    nodes.forEach((p, i) => {
      arr[i * 3 + 0] = p.x
      arr[i * 3 + 1] = p.y
      arr[i * 3 + 2] = p.z
    })
    return arr
  }, [nodes])

  const edgePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 2 * 3)
    edges.forEach(([a, b], i) => {
      const pa = nodes[a]
      const pb = nodes[b]
      arr[i * 6 + 0] = pa.x; arr[i * 6 + 1] = pa.y; arr[i * 6 + 2] = pa.z
      arr[i * 6 + 3] = pb.x; arr[i * 6 + 4] = pb.y; arr[i * 6 + 5] = pb.z
    })
    return arr
  }, [nodes, edges])

  useFrame(({ clock }) => {
    if (!groupRef.current || !edgeMatRef.current || !nodeMatRef.current) return
    const el = clock.getElapsedTime()

    if (!started) {
      groupRef.current.scale.setScalar(0.001)
      edgeMatRef.current.opacity = 0
      nodeMatRef.current.opacity = 0
      return
    }
    if (t0.current === null) t0.current = el
    const t = Math.min((el - t0.current) / 1.4, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    groupRef.current.scale.setScalar(0.35 + eased * 0.65)

    const breathe = Math.sin(el * 0.9) * 0.08
    edgeMatRef.current.opacity = eased * (0.4 + breathe)
    nodeMatRef.current.opacity = eased * (0.95 + breathe * 0.4)

    groupRef.current.rotation.y += 0.0016
  })

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={edgeMatRef}
          color="#C9A84C"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={nodeMatRef}
          map={sprite}
          size={0.15}
          sizeAttenuation
          transparent
          opacity={0}
          color="#FFF6DE"
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

function Scene({ started }: { started: boolean }) {
  const sprite = useStarSprite()
  return (
    <>
      <color attach="background" args={['#070B18']} />
      <fog attach="fog" args={['#070B18', 9, 22]} />
      <ambientLight intensity={0.4} />

      <Starfield sprite={sprite} />
      <NeuralBrain sprite={sprite} started={started} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 3.2}
        target={[0, 0.3, 0]}
      />
    </>
  )
}

export function ProfitChart3D() {
  const [started, setStarted] = useState(false)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Measure the container ourselves — some environments don't fire the
  // resize-observer R3F relies on internally to size the <canvas>.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      if (r.width > 0 && r.height > 0) setSize({ w: r.width, h: r.height })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    const nudge = setTimeout(() => window.dispatchEvent(new Event('resize')), 50)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(nudge) }
  }, [])

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      {size && (
        <Canvas
          style={{ width: size.w, height: size.h, display: 'block' }}
          camera={{ position: [4.6, 1.9, 6.6], fov: 42 }}
          gl={{ alpha: false, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <Scene started={started} />
        </Canvas>
      )}
    </div>
  )
}
