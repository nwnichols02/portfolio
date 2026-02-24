import React from 'react'
import { useTranslation } from 'react-i18next'

type ExperienceEntry = {
  org: string
  role: string
  period: string
  bullets: string[]
}

const experienceEntryKeys: ExperienceEntry[] = [
  {
    org: 'experience.utilisource.org',
    role: 'experience.utilisource.role',
    period: 'experience.utilisource.period',
    bullets: [
      'experience.utilisource.b1',
      'experience.utilisource.b2',
      'experience.utilisource.b3',
      'experience.utilisource.b4',
      'experience.utilisource.b5',
    ],
  },
  {
    org: 'experience.farmers.org',
    role: 'experience.farmers.role',
    period: 'experience.farmers.period',
    bullets: [
      'experience.farmers.b1',
      'experience.farmers.b2',
      'experience.farmers.b3',
    ],
  },
  {
    org: 'experience.bloomtech.org',
    role: 'experience.bloomtech.role',
    period: 'experience.bloomtech.period',
    bullets: [],
  },
  {
    org: 'experience.nwcc.org',
    role: 'experience.nwcc.role',
    period: 'experience.nwcc.period',
    bullets: [],
  },
]

const Experience: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-[#1a1a1a] section-padding py-10 md:py-16 border-t border-[#363636]">
      <div className="max-w-3xl space-y-10">
        {experienceEntryKeys.map((e) => (
          <div key={e.org} className="border-b border-[#363636] pb-8 last:border-0 last:pb-0">
            <h3 className="text-white font-semibold text-base md:text-lg">{t(e.org)}</h3>
            <p className="text-[#ccc] text-sm">{t(e.role)}</p>
            <p className="text-[#888] text-xs mt-1">{t(e.period)}</p>
            {e.bullets.length > 0 && (
              <ul className="mt-3 text-[#aaa] text-sm whitespace-pre-line list-disc list-inside">
                {e.bullets.map((b) => (
                  <li key={b}>{t(b)}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
