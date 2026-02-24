import { Layers, Wand2 } from 'lucide-react'

export default function WeldingSection() {
  return (
    <section
      id="welding"
      className="py-32 px-6 lg:px-12 max-w-[1920px] mx-auto bg-white relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative h-[600px] bg-gray-900 rounded-lg overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 border-4 border-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute bottom-0 right-10 w-32 h-40 bg-gray-800 rounded-t-3xl transform -rotate-12 translate-y-4" />
                  <div className="absolute bottom-16 right-28 w-24 h-4 bg-gray-600 transform -rotate-45" />

                  {/* Glow */}
                  <div className="absolute bottom-24 right-44 w-4 h-4 bg-white rounded-full blur-[2px] animate-weld-glow shadow-[0_0_30px_10px_rgba(255,215,0,0.6)]" />

                  {/* Sparks */}
                  <div className="absolute bottom-24 right-44 w-full h-full pointer-events-none">
                    <div
                      className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-weld-spark top-0 left-0"
                      style={{ animationDelay: '0.1s', transform: 'translate(10px, -20px)' }}
                    />
                    <div
                      className="absolute w-1 h-1 bg-orange-400 rounded-full animate-[spark_0.6s_linear_infinite] top-0 left-0"
                      style={{ animationDelay: '0.2s', transform: 'translate(-15px, -30px)' }}
                    />
                    <div
                      className="absolute w-1 h-1 bg-yellow-100 rounded-full animate-[spark_0.4s_linear_infinite] top-0 left-0"
                      style={{ animationDelay: '0.05s', transform: 'translate(20px, -10px)' }}
                    />
                    <div
                      className="absolute w-1 h-1 bg-yellow-500 rounded-full animate-[spark_0.7s_linear_infinite] top-0 left-0"
                      style={{ animationDelay: '0.3s', transform: 'translate(-5px, -40px)' }}
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 text-white z-10">
                <h4 className="text-xl font-bold">TIG Welding Process</h4>
                <p className="text-gray-400 text-xs mt-1">Interactive CSS Animation</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2 lg:pl-12">
            <span className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-4 block">
              Fabrication
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-8">
              Fusion &
              <br />
              Structure
            </h2>
            <p className="text-xl text-gray-600 font-light leading-relaxed mb-8">
              Just as software architecture requires strong foundations and clean interfaces, welding
              demands precision, patience, and a steady hand.
            </p>
            <p className="text-gray-500 mb-12 max-w-lg">
              I specialize in TIG welding stainless steel and aluminum. The discipline of physical
              creation informs my digital work—measure twice, cut once, and ensure every connection
              is solid.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <Layers className="w-8 h-8 mb-4 text-orange-500" />
                <h3 className="font-bold text-lg mb-2">Structural Integrity</h3>
                <p className="text-sm text-gray-500">
                  Building systems that can withstand load and stress.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <Wand2 className="w-8 h-8 mb-4 text-orange-500" />
                <h3 className="font-bold text-lg mb-2">Clean Finishes</h3>
                <p className="text-sm text-gray-500">
                  Polished code and &quot;stack of dimes&quot; weld beads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
