import { useEffect, useRef } from 'react'

/**
 * Matrix digital rain effect adapted from react-mdr
 * (https://github.com/FullStackWithLawrence/react-mdr), based on
 * "Matrix raining code effect using JavaScript" by Adam Nagy.
 * One character per column, re-randomized each frame; light fade for trail.
 */
const KATAKANA =
  'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン'
const LATIN = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMS = '0123456789'
const ALPHABET = KATAKANA + LATIN + NUMS

const FONT_SIZE = 16
const FADE_ALPHA = 0.05
const RESET_THRESHOLD = 0.975
const RAIN_COLOR = '#0F0'
/** Rows advanced per frame (lower = slower) */
const DROP_SPEED = 0.45

/** Opacity of the rain overlay so the portfolio is visible through it (0–1) */
const RAIN_OPACITY = 0.55

export default function MatrixCodeRain({ visible }: { visible: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!visible || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let rainDrops: number[] = []

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      if (w === 0 || h === 0) return
      const dpr = window.devicePixelRatio ?? 1
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const columns = Math.floor(w / FONT_SIZE)
      rainDrops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * (h / FONT_SIZE))
      )
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      if (w === 0 || h === 0) {
        animationId = requestAnimationFrame(draw)
        return
      }

      const columns = Math.floor(w / FONT_SIZE)
      if (rainDrops.length !== columns) {
        rainDrops = Array.from({ length: columns }, (_, i) =>
          rainDrops[i] ?? Math.floor(Math.random() * (h / FONT_SIZE))
        )
        if (rainDrops.length > columns) rainDrops.length = columns
      }

      // Fade trail (react-mdr style: very light alpha)
      ctx.fillStyle = `rgba(0, 0, 0, ${FADE_ALPHA})`
      ctx.fillRect(0, 0, w, h)

      ctx.fillStyle = RAIN_COLOR
      ctx.font = `${FONT_SIZE}px monospace`

      for (let i = 0; i < rainDrops.length; i++) {
        const char = ALPHABET.charAt(
          Math.floor(Math.random() * ALPHABET.length)
        )
        ctx.fillText(char, i * FONT_SIZE, rainDrops[i] * FONT_SIZE)

        if (
          rainDrops[i] * FONT_SIZE > h &&
          Math.random() > RESET_THRESHOLD
        ) {
          rainDrops[i] = 0
        }
        rainDrops[i] += DROP_SPEED
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
      style={{
        background: 'rgba(0, 0, 0, 0.05)',
        opacity: RAIN_OPACITY,
      }}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        aria-hidden
      />
    </div>
  )
}
