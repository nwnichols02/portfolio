import { useRef, useState, useEffect } from 'react'
import { RouterProvider, createRouter, createRootRoute } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './components/Layout'
import Home from './sections/Home'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './components/Footer'
import Stepper from './components/Stepper'
import Globe from './components/Globe'

const queryClient = new QueryClient()

const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact', 'globe', 'footer']

const RootComponent = () => {
  const [activeSection, setActiveSection] = useState(0)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)

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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      }, (error) => {
        console.error("Error getting user location:", error)
      })
    }
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
              ref={(el) => (sectionRefs.current[index] = el)}
              className="snap-start h-screen flex items-center justify-center"
            >
              {section === 'home' && <Home />}
              {section === 'about' && <About />}
              {section === 'projects' && <Projects />}
              {section === 'skills' && <Skills />}
              {section === 'experience' && <Experience />}
              {section === 'contact' && <Contact />}
              {section === 'globe' && <Globe userLocation={userLocation} />}
              {section === 'footer' && <Footer scrollToSection={scrollToSection} />}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

const rootRoute = createRootRoute({
  component: RootComponent,
})

const routeTree = rootRoute

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App