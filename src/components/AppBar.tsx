import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact']

interface AppBarProps {
  scrollToSection: (index: number) => void
}

const AppBar: React.FC<AppBarProps> = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleNavClick = (index: number) => {
    scrollToSection(index)
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-background text-foreground p-4 fixed w-full z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <button onClick={() => handleNavClick(0)} className="text-2xl font-bold">Nathan Nichols</button>
        <div className="hidden md:flex space-x-4 items-center">
          {sections.map((section, index) => (
            <NavLink key={section} onClick={() => handleNavClick(index)}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </NavLink>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-foreground">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-muted mt-2 p-4">
          {sections.map((section, index) => (
            <NavLink key={section} onClick={() => handleNavClick(index)}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}

const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="block md:inline-block text-foreground hover:text-secondary transition-colors mb-2 md:mb-0"
  >
    {children}
  </button>
)

export default AppBar