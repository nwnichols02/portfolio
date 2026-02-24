import { useRef, useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Home from '../sections/Home'
import About from '../sections/About'
import Projects from '../sections/Projects'
import Skills from '../sections/Skills'
import Experience from '../sections/Experience'
import Footer from '../components/Footer'
import Stepper from '../components/Stepper'

const sections = ['home', 'about', 'projects', 'skills', 'experience', 'footer']

const ClassicPortfolio = () => {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex((ref) => ref === entry.target)
            setActiveSection(index)
          }
        })
      },
      { threshold: 0.5 }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <Layout scrollToSection={scrollToSection}>
      <div className="flex">
        <Stepper
          steps={sections}
          activeStep={activeSection}
          onStepClick={scrollToSection}
        />
        <div className="flex-grow overflow-y-auto h-screen snap-y snap-mandatory scrollbar-hide">
          {sections.map((section, index) => (
            <div
              key={section}
              ref={(el) => {
                sectionRefs.current[index] = el
              }}
              className="snap-start h-screen flex items-center justify-center"
            >
              {section === 'home' && <Home />}
              {section === 'about' && <About />}
              {section === 'projects' && <Projects />}
              {section === 'skills' && <Skills />}
              {section === 'experience' && <Experience />}
              {section === 'footer' && <Footer scrollToSection={scrollToSection} />}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ClassicPortfolio
