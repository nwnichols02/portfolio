'use client'

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { TerminalWindow } from '@/components/ui/terminal'

export interface TerminalInstance {
  id: string
  /** Inline content (used when opened with openTerminal). */
  content?: ReactNode
  /** Index into the contents batch (used when opened with openMultiple). Rendered content = contentsBatch[contentIndex]. */
  contentIndex?: number
  position?: React.CSSProperties
  /** Called when this terminal is closed (before removing from list). Use for e.g. opening more terminals after a delay. */
  onClose?: () => void
}

interface TerminalContextValue {
  /** Currently open terminals (read-only). */
  terminals: TerminalInstance[]
  /** Open a single terminal. Returns the terminal id. */
  openTerminal: (
    content: ReactNode,
    position?: React.CSSProperties,
    options?: { onClose?: () => void }
  ) => string
  /** Open multiple terminals at once. Only one runs its sequence at a time; they take turns. */
  openMultiple: (contents: ReactNode[], positions?: React.CSSProperties[]) => string[]
  /** Close a terminal by id. Calls the terminal's onClose callback if set, then removes it. */
  closeTerminal: (id: string) => void
  /** Close all open terminals. */
  closeAll: () => void
  /** Whether any terminal is open (for hotkeys etc.). */
  hasOpenTerminals: boolean
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
  /** z-index for the terminal overlay. */
  zIndex?: number
}

export function TerminalProvider({ children, zIndex = 45 }: TerminalProviderProps) {
  const [terminals, setTerminals] = useState<TerminalInstance[]>([])
  const [contentsBatch, setContentsBatch] = useState<ReactNode[]>([])
  const idCounterRef = useRef(0)

  const openTerminal = useCallback(
    (
      content: ReactNode,
      position?: React.CSSProperties,
      options?: { onClose?: () => void }
    ) => {
      const id = `terminal-${++idCounterRef.current}-${Date.now()}`
      setTerminals((prev) => [...prev, { id, content, position, onClose: options?.onClose }])
      return id
    },
    []
  )

  const openMultiple = useCallback(
    (contents: ReactNode[], positions?: React.CSSProperties[]) => {
      const base = Date.now()
      const newInstances: TerminalInstance[] = contents.map((_, i) => ({
        id: `terminal-${++idCounterRef.current}-${base}-${i}`,
        contentIndex: i,
        position: positions?.[i],
      }))
      const ids = newInstances.map((t) => t.id)
      setContentsBatch(contents)
      setTerminals((prev) => [...prev, ...newInstances])
      return ids
    },
    []
  )

  const closeTerminal = useCallback((id: string) => {
    setTerminals((prev) => {
      const terminal = prev.find((t) => t.id === id)
      terminal?.onClose?.()
      return prev.filter((t) => t.id !== id)
    })
  }, [])

  const closeAll = useCallback(() => {
    setTerminals([])
    setContentsBatch([])
  }, [])

  const value: TerminalContextValue = {
    terminals,
    openTerminal,
    openMultiple,
    closeTerminal,
    closeAll,
    hasOpenTerminals: terminals.length > 0,
  }

  return (
    <TerminalContext.Provider value={value}>
      {children}
      {terminals.length > 0 && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex }}
        >
          {terminals.map((terminal, index) => {
            const content =
              terminal.content ??
              (terminal.contentIndex !== undefined ? contentsBatch[terminal.contentIndex] : null)
            return (
              <div
                key={terminal.id}
                className="absolute w-full max-w-md pointer-events-auto"
                style={terminal.position}
              >
                <TerminalWindow
                  key={terminal.id}
                  startOnView={false}
                  isActive
                  onClose={() => closeTerminal(terminal.id)}
                  className="shadow-2xl"
                >
                  {content}
                </TerminalWindow>
              </div>
            )
          })}
        </div>
      )}
    </TerminalContext.Provider>
  )
}
