import React from 'react'
import AppBar from './AppBar'

interface LayoutProps {
  children: React.ReactNode
  scrollToSection: (index: number) => void
}

const Layout: React.FC<LayoutProps> = ({ children, scrollToSection }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <AppBar scrollToSection={scrollToSection} />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  )
}

export default Layout