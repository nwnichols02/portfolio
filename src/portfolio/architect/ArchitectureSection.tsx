import { Link } from '@tanstack/react-router'
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
    title: 'Vite, Module Federation, and Zero‑Coupling Architecture for Enterprise Frontends',
    description:
      'Enterprise frontends are finally catching up to the way we already think about backends: independently deployable, isolated modules that can evolve without a "big bang" rewrite.',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2072&auto=format&fit=crop',
    alt: 'Modular architecture and distributed frontends',
  },
  {
    slug: 'secure-sdlc-frontend',
    tag: 'SECURITY',
    title: 'Secure SDLC for Modern Frontend Platforms',
    description:
      'Enterprise teams scale features well but struggle to scale security. A Secure SDLC bakes security into every phase of delivery instead of bolting it on as a pre‑release checklist.',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2072&auto=format&fit=crop',
    alt: 'Secure development lifecycle',
  },
  {
    slug: 'react-micro-loader',
    tag: 'OFFLINE-FIRST',
    title: 'Why Offline‑First Changes Everything',
    description:
      'When you go offline‑first, the local database is the source of truth for UX and the server is a peer you eventually reconcile with—so saving becomes a distributed systems problem.',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2072&auto=format&fit=crop',
    alt: 'Local data and sync: offline-first architecture',
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
  return (
    <section
      id="architecture"
      className="py-24 px-6 lg:px-12 max-w-[1920px] mx-auto bg-white rounded-t-[3rem] shadow-2xl relative z-10 -mt-12"
    >
      <div className="mb-16 border-b border-gray-100 pb-8">
        <span className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-2 block">
          Core Competencies
        </span>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black">
          Architecture
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <Link
            key={project.title}
            to="/blog/$slug"
            params={{ slug: project.slug }}
            className="group cursor-pointer block"
          >
            <div className="relative overflow-hidden bg-gray-100 aspect-[4/3] mb-6 rounded-xl">
              <img
                src={project.image}
                alt={project.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-mono rounded-full">
                {project.tag}
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-semibold mb-2 group-hover:underline decoration-1 underline-offset-4 text-black">
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
