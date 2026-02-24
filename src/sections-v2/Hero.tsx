import React from 'react'
import { portfolio } from '@/content/portfolio'
import { useTranslation } from 'react-i18next'

interface HeroProps {
  onViewProjects: () => void
}

const Hero: React.FC<HeroProps> = ({ onViewProjects }) => {
  const { t } = useTranslation()

  return (
    <section className="relative bg-[#1a1a1a] section-padding pt-8 pb-12 md:pt-12 md:pb-16 flex flex-col lg:flex-row lg:flex-wrap items-start justify-between gap-8 lg:gap-12">
      <div className="max-w-[520px] w-full">
        <h1 className="text-white text-2xl md:text-3xl lg:text-[36px] lg:leading-[48px] font-semibold mb-3">
          {t('portfolio.headline')}
        </h1>
        <p className="text-[#b0b0b0] text-base md:text-lg leading-6 mb-2">
          {t('portfolio.subheadline')}
        </p>
        <p className="text-[#666] text-[10px] leading-4 mb-6 md:mb-10">
          {t('hero.morphHint')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-[#252525] border border-[#363636] rounded-lg p-4 min-h-[44px] flex flex-col justify-center">
            <div className="text-white text-lg md:text-xl font-medium">{t('hero.stat1Value')}</div>
            <div className="text-[#999] text-xs mt-1">{t('hero.stat1Label')}</div>
          </div>
          <div className="bg-[#252525] border border-[#363636] rounded-lg p-4 min-h-[44px] flex flex-col justify-center">
            <div className="text-white text-sm font-medium">{t('hero.stat2Title')}</div>
            <div className="text-[#999] text-xs mt-1">{t('hero.stat2Label')}</div>
          </div>
          <div className="bg-[#252525] border border-[#363636] rounded-lg p-4 min-h-[44px] flex flex-col justify-center">
            <div className="text-white text-sm font-medium">{t('hero.stat3Title')}</div>
            <div className="text-[#999] text-xs mt-1">{t('hero.stat3Label')}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={onViewProjects}
            className="bg-white text-black font-medium text-sm px-5 py-3 min-h-[44px] rounded hover:bg-gray-200 transition-colors flex items-center"
          >
            {t('hero.viewProjects')}
          </button>
          <a
            href={portfolio.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ccc] text-sm font-medium px-5 py-3 min-h-[44px] border border-[#555] rounded hover:border-[#888] hover:text-white transition-colors inline-flex items-center"
          >
            {t('hero.downloadResume')}
          </a>
        </div>
      </div>
      <div className="w-full lg:flex-1 lg:min-w-[280px] lg:max-w-[340px] aspect-[4/3] bg-[#252525] border border-[#363636] rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src="https://us.evocdn.io/dealer/1353/content/media/My_Theme/man-worker-welding-metal-with-welding-machine-in-a-2023-11-27-05-13-53-utc.jpg"
          alt="Welder at work"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}

export default Hero
