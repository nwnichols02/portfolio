import React from 'react'
import { useTranslation } from 'react-i18next'

const Contact: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-[#1a1a1a] section-padding py-10 md:py-16 border-t border-[#363636]">
      <div className="max-w-xl">
        <h2 className="text-white text-lg md:text-xl font-semibold mb-2">
          {t('contact.title')}
        </h2>
        <p className="text-[#aaa] text-sm mb-8">{t('contact.placeholder')}</p>
        <form className="space-y-4 mb-8">
          <div>
            <label htmlFor="contact-name" className="block text-[#aaa] text-sm mb-1">
              {t('contact.nameLabel')}
            </label>
            <input
              id="contact-name"
              type="text"
              className="w-full bg-[#252525] border border-[#363636] rounded px-3 py-2.5 min-h-[44px] text-white text-sm focus:outline-none focus:border-[#555]"
              placeholder={t('contact.namePlaceholder')}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-[#aaa] text-sm mb-1">
              {t('contact.emailLabel')}
            </label>
            <input
              id="contact-email"
              type="email"
              className="w-full bg-[#252525] border border-[#363636] rounded px-3 py-2.5 min-h-[44px] text-white text-sm focus:outline-none focus:border-[#555]"
              placeholder={t('contact.emailPlaceholder')}
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-[#aaa] text-sm mb-1">
              {t('contact.messageLabel')}
            </label>
            <textarea
              id="contact-message"
              rows={4}
              className="w-full bg-[#252525] border border-[#363636] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#555] resize-y"
              placeholder={t('contact.messagePlaceholder')}
            />
          </div>
          <button
            type="submit"
            className="bg-white text-black font-medium text-sm px-5 py-3 min-h-[44px] rounded hover:bg-gray-200 transition-colors flex items-center"
          >
            {t('contact.sendButton')}
          </button>
        </form>
        <p className="text-[#888] text-sm mb-2">{t('contact.linksLabel')}</p>
        <p className="text-[#666] text-xs">{t('contact.signalMap')}</p>
      </div>
    </section>
  )
}

export default Contact
