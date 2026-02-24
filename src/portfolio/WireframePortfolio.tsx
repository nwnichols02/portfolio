import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import LayoutWireframe from '../components/LayoutWireframe'
import Hero from '../sections-v2/Hero'
import About from '../sections-v2/About'
import Projects from '../sections-v2/Projects'
import Skills from '../sections-v2/Skills'
import Experience from '../sections-v2/Experience'
import Contact from '../sections-v2/Contact'
import Footer from '../sections-v2/Footer'

const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'contact', 'footer']
const PROJECTS_INDEX = 2

const WireframePortfolio = () => {
  const [_activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const { i18n } = useTranslation()

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target)
            if (index >= 0) setActiveSection(index)
          }
        })
      },
      { threshold: 0.3 }
    )
    const refs = sectionRefs.current
    refs.forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <LayoutWireframe scrollToSection={scrollToSection}>
      <AnimatePresence mode="wait">
        <motion.div
          key={i18n.language}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="overflow-y-auto h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]"
        >
          {sections.map((section, index) => (
            <div
              key={section}
              ref={(el) => {
                sectionRefs.current[index] = el
              }}
              className="min-h-[50vh]"
            >
              {section === 'hero' && <Hero onViewProjects={() => scrollToSection(PROJECTS_INDEX)} />}
              {section === 'about' && <About />}
              {section === 'projects' && <Projects />}
              {section === 'skills' && <Skills />}
              {section === 'experience' && <Experience />}
              {section === 'contact' && <Contact />}
              {section === 'footer' && <Footer />}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </LayoutWireframe>
  )
}

export default WireframePortfolio
