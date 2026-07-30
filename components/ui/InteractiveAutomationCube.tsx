'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'
import Image from 'next/image'
import {
  cubeImageForStage,
  isPageIgnited,
  nextCubeStage,
  type CubeStage,
} from '@/lib/cube-easter-egg'
import RuneFireSprite from '@/components/ui/RuneFireSprite'

const LABELS: Record<CubeStage, string> = {
  0: 'Aktywuj runy artefaktu',
  1: 'Uruchom rdzeń artefaktu',
  2: 'Uwolnij energię artefaktu',
  3: 'Artefakt w pełni aktywny',
}

type InteractiveAutomationCubeProps = {
  reduced: boolean | null
  onIgnite?: () => void
}

export default function InteractiveAutomationCube({
  reduced,
  onIgnite,
}: InteractiveAutomationCubeProps) {
  const controls = useAnimationControls()
  const [stage, setStage] = useState<CubeStage>(0)
  const [animating, setAnimating] = useState(false)
  const [shockwave, setShockwave] = useState(0)
  const timers = useRef<number[]>([])

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  const activate = () => {
    if (animating || stage === 3) return

    const nextStage = nextCubeStage(stage)

    if (reduced) {
      setStage(nextStage)
      if (isPageIgnited(nextStage)) onIgnite?.()
      return
    }

    setAnimating(true)
    void controls.start({
      y: [0, 4, -22, 3, 0],
      rotate: [0, -1.5, 2.5, -1, 0],
      scale: [1, 0.97, 1.045, 0.99, 1],
      transition: {
        duration: 0.56,
        times: [0, 0.16, 0.44, 0.73, 1],
        ease: [0.22, 1, 0.36, 1],
      },
    })

    timers.current.push(window.setTimeout(() => {
      setStage(nextStage)
      if (isPageIgnited(nextStage)) {
        setShockwave((value) => value + 1)
        onIgnite?.()
      }
    }, 215))

    timers.current.push(window.setTimeout(() => {
      setAnimating(false)
    }, 620))
  }

  const image = cubeImageForStage(stage)
  const fireActive = stage >= 2

  return (
    <motion.button
      type="button"
      aria-label={LABELS[stage]}
      data-cube-stage={stage}
      disabled={stage === 3}
      onClick={activate}
      animate={controls}
      className="relative hidden h-full w-full cursor-pointer border-0 bg-transparent p-0 lg:block disabled:cursor-default"
      style={{
        filter: fireActive
          ? 'drop-shadow(0 18px 18px rgba(39,44,34,0.28)) drop-shadow(0 0 17px rgba(140,255,112,0.42))'
          : 'drop-shadow(0 18px 18px rgba(39,44,34,0.26))',
      }}
    >
      <motion.span
        className="absolute inset-0"
        animate={reduced
          ? undefined
          : fireActive
            ? { y: [0, -2.5, 0], filter: ['brightness(1)', 'brightness(1.1)', 'brightness(1)'] }
            : { y: [0, -2, 0] }}
        transition={{ duration: fireActive ? 2.1 : 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AnimatePresence mode="sync">
          <motion.span
            key={image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.94, filter: 'brightness(1.45)' }}
            animate={{ opacity: 1, scale: 1, filter: 'brightness(1)' }}
            exit={{ opacity: 0, scale: 1.04, filter: 'brightness(1.6)' }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="168px"
              className="scale-[1.05] object-contain"
            />
          </motion.span>
        </AnimatePresence>

        <RuneFireSprite
          active={fireActive}
          className="absolute left-1/2 top-[-22%] h-[62%] w-[62%] -translate-x-1/2"
          style={{ filter: 'saturate(1.5) brightness(0.96)' }}
        />
      </motion.span>

      {shockwave > 0 && (
        <motion.span
          key={shockwave}
          aria-hidden
          className="absolute inset-[18%] rounded-full border border-[#B8FF9A]"
          initial={{ opacity: 0.9, scale: 0.35 }}
          animate={{ opacity: 0, scale: 3.7 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ boxShadow: '0 0 24px rgba(184,255,154,0.75)' }}
        />
      )}

      <span className="sr-only">
        Stan {stage + 1} z 4
      </span>
    </motion.button>
  )
}
