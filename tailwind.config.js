/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				'brand-black': '#0a0a0a',
				'brand-gray': '#f5f5f5',
				'brand-text': '#1a1a1a',
				'brand-muted': '#666666',
				'accent-weld': '#FFD700',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				marquee: {
					from: {
						transform: 'translateX(0)'
					},
					to: {
						transform: 'translateX(calc(-100% - var(--gap)))'
					}
				},
				'marquee-vertical': {
					from: {
						transform: 'translateY(0)'
					},
					to: {
						transform: 'translateY(calc(-100% - var(--gap)))'
					}
				},
				meteor: {
					'0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
					'70%': { opacity: 1 },
					'100%': {
						transform: 'rotate(215deg) translateX(-500px)',
						opacity: 0,
					},
				},
				spark: {
					'0%': { opacity: '0', transform: 'scale(0.5)' },
					'50%': { opacity: '1', transform: 'scale(1.2)' },
					'100%': { opacity: '0', transform: 'scale(0.5)' },
				},
				glow: {
					'0%, 100%': { opacity: '0.5' },
					'50%': { opacity: '1' },
				},
				'flip-down': {
					'0%': { transform: 'rotateX(-90deg)', opacity: '0' },
					'50%': { opacity: '0.5' },
					'100%': { transform: 'rotateX(0deg)', opacity: '1' },
				},
			},
			animation: {
				marquee: 'marquee var(--duration) infinite linear',
				'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
				meteor: 'meteor 5s linear infinite',
				'weld-spark': 'spark 0.5s linear infinite',
				'weld-glow': 'glow 2s ease-in-out infinite',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'flip-down': 'flip-down 0.45s ease-out forwards',
			}
		}
	},
	plugins: [
		function ({ addUtilities }) {
			const newUtilities = {
				'.scrollbar-hide': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				},
			}
			addUtilities(newUtilities)
		},
		require("tailwindcss-animate")
	],
	darkMode: ['class', "class"],
}