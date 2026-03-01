'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeProvider'

const TEXT = 'Remember, all I\'m offering is the truth. Nothing more.'
const CHAR_DELAY_MS = 80
const CURSOR_HOLD_BEFORE_TYPING_MS = 3000
const PILLS_DELAY_AFTER_TYPING_MS = 2000

type TruthIntroProps = {
  onDismiss?: (choice: 'light' | 'dark') => void
}

export default function TruthIntro({ onDismiss }: TruthIntroProps) {
  const { setTheme } = useTheme()
  const pillChoiceRef = useRef<'light' | 'dark' | null>(null)
  const [visible, setVisible] = useState(true)
  const [displayedLength, setDisplayedLength] = useState(0)
  const [phase, setPhase] = useState<'cursor-only' | 'typing' | 'done'>('cursor-only')
  const [showPills, setShowPills] = useState(false)

  // Pills fade in 2s after typing animation is finished
  useEffect(() => {
    if (phase !== 'done') return
    const t = setTimeout(() => setShowPills(true), PILLS_DELAY_AFTER_TYPING_MS)
    return () => clearTimeout(t)
  }, [phase])

  // Phase 1: show only flashing cursor, then start typing
  useEffect(() => {
    const startTyping = setTimeout(() => {
      setPhase('typing')
    }, CURSOR_HOLD_BEFORE_TYPING_MS)
    return () => clearTimeout(startTyping)
  }, [])

  // Phase 2: type one character at a time (Magic UI style)
  useEffect(() => {
    if (phase !== 'typing') return
    if (displayedLength >= TEXT.length) {
      setPhase('done')
      return
    }
    const t = setTimeout(() => {
      setDisplayedLength((n) => Math.min(n + 1, TEXT.length))
    }, CHAR_DELAY_MS)
    return () => clearTimeout(t)
  }, [phase, displayedLength])

  const chooseBluePill = () => {
    setTheme('light')
    pillChoiceRef.current = 'light'
    setVisible(false)
  }
  const chooseRedPill = () => {
    setTheme('dark')
    pillChoiceRef.current = 'dark'
    setVisible(false)
  }

  const handleExitComplete = () => {
    if (pillChoiceRef.current) {
      onDismiss?.(pillChoiceRef.current)
      pillChoiceRef.current = null
    }
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="truth-intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center">
            {/* Text: fixed position, never moves */}
            <div className="flex min-h-[2rem] items-center justify-center px-6 font-mono text-lg tracking-wide text-green-400 sm:text-xl">
              <span className="inline">
                {TEXT.slice(0, displayedLength)}
              </span>
              <span className="truth-intro-cursor inline-block h-[1.1em] w-[0.12em] bg-green-400 align-baseline" />
            </div>

            {/* Reserved space for pills so layout doesn’t shift when they fade in */}
            <div className="mt-10 flex min-h-8 items-center justify-center">
              <AnimatePresence>
                {showPills && (
                  <motion.div
                    key="pills"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="flex items-center justify-center gap-8 sm:gap-10"
                  >
                    <button
                      type="button"
                      onClick={chooseRedPill}
                      className="cursor-pointer rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black"
                      style={{
                        background: 'linear-gradient(135deg, #8b0000 0%, #dc2626 40%, #b91c1c 100%)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 8px rgba(0,0,0,0.5)',
                      }}
                      aria-label="Choose the red pill – dark mode"
                    >
                      <span className="block h-4 w-12 rounded-full sm:h-5 sm:w-14" />
                    </button>
                    <button
                      type="button"
                      onClick={chooseBluePill}
                      className="cursor-pointer rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black"
                      style={{
                        background: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 40%, #0ea5e9 100%)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.5)',
                      }}
                      aria-label="Choose the blue pill – light mode"
                    >
                      <span className="block h-4 w-12 rounded-full sm:h-5 sm:w-14" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
