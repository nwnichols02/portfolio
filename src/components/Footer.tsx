import React from 'react'

interface FooterProps {
  scrollToSection: (index: number) => void
}

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => {
  const sections = ['home', 'about', 'projects', 'skills', 'experience', 'blog', 'contact']

  return (
    <footer className="bg-muted text-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Nathan Nichols</h3>
            <p className="text-sm">Senior Software Engineer</p>
          </div>
          <nav className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4">
              {sections.map((section, index) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(index)}
                    className="text-sm hover:text-secondary transition-colors capitalize"
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 Nathan Nichols. All rights reserved.</p>
          <div className="mt-2">
            <a href="https://linkedin.com/in/nathan-nichols" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-secondary mr-4">LinkedIn</a>
            <a href="https://github.com/nathan-nichols" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-secondary">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer