import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useTheme } from '@/contexts/ThemeProvider'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'ham-radio', label: 'Ham Radio' },
  // { id: 'welding', label: 'Welding' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const TITLE_ROTATION = ['Architect', 'Engineer', 'Leader']
const ROTATION_INTERVAL_MS = 3500

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

type ArchitectHeaderProps = {
  onRequestOffline?: () => void
}

export default function ArchitectHeader({ onRequestOffline }: ArchitectHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [titleIndex, setTitleIndex] = useState(0)
  const { theme, setTheme } = useTheme()
  const isSystemOffline = theme === 'dark'

  const handleStatusClick = () => {
    if (!isSystemOffline && onRequestOffline) {
      onRequestOffline()
      return
    }
    setTheme(isSystemOffline ? 'light' : 'dark')
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex((i) => (i + 1) % TITLE_ROTATION.length)
    }, ROTATION_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  const handleNavClick = (id: string) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <header
        id="header"
        className="fixed top-0 left-0 w-full bg-[#fafafa]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm z-50 transition-all duration-300 border-b border-transparent hover:border-gray-200 dark:hover:border-gray-700"
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick('hero')}
              className="w-8 h-8 shrink-0 bg-black flex items-center justify-center text-white font-bold text-sm rounded-sm"
            >
              NN
            </button>
            <span
              className="font-mono text-xs tracking-wider uppercase hidden sm:flex sm:items-center h-8 overflow-hidden min-w-[11rem] text-black dark:text-white"
              aria-label={`Software ${TITLE_ROTATION[titleIndex]}`}
            >
              <span className="shrink-0">Software&nbsp;</span>
              <span
                className="inline-flex items-center overflow-hidden h-full"
                style={{ perspective: '120px' }}
              >
                <span
                  key={titleIndex}
                  className="inline-block animate-flip-down origin-top"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {TITLE_ROTATION[titleIndex]}
                </span>
              </span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(id)
                }}
                className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/blog"
              className="hidden md:inline-flex text-xs font-mono px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
            >
              Blog
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-xl text-black dark:text-white p-2"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleStatusClick}
              className="flex items-center gap-2 text-xs font-mono text-gray-400 dark:text-gray-400 transition-colors cursor-pointer hover:opacity-80"
              aria-label={isSystemOffline ? 'System offline – click to go online' : 'System online – click to go offline'}
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${isSystemOffline ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}
              />
              <span className={`shrink-0 ${isSystemOffline ? 'text-red-500' : ''}`}>
                {isSystemOffline ? 'SYSTEM OFFLINE' : 'SYSTEM ONLINE'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-white dark:bg-[#0a0a0a] z-[60] flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-2xl text-black dark:text-white p-2"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
        <Link
          to="/blog"
          className="absolute top-6 left-6 text-xs font-mono px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          Blog
        </Link>
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(id)
            }}
            className="text-2xl font-bold text-black dark:text-white"
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
