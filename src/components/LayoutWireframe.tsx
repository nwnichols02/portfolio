import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ModeToggle } from './ui/mode-toggle'
import { LanguageToggle } from './LanguageToggle'

const navKeys: { key: string; index: number }[] = [
  { key: 'nav.home', index: 0 },
  { key: 'nav.about', index: 1 },
  { key: 'nav.projects', index: 2 },
  { key: 'nav.skills', index: 3 },
  { key: 'nav.experience', index: 4 },
  { key: 'nav.contact', index: 5 },
]

interface LayoutWireframeProps {
  children: React.ReactNode
  scrollToSection: (index: number) => void
}

const LayoutWireframe: React.FC<LayoutWireframeProps> = ({ children, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  const handleNavClick = (index: number) => {
    scrollToSection(index)
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-foreground flex flex-col">
      <header className="section-padding-x h-16 md:h-20 flex-shrink-0 w-full border-b border-[#363636] bg-[#1a1a1a] flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNavClick(0)}
          className="text-left hover:opacity-90 transition-opacity min-h-[44px] flex flex-col justify-center"
        >
          <div className="text-white text-lg md:text-2xl font-semibold leading-tight">{t('portfolio.name')}</div>
          <div className="text-[#a0a0a0] text-xs leading-[18px] mt-0.5 hidden lg:block">
            {t('portfolio.tagline')}
          </div>
        </button>
        <nav className="hidden md:flex items-center gap-[10px]">
          {navKeys.map(({ key, index }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleNavClick(index)}
              className="text-[#e0e0e0] text-sm hover:text-white transition-colors px-1 min-h-[44px] flex items-center"
            >
              {t(key)}
            </button>
          ))}
          <div className="ml-4 flex items-center gap-2">
            <LanguageToggle />
            <ModeToggle />
          </div>
        </nav>
        <div className="flex md:hidden items-center gap-2">
          <LanguageToggle />
          <ModeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#e0e0e0] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:text-white transition-colors"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t('aria.closeMenu') : t('aria.openMenu')}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="md:hidden bg-[#252525] border-b border-[#363636] section-padding-x py-4">
          {navKeys.map(({ key, index }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleNavClick(index)}
              className="block w-full text-left text-[#e0e0e0] text-sm hover:text-white py-3 min-h-[44px] flex items-center"
            >
              {t(key)}
            </button>
          ))}
        </div>
      )}
      <main className="flex-grow">{children}</main>
    </div>
  )
}

export default LayoutWireframe
