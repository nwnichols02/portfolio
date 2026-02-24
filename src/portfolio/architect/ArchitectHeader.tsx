import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'ham-radio', label: 'Ham Radio' },
  { id: 'welding', label: 'Welding' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function ArchitectHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const handleNavClick = (id: string) => {
    setMenuOpen(false)
    scrollToSection(id)
  }

  return (
    <>
      <header
        id="header"
        className="fixed top-0 left-0 w-full bg-[#fafafa]/90 backdrop-blur-sm z-50 transition-all duration-300 border-b border-transparent hover:border-gray-200"
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('hero')}
              className="w-8 h-8 bg-black flex items-center justify-center text-white font-bold text-sm"
            >
              NN
            </button>
            <span className="font-mono text-xs tracking-wider uppercase hidden sm:block">
              Software Architect
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
                className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-xl text-black p-2"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 text-2xl text-black p-2"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
        {SECTIONS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault()
              handleNavClick(id)
            }}
            className="text-2xl font-bold text-black"
          >
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
