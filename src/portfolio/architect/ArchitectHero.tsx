import { ArrowRight, ArrowDown, Github, Linkedin, Twitter } from 'lucide-react'

export default function ArchitectHero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-12 max-w-[1920px] mx-auto pt-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8">
          <h1 className="text-[12vw] lg:text-[10rem] leading-[0.85] font-bold tracking-tighter text-black mb-8 -ml-2">
            ARCHITECT
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-400">
              BUILDER
            </span>
            <br />
            MAKER
          </h1>
        </div>
        <div className="lg:col-span-4 pb-4 lg:pb-12">
          <p className="text-xl text-gray-600 font-light leading-relaxed mb-8 max-w-md">
            Crafting scalable microfrontends by day. Tuning frequencies and welding steel by night.
            A portfolio of digital structure and physical connection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#architecture"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors group"
            >
              Explore Works
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#ham-radio"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('ham-radio')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-black text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Tune In
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-6 lg:left-12 right-6 lg:right-12 flex justify-between items-end border-t border-gray-200 pt-6">
        <div className="text-xs text-gray-400 font-mono">
          SCROLL FOR MORE
          <br />
          <ArrowDown className="mt-2 w-4 h-4 animate-bounce" />
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-black transition-colors" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-black transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-black transition-colors" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
