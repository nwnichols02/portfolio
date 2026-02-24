import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useTranslation } from 'react-i18next'

const projectEntryKeys: { title: string; subtitle: string; description: string; links: string }[] = [
  {
    title: 'projects.roseCreek.title',
    subtitle: 'projects.roseCreek.subtitle',
    description: 'projects.roseCreek.description',
    links: 'projects.roseCreek.links',
  },
  {
    title: 'projects.tesla.title',
    subtitle: 'projects.tesla.subtitle',
    description: 'projects.tesla.description',
    links: 'projects.tesla.links',
  },
  {
    title: 'projects.miniGames.title',
    subtitle: 'projects.miniGames.subtitle',
    description: 'projects.miniGames.description',
    links: 'projects.miniGames.links',
  },
]

const Projects: React.FC = () => {
  const { t } = useTranslation()

  const projects = projectEntryKeys.map((keys) => ({
    title: t(keys.title),
    subtitle: t(keys.subtitle),
    description: t(keys.description),
    links: t(keys.links),
  }))

  return (
    <section className="bg-[#1a1a1a] section-padding py-10 md:py-16 border-t border-[#363636]">
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">{t('projects.title')}</h2>
      <p className="text-[#aaa] text-sm mb-8">{t('projects.subtitle')}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Card
            key={p.title}
            className="bg-[#252525] border-[#363636] text-left cursor-pointer hover:border-[#555] transition-colors min-h-[44px]"
          >
            <CardHeader className="pb-2">
              <h3 className="text-white font-medium">{p.title}</h3>
              <p className="text-[#999] text-xs">{p.subtitle}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-[#aaa] text-sm mb-3">{p.description}</p>
              <p className="text-[#888] text-xs">{p.links}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-[#666] text-xs mt-4">{t('projects.detailHint')}</p>
    </section>
  )
}

export default Projects
