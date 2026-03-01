import { useRef, useEffect, useState } from 'react'

const BASE_FREQ = 14074.0

export default function HamRadioSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const [, setFrequency] = useState(BASE_FREQ)
  const [rotation, setRotation] = useState(0)
  const [, _setSliderValue] = useState(14074)
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

  return (
    <section
      id="ham-radio"
      className="bg-[#111] text-white py-32 px-6 lg:px-12 relative overflow-hidden"
    >
      <div className="noise-overlay" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-rows-2 gap-16 items-center">
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
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 md:p-6 shadow-2xl">
              <div className="relative w-full overflow-hidden rounded-lg border border-gray-800 bg-black h-[375px]">
                <iframe
                  src="https://www.chilton.com/R8/receiver.html"
                  title="Drake R8 Online Receiver"
                  loading="lazy"
                  className="w-full h-[650px] border-0 -translate-y-0"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent" />
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
                STATION: KJ7CEM
              </div>
              <h3 className="text-3xl font-bold mb-2">The Shack</h3>
              <p className="text-gray-400 text-sm max-w-sm">
                My dream station with a 1000W ICOM transceiver and home-brewed dipole antennas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
