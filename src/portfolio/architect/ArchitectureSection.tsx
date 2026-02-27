import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { List, LayoutGrid } from 'lucide-react'
import {
  SiReact,
  SiDocker,
  SiAmazonwebservices,
  SiNodedotjs,
  SiRust,
  SiJavascript,
  SiGit,
  SiTerraform,
  SiOracle,
  SiDotnet,
  SiPostgresql,
} from 'react-icons/si'

const PROJECTS = [
  {
    slug: 'enterprise-mf-platform',
    tag: 'FEDERATION',
    title: 'Enterprise MF Platform',
    description:
      'Scalable module federation system serving 50+ internal applications. Zero-coupling architecture.',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    alt: 'Microfrontend Architecture',
  },
  {
    slug: 'cloud-native-event-bus',
    tag: 'SYSTEM DESIGN',
    title: 'Cloud Native Event Bus',
    description:
      'High-throughput event sourcing system for real-time financial data processing.',
    year: '2023',
    image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/cc9fa56c8f-942901adb0d00df7a978.png',
    alt: 'System Design',
  },
  {
    slug: 'react-micro-loader',
    tag: 'OPEN SOURCE',
    title: 'React Micro-Loader',
    description:
      'Lightweight utility for dynamic remote component loading. 2k+ stars on GitHub.',
    year: '2022',
    codeSnippet: true,
  },
]

const TECH_ICONS = [
  { label: 'React', Icon: SiReact },
  { label: 'Docker', Icon: SiDocker },
  { label: 'AWS', Icon: SiAmazonwebservices },
  { label: 'Terraform', Icon: SiTerraform },
  { label: 'Node', Icon: SiNodedotjs },
  { label: 'Rust', Icon: SiRust },
  { label: '.NET', Icon: SiDotnet },
  { label: 'JavaScript', Icon: SiJavascript },
  { label: 'Oracle', Icon: SiOracle },
  { label: 'Postgres', Icon: SiPostgresql },
  { label: 'Git', Icon: SiGit },
]

export default function ArchitectureSection() {
  const [gridView, setGridView] = useState(true)

  return (
    <section
      id="architecture"
      className="py-24 px-6 lg:px-12 max-w-[1920px] mx-auto bg-white rounded-t-[3rem] shadow-2xl relative z-10 -mt-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-gray-100 pb-8">
        <div>
          <span className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-2 block">
            Core Competencies
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black">
            Architecture
          </h2>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            type="button"
            onClick={() => setGridView(false)}
            className={`w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full transition-colors ${!gridView ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
              }`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setGridView(true)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${gridView ? 'bg-black text-white' : 'border border-gray-200 hover:bg-black hover:text-white'
              }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        className={
          gridView
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            : 'flex flex-col gap-8'
        }
      >
        {PROJECTS.map((project) => (
          <Link
            key={project.title}
            to="/blog/$slug"
            params={{ slug: project.slug }}
            className="group cursor-pointer block"
          >
            <div className="relative overflow-hidden bg-gray-100 aspect-[4/3] mb-6">
              {project.codeSnippet ? (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center p-8">
                  <div className="font-mono text-xs text-green-400 opacity-80">
                    {'<Suspense fallback={<Spinner />}>'}
                    <br />
                    {'  <RemoteComponent />'}
                    <br />
                    {'</Suspense>'}
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-mono rounded-full">
                {project.tag}
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-semibold mb-2 group-hover:underline decoration-1 underline-offset-4">
                  {project.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed max-w-sm">
                  {project.description}
                </p>
              </div>
              <span className="text-xs font-mono text-gray-600 shrink-0 ml-2">
                {project.year}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Tech Stack Marquee */}
      <div className="mt-24 border-t border-b border-gray-100 py-12 overflow-hidden">
        <p className="text-center text-xs font-mono text-gray-400 mb-8 uppercase tracking-widest">
          Technological Arsenal
        </p>
        <div className="relative opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="tech-marquee-inner">
            <div className="tech-marquee-track">
              {TECH_ICONS.map(({ label, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 md:gap-4 text-gray-600"
                >
                  <Icon className="w-8 h-8 md:w-9 md:h-9" />
                  <span className="hidden md:inline text-xl md:text-2xl font-mono font-semibold">
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div className="tech-marquee-track" aria-hidden="true">
              {TECH_ICONS.map(({ label, Icon }) => (
                <div
                  key={`${label}-duplicate`}
                  className="flex items-center gap-2 md:gap-4 text-gray-600"
                >
                  <Icon className="w-8 h-8 md:w-9 md:h-9" />
                  <span className="hidden md:inline text-xl md:text-2xl font-mono font-semibold">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
