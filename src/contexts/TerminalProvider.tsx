'use client'

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { TerminalWindow } from '@/components/ui/terminal'

interface TerminalState {
  content: ReactNode
  onClose?: () => void
}

interface TerminalContextValue {
  /** Open the terminal with the given content. Replaces any existing terminal. */
  openTerminal: (
    content: ReactNode,
    options?: { onClose?: () => void }
  ) => void
  /** Close the terminal. */
  closeTerminal: () => void
  /** Whether the terminal is open. */
  isOpen: boolean
}

const TerminalContext = createContext<TerminalContextValue | null>(null)

export function useTerminal() {
  const ctx = useContext(TerminalContext)
  if (!ctx) {
    throw new Error('useTerminal must be used within TerminalProvider')
  }
  return ctx
}

export function useTerminalOptional() {
  return useContext(TerminalContext)
}

interface TerminalProviderProps {
  children: ReactNode
  zIndex?: number
}

/** Approximate terminal size for centering (max-w-lg = 512px, max-h = 400px). */
const TERMINAL_WIDTH = 512
const TERMINAL_HEIGHT = 400

function getCenteredPosition() {
  if (typeof window === 'undefined') return { x: 0, y: 0 }
  return {
    x: (window.innerWidth - TERMINAL_WIDTH) / 2,
    y: (window.innerHeight - TERMINAL_HEIGHT) / 2,
  }
}

export function TerminalProvider({ children, zIndex = 45 }: TerminalProviderProps) {
  const [terminal, setTerminal] = useState<TerminalState | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const openTerminal = useCallback(
    (content: ReactNode, options?: { onClose?: () => void }) => {
      setPosition(getCenteredPosition())
      setTerminal({ content, onClose: options?.onClose })
    },
    []
  )

  const closeTerminal = useCallback(() => {
    setTerminal((prev) => {
      prev?.onClose?.()
      return null
    })
  }, [])

  const value: TerminalContextValue = {
    openTerminal,
    closeTerminal,
    isOpen: terminal !== null,
  }

  return (
    <TerminalContext.Provider value={value}>
      {children}
      {terminal && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex }}
        >
          <div className="absolute inset-0 pointer-events-auto">
            <TerminalWindow
              key="single-terminal"
              startOnView={false}
              isActive
              autoScroll
              defaultPosition={position}
              onClose={closeTerminal}
              className="shadow-2xl"
            >
              {terminal.content}
            </TerminalWindow>
          </div>
        </div>
      )}
    </TerminalContext.Provider>
  )
}
