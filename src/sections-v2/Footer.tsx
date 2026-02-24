import React from 'react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-[#1a1a1a] section-padding py-6 md:py-8 border-t border-[#363636]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-[#888] text-sm">{t('footer.credits')}</p>
        <Link
          to="/classic"
          className="text-[#666] text-xs hover:text-[#aaa] transition-colors underline min-h-[44px] flex items-center"
        >
          {t('footer.classicLink')}
        </Link>
      </div>
    </footer>
  )
}

export default Footer
