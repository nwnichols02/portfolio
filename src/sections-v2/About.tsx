import React from 'react'
import { useTranslation } from 'react-i18next'

const optimizationKeys = [
  'about.optimization1',
  'about.optimization2',
  'about.optimization3',
  'about.optimization4',
  'about.optimization5',
] as const

const About: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-[#1a1a1a] section-padding py-10 md:py-16 border-t border-[#363636]">
      <div className="max-w-4xl">
        <p className="text-[#888] text-xs uppercase tracking-wider mb-3">{t('about.sectionLabel')}</p>
        <h2 className="text-white text-xl md:text-[28px] md:leading-9 font-semibold mb-5">
          {t('about.title')}
        </h2>
        <p className="text-[#aaa] text-sm leading-relaxed mb-8 max-w-[520px]">
          {t('about.bio')}
        </p>
        <h3 className="text-[#ccc] text-base font-medium mb-4">{t('about.optimizeTitle')}</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-12">
          {optimizationKeys.map((key) => (
            <li key={key} className="text-[#aaa] text-sm">
              • {t(key)}
            </li>
          ))}
        </ul>
        <div className="bg-[#252525] border border-[#363636] rounded-lg p-5 max-w-sm">
          <p className="text-[#888] text-xs uppercase tracking-wider mb-2">{t('about.callSignLabel')}</p>
          <p className="text-white text-sm font-medium">{t('about.callSign')}</p>
          <p className="text-[#aaa] text-sm">{t('about.qth')}</p>
          <p className="text-[#aaa] text-sm">{t('about.bands')}</p>
        </div>
      </div>
    </section>
  )
}

export default About
