import { useRef, useEffect, useState } from 'react'

const BASE_FREQ = 14074.0

export default function HamRadioSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const [frequency, setFrequency] = useState(BASE_FREQ)
  const [rotation, setRotation] = useState(0)
  const [sliderValue, setSliderValue] = useState(14074)
  const rotationRef = useRef(0)

  useEffect(() => {
    rotationRef.current = rotation
  }, [rotation])
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let offset = 0
    let rafId: number

    const setSize = () => {
      const dpr = window.devicePixelRatio ?? 1
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, w, h)
      ctx.beginPath()
      ctx.moveTo(0, h / 2)
      for (let i = 0; i < w; i++) {
        const amplitude = 20
        const freq = 0.05
        const noise = Math.random() * 10
        const y = h / 2 + Math.sin((i + offset) * freq) * amplitude + noise - 5
        ctx.lineTo(i, y)
      }
      ctx.strokeStyle = '#22c55e'
      ctx.lineWidth = 1
      ctx.stroke()
      offset += 2
      rafId = requestAnimationFrame(draw)
    }

    setSize()
    draw()

    const onResize = () => {
      setSize()
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Tuning knob drag
  useEffect(() => {
    const knob = knobRef.current
    if (!knob) return

    let isDragging = false
    let startY = 0
    let startRotation = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      startY = e.clientY
      startRotation = rotationRef.current
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaY = startY - e.clientY
      const newRotation = startRotation + deltaY
      setRotation(newRotation)
      setFrequency(BASE_FREQ + newRotation / 1000)
      startY = e.clientY
      startRotation = newRotation
    }

    const onMouseUp = () => {
      isDragging = false
    }

    knob.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      knob.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)
    setSliderValue(val)
    setFrequency(val / 1000)
  }

  return (
    <section
      id="ham-radio"
      className="bg-[#111] text-white py-32 px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="noise-overlay" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="font-mono text-red-500 text-xs tracking-widest">
                LIVE FREQUENCY
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Signal &
              <br />
              Spectrum
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-lg font-light">
              Experience the analog world. Tune the dial to discover signals from around the globe.
              A digital homage to my passion for amateur radio.
            </p>

            {/* Radio Controls */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                <div className="font-mono text-2xl text-green-500">
                  {frequency.toFixed(2)} MHz
                </div>
                <div className="text-xs font-mono text-gray-500">MODE: USB</div>
              </div>

              <div className="h-32 bg-black rounded-lg mb-8 relative overflow-hidden border border-gray-800 group">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full opacity-60 block"
                  style={{ width: '100%', height: '100%' }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-px bg-green-500/30" />
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-gray-600">
                  WATERFALL DISPLAY
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-800" />
                  <div
                    ref={knobRef}
                    className="ham-radio-dial absolute inset-2 rounded-full bg-gradient-to-br from-gray-700 to-black shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    <div className="w-4 h-4 bg-gray-900 rounded-full border border-gray-600" />
                    <div className="absolute top-2 w-2 h-2 bg-white rounded-full" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-gray-500 font-mono mb-2">
                    <span>7.000</span>
                    <span>14.000</span>
                    <span>21.000</span>
                  </div>
                  <input
                    type="range"
                    min={7000}
                    max={21000}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="mt-6 flex gap-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs font-mono rounded border border-gray-700 transition-colors"
                    >
                      SCAN
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-xs font-mono rounded border border-gray-700 transition-colors"
                    >
                      MUTE
                    </button>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs font-mono text-green-500">RX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[600px] rounded-2xl overflow-hidden border border-gray-800">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f4b37ada7f-a13939aa46df47caaafd.png"
              alt="Radio Equipment"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <div className="inline-block px-3 py-1 border border-white/30 rounded-full text-xs font-mono mb-4 backdrop-blur-md">
                STATION: K1ABC
              </div>
              <h3 className="text-3xl font-bold mb-2">The Shack</h3>
              <p className="text-gray-400 text-sm max-w-sm">
                My custom built station featuring ICOM transceivers and home-brewed dipole antennas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
