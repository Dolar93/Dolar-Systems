'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
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
const SPAN_X = 7.2
const HEIGHT = 3.6

function dataPoint(i: number) {
  const t = i / (DATA.length - 1)
  const x = -SPAN_X / 2 + t * SPAN_X
  const y = (DATA[i].value / MAX_VALUE) * HEIGHT
  return new THREE.Vector3(x, y, 0)
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

/* ── The growth line, made of stars ──────────────────────────────── */
function ChartStars({ sprite, started }: { sprite: THREE.Texture; started: boolean }) {
  const geomRef = useRef<THREE.BufferGeometry>(null)
  const t0 = useRef<number | null>(null)

  const curvePoints = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(DATA.map((_, i) => dataPoint(i)))
    return curve.getPoints(140)
  }, [])

  const positions = useMemo(() => {
    const arr = new Float32Array(curvePoints.length * 3)
    curvePoints.forEach((p, i) => {
      arr[i * 3 + 0] = p.x
      arr[i * 3 + 1] = p.y
      arr[i * 3 + 2] = p.z
    })
    return arr
  }, [curvePoints])

  useFrame(({ clock }) => {
    if (!geomRef.current) return
    if (!started) {
      geomRef.current.setDrawRange(0, 0)
      return
    }
    if (t0.current === null) t0.current = clock.getElapsedTime()
    const t = Math.min((clock.getElapsedTime() - t0.current) / 2.4, 1)
    geomRef.current.setDrawRange(0, Math.floor(t * curvePoints.length))
  })

  return (
    <>
      <points>
        <bufferGeometry ref={geomRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={sprite}
          size={0.17}
          sizeAttenuation
          transparent
          opacity={0.95}
          color="#C9A84C"
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {started &&
        DATA.map((d, i) => (
          <mesh key={d.label} position={dataPoint(i)}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color="#FFF6DE" />
          </mesh>
        ))}
    </>
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
      <ChartStars sprite={sprite} started={started} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 3.2}
        target={[0, 1.3, 0]}
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
          camera={{ position: [5, 2.6, 8], fov: 45 }}
          gl={{ alpha: false, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <Scene started={started} />
        </Canvas>
      )}
    </div>
  )
}
