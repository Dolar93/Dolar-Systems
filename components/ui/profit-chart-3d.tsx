'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Line } from '@react-three/drei'
import * as THREE from 'three'

/* ── Data: illustrative growth in monthly savings after automation ── */
const DATA = [
  { label: 'M1', value: 2.4 },
  { label: 'M2', value: 5.2 },
  { label: 'M3', value: 8.6 },
  { label: 'M4', value: 12.1 },
  { label: 'M5', value: 15.9 },
  { label: 'M6', value: 19.8 },
]
const MAX_VALUE = 21
const BAR_H = 4
const SPACING = 1.2
const GOLD = '#C9A84C'
const NAVY = '#1A2B47'
const CREAM = '#F5F3EF'
const MUTED = '#8A9AB5'

function barX(i: number) {
  return (i - (DATA.length - 1) / 2) * SPACING
}
function barHeight(value: number) {
  return (value / MAX_VALUE) * BAR_H + 0.1
}

/* ── Single animated column ──────────────────────────────────────── */
function Bar({ index, value, started }: { index: number; value: number; started: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const t0 = useRef<number | null>(null)
  const targetH = barHeight(value)
  const x = barX(index)

  useFrame(({ clock }) => {
    if (!meshRef.current || !started) return
    if (t0.current === null) t0.current = clock.getElapsedTime()
    const raw = (clock.getElapsedTime() - t0.current - index * 0.09) / 0.85
    const t = Math.min(Math.max(raw, 0), 1)
    const eased = 1 - Math.pow(1 - t, 3)
    meshRef.current.scale.y = Math.max(eased, 0.001)
    meshRef.current.position.y = (targetH * eased) / 2
  })

  return (
    <group>
      <mesh ref={meshRef} position={[x, 0.001, 0]}>
        <boxGeometry args={[0.72, targetH, 0.72]} />
        <meshStandardMaterial color={GOLD} metalness={0.4} roughness={0.35} />
      </mesh>
      <Text position={[x, targetH + 0.42, 0]} fontSize={0.26} color={NAVY} anchorX="center" anchorY="middle" font={undefined}>
        {value.toFixed(1)}k zł
      </Text>
      <Text position={[x, -0.38, 0.5]} fontSize={0.2} color={MUTED} anchorX="center" anchorY="middle">
        {DATA[index].label}
      </Text>
    </group>
  )
}

/* ── Growth line connecting bar tops, fades in once bars settle ──── */
function GrowthLine({ started }: { started: boolean }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!started) return
    const id = setTimeout(() => setVisible(true), 1300)
    return () => clearTimeout(id)
  }, [started])

  const points = useMemo(
    () => DATA.map((d, i) => new THREE.Vector3(barX(i), barHeight(d.value) + 0.2, 0)),
    [],
  )

  if (!visible) return null
  return <Line points={points} color={CREAM} lineWidth={2} transparent opacity={0.85} />
}

/* ── Floor grid, matches the site's grid-pulse motif ─────────────── */
function Floor() {
  return (
    <group position={[0, 0, 0]}>
      <gridHelper args={[9, 18, '#3D4F6B', '#3D4F6B']} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[9, 9]} />
        <meshBasicMaterial color={NAVY} transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

function Scene({ started }: { started: boolean }) {
  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 5, 2]} intensity={1.1} color="#FFF4D6" />
      <directionalLight position={[-3, 2, -2]} intensity={0.3} color="#C9A84C" />

      <Floor />
      {DATA.map((d, i) => (
        <Bar key={d.label} index={i} value={d.value} started={started} />
      ))}
      <GrowthLine started={started} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.7}
        maxPolarAngle={Math.PI / 2.15}
        minPolarAngle={Math.PI / 4}
        target={[0, 1, 0]}
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
    // Nudge react-three-fiber's own resize detection — in some environments
    // its internal ResizeObserver never fires on first mount, leaving the
    // canvas stuck at its default 300x150 drawing buffer.
    const nudge = setTimeout(() => window.dispatchEvent(new Event('resize')), 50)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(nudge) }
  }, [])

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      {size && (
        <Canvas
          style={{ width: size.w, height: size.h, display: 'block' }}
          camera={{ position: [4.2, 3.1, 6], fov: 40 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <Scene started={started} />
        </Canvas>
      )}
    </div>
  )
}
