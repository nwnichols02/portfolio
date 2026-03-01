import '../styles/architect-portfolio.css'
import ArchitectHeader from './architect/ArchitectHeader'
import ArchitectHero from './architect/ArchitectHero'
import ArchitectureSection from './architect/ArchitectureSection'
import HamRadioSection from './architect/HamRadioSection'
// import WeldingSection from './architect/WeldingSection'
import AboutSection from './architect/AboutSection'
import ArchitectContact from './architect/ArchitectContact'

export default function ArchitectPortfolio() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] text-brand-text font-sans antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black architect-portfolio-scrollbar">
      <ArchitectHeader />
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
