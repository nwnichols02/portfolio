import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ArchitectContact() {
  const [currentTime, setCurrentTime] = useState('12:00 PM')

  useEffect(() => {
    const update = () => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="contact" className="bg-black text-white py-32 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6 block">
          Get in Touch
        </span>
        <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tight">
          Let&apos;s build something
          <br />
          solid together.
        </h2>

        <a
          href="mailto:hello@architect.dev"
          className="inline-block text-2xl md:text-4xl border-b border-gray-700 hover:border-white hover:text-gray-200 transition-all pb-2 mb-16"
        >
          hello@architect.dev
        </a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-gray-800 pt-12">
          <div>
            <h4 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-wider">
              Socials
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Twitter / X
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>System Architecture</li>
              <li>Microfrontend Consulting</li>
              <li>Technical Leadership</li>
              <li>Performance Auditing</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-wider">
              Location
            </h4>
            <address className="text-sm text-gray-500 not-italic">
              San Francisco, CA
              <br />
              Remote Worldwide
            </address>
            <div className="mt-4 text-xs font-mono text-gray-600">
              Current Time: <span>{currentTime}</span>
            </div>
          </div>
        </div>

        <div className="mt-24 text-xs text-gray-700 flex justify-between items-center flex-wrap gap-4">
          <span>© 2024 Senior Architect Portfolio. All rights reserved.</span>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="hover:text-white transition-colors inline-flex items-center"
          >
            Back to Top <ArrowUp className="ml-1 w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
