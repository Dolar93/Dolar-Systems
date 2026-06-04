'use client'
import { motion } from 'framer-motion'

const PAPERS = [
  { bg: '#D4E4C8', w: 58, h: 76, rot: -12, left: '3%',  top: '8%',  dur: 28, delay: 0   },
  { bg: '#F2D4C8', w: 42, h: 58, rot: 18,  left: '91%', top: '15%', dur: 34, delay: 6   },
  { bg: '#C8D4E8', w: 50, h: 68, rot: -5,  left: '7%',  top: '45%', dur: 24, delay: 12  },
  { bg: '#E8DCC8', w: 36, h: 50, rot: 22,  left: '85%', top: '52%', dur: 38, delay: 4   },
  { bg: '#D4C8E8', w: 44, h: 60, rot: -16, left: '93%', top: '75%', dur: 30, delay: 9   },
  { bg: '#D4E4C8', w: 30, h: 42, rot: 8,   left: '2%',  top: '78%', dur: 22, delay: 16  },
  { bg: '#F2D4C8', w: 54, h: 72, rot: -8,  left: '48%', top: '5%',  dur: 32, delay: 2   },
  { bg: '#C8D4E8', w: 38, h: 52, rot: 14,  left: '55%', top: '88%', dur: 26, delay: 18  },
]

export default function FloatingPaper() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      {PAPERS.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: p.w,
            height: p.h,
            backgroundColor: p.bg,
            borderRadius: '3px',
            rotate: p.rot,
            opacity: 0.07,
            boxShadow: '2px 2px 6px rgba(0,0,0,0.08)',
          }}
          animate={{ y: [0, -18, 0], rotate: [p.rot, p.rot + 3, p.rot] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
