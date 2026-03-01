'use client'

import React, {
  Children,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Draggable from 'react-draggable'
import { motion, type MotionProps, useInView } from 'framer-motion'

import { cn } from '@/lib/utils'

interface SequenceContextValue {
  completeItem: (index: number) => void
  activeIndex: number
  sequenceStarted: boolean
}

const SequenceContext = createContext<SequenceContextValue | null>(null)

const useSequence = () => useContext(SequenceContext)

const ItemIndexContext = createContext<number | null>(null)
const useItemIndex = () => useContext(ItemIndexContext)

const ScrollContext = createContext<{ scrollToBottom: () => void } | null>(null)
const useScroll = () => useContext(ScrollContext)

/** Flatten so fragment children become top-level (fixes single terminal: <>...</> was one child, all lines got index 0). */
function flattenSequenceChildren(children: React.ReactNode): React.ReactNode[] {
  const array = Children.toArray(children)
  return array.flatMap((child) => {
    if (isValidElement(child) && child.type === React.Fragment) {
      const fragmentProps = child.props as { children?: React.ReactNode }
      return flattenSequenceChildren(fragmentProps.children ?? [])
    }
    return [child]
  })
}

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode
  delay?: number
  className?: string
  startOnView?: boolean
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  startOnView = false,
  ...props
}: AnimatedSpanProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  })

  const sequence = useSequence()
  const itemIndex = useItemIndex()
  const scroll = useScroll()
  const [hasStarted, setHasStarted] = useState(false)
  useEffect(() => {
    if (hasStarted) scroll?.scrollToBottom()
  }, [hasStarted, scroll])
  useEffect(() => {
    if (!sequence || itemIndex === null) return
    if (!sequence.sequenceStarted) return
    if (hasStarted) return
    if (sequence.activeIndex === itemIndex) {
      setHasStarted(true)
    }
  }, [sequence?.activeIndex, sequence?.sequenceStarted, hasStarted, itemIndex])

  const shouldAnimate = sequence ? hasStarted : startOnView ? isInView : true

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay: sequence ? 0 : delay / 1000 }}
      className={cn('grid text-sm font-normal tracking-tight', className)}
      onAnimationComplete={() => {
        if (!sequence) return
        if (itemIndex === null) return
        sequence.completeItem(itemIndex)
        scroll?.scrollToBottom()
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface TypingAnimationProps extends MotionProps {
  children: string
  className?: string
  duration?: number
  delay?: number
  as?: React.ElementType
  startOnView?: boolean
}

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay = 0,
  as: Component = 'span',
  startOnView = true,
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== 'string') {
    throw new Error('TypingAnimation: children must be a string. Received:')
  }

  const MotionComponent =
    Component === 'span' ? motion.span : Component === 'div' ? motion.div : motion.span

  const [displayedText, setDisplayedText] = useState<string>('')
  const [started, setStarted] = useState(false)
  const elementRef = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  })

  const sequence = useSequence()
  const itemIndex = useItemIndex()
  const sequenceRef = useRef(sequence)
  const itemIndexRef = useRef(itemIndex)
  sequenceRef.current = sequence
  itemIndexRef.current = itemIndex

  useEffect(() => {
    if (sequence && itemIndex !== null) {
      if (!sequence.sequenceStarted) return
      if (started) return
      if (sequence.activeIndex === itemIndex) {
        setStarted(true)
      }
      return
    }

    if (!startOnView) {
      const startTimeout = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(startTimeout)
    }

    if (!isInView) return

    const startTimeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimeout)
  }, [
    delay,
    startOnView,
    isInView,
    started,
    sequence?.activeIndex,
    sequence?.sequenceStarted,
    itemIndex,
  ])

  useEffect(() => {
    if (!started) return

    let i = 0
    const typingEffect = setInterval(() => {
      if (i < children.length) {
        setDisplayedText(children.substring(0, i + 1))
        i++
        scrollRef.current?.scrollToBottom()
      } else {
        clearInterval(typingEffect)
        scrollRef.current?.scrollToBottom()
        const seq = sequenceRef.current
        const idx = itemIndexRef.current
        if (seq && idx !== null) {
          seq.completeItem(idx)
        }
      }
    }, duration)

    return () => {
      clearInterval(typingEffect)
    }
  }, [children, duration, started])

  const scroll = useScroll()
  const scrollRef = useRef(scroll)
  scrollRef.current = scroll

  return (
    <MotionComponent
      ref={elementRef as React.Ref<HTMLDivElement>}
      className={cn('text-sm font-normal tracking-tight', className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  )
}

export interface TerminalWindowProps {
  children: React.ReactNode
  className?: string
  sequence?: boolean
  startOnView?: boolean
  isActive?: boolean
  startDelay?: number
  autoScroll?: boolean
  onClose?: () => void
  onSequenceComplete?: () => void
  /** Initial drag position (e.g. centered). Uncontrolled drag – no re-renders while dragging. */
  defaultPosition?: { x: number; y: number }
}

export const TerminalWindow = ({
  children,
  className,
  sequence = true,
  startOnView = true,
  isActive = true,
  startDelay = 0,
  autoScroll = true,
  onClose,
  onSequenceComplete,
  defaultPosition = { x: 0, y: 0 },
}: TerminalWindowProps) => {
  const draggableRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLPreElement | null>(null)
  const scrollToBottom = useCallback(() => {
    if (!autoScroll) return
    const el = scrollContainerRef.current
    if (!el) return
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const current = scrollContainerRef.current
        if (!current) return
        const { scrollHeight, scrollTop, clientHeight } = current
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight
        if (distanceFromBottom <= 80) {
          current.scrollTop = current.scrollHeight
        }
      })
    })
  }, [autoScroll])
  const setScrollContainerRef = useCallback((el: HTMLPreElement | null) => {
    scrollContainerRef.current = el
    if (el) el.scrollTop = 0
  }, [])
  const isInView = useInView(containerRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  })

  const [activeIndex, setActiveIndex] = useState(0)
  const [isClosing, setIsClosing] = useState(false)
  const [delayPassed, setDelayPassed] = useState(startDelay <= 0)
  useEffect(() => {
    if (startDelay <= 0) return
    const t = setTimeout(() => setDelayPassed(true), startDelay)
    return () => clearTimeout(t)
  }, [startDelay])
  const sequenceHasStarted =
    sequence && isActive && delayPassed && (!startOnView || isInView)

  const flatChildren = useMemo(() => flattenSequenceChildren(children), [children])
  const childCount = flatChildren.length
  const onSequenceCompleteRef = useRef(onSequenceComplete)
  onSequenceCompleteRef.current = onSequenceComplete
  const contextValue = useMemo<SequenceContextValue | null>(() => {
    if (!sequence) return null
    return {
      completeItem: (index: number) => {
        if (index === childCount - 1) {
          onSequenceCompleteRef.current?.()
        }
        setActiveIndex((current) => (index === current ? current + 1 : current))
      },
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    }
  }, [sequence, activeIndex, sequenceHasStarted, childCount])

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children
    if (flatChildren.length === 0) return children
    return flatChildren.map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child as React.ReactNode}
      </ItemIndexContext.Provider>
    ))
  }, [children, sequence, flatChildren])

  const handleClose = () => {
    if (!onClose || isClosing) return
    setIsClosing(true)
  }

  const content = (
    <Draggable
      nodeRef={draggableRef}
      handle=".terminal-title-bar"
      bounds="parent"
      defaultPosition={defaultPosition}
    >
      <div
        ref={draggableRef}
        className="absolute left-0 top-0 w-full max-w-lg max-h-[400px]"
      >
        <motion.div
          ref={containerRef}
          layout
          initial={false}
          animate={
            isClosing
              ? {
                scale: 0,
                opacity: 0,
                filter: 'blur(4px)',
              }
              : {
                scale: 1,
                opacity: 1,
                filter: 'blur(0px)',
              }
          }
          transition={{
            duration: 0.28,
            ease: [0.4, 0, 0.6, 1],
          }}
          style={{ transformOrigin: 'top left' }}
          onAnimationComplete={() => {
            if (isClosing) onClose?.()
          }}
          className={cn(
            'terminal-window z-0 flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-700 bg-[#0a0a0a]',
            'max-h-[400px]',
            className
          )}
        >
          <div className="terminal-title-bar flex cursor-grab shrink-0 flex-col gap-y-2 border-b border-gray-700 p-4 active:cursor-grabbing">
            <div className="flex flex-row gap-x-2">
              <button
                type="button"
                onClick={handleClose}
                title="Close"
                className={cn(
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500 transition-opacity hover:opacity-100',
                  onClose ? 'cursor-pointer opacity-90' : 'cursor-default opacity-100'
                )}
                aria-label="Close terminal"
              >
                <svg
                  className="h-2 w-2 text-red-900/70"
                  viewBox="0 0 8 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M1 1l6 6M7 1L1 7" />
                </svg>
              </button>
              <div className="h-4 w-4 rounded-full bg-yellow-500" />
              <div className="h-4 w-4 rounded-full bg-green-500" />
            </div>
          </div>
          <pre
            ref={setScrollContainerRef}
            className="min-h-0 flex-1 overflow-y-auto p-4 text-white"
          >
            <code className="grid gap-y-1 font-mono text-sm text-white">
              {wrappedChildren}
            </code>
          </pre>
        </motion.div>
      </div>
    </Draggable>
  )

  const scrollContextValue = useMemo(
    () => ({ scrollToBottom }),
    [scrollToBottom]
  )

  if (!sequence) {
    return (
      <ScrollContext.Provider value={scrollContextValue}>
        {content}
      </ScrollContext.Provider>
    )
  }

  return (
    <ScrollContext.Provider value={scrollContextValue}>
      <SequenceContext.Provider value={contextValue}>
        {content}
      </SequenceContext.Provider>
    </ScrollContext.Provider>
  )
}

/** Alias for TerminalWindow. */
export const Terminal = TerminalWindow
