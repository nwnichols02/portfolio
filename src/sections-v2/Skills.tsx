import React from 'react'
import { useTranslation } from 'react-i18next'

const Skills: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-[#1a1a1a] section-padding py-10 md:py-16 border-t border-[#363636]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl">
        <div>
          <h3 className="text-white font-medium mb-3">{t('skills.frontEnd')}</h3>
          <p className="text-[#aaa] text-sm leading-relaxed">
            {t('skills.frontEndBullet1')}
          </p>
          <p className="text-[#aaa] text-sm leading-relaxed mt-1">
            {t('skills.frontEndBullet2')}
          </p>
          <p className="text-[#aaa] text-sm leading-relaxed mt-1">
            {t('skills.frontEndBullet3')}
          </p>
          <p className="text-[#aaa] text-sm leading-relaxed mt-1">
            {t('skills.frontEndBullet4')}
          </p>
        </div>
        <div>
          <h3 className="text-white font-medium mb-3">{t('skills.backEnd')}</h3>
          <p className="text-[#aaa] text-sm whitespace-pre-line">
            {t('skills.backEndBullet')}
          </p>
        </div>
        <div>
          <h3 className="text-white font-medium mb-3">{t('skills.architecture')}</h3>
          <p className="text-[#aaa] text-sm whitespace-pre-line">
            {t('skills.architectureBullet')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Skills
