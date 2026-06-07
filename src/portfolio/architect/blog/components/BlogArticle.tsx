import type { BlogPostContent } from '../types'
import { POST_SECTIONS, PROSE } from '../types'

interface BlogArticleProps {
  content: BlogPostContent
  showGenericLesson?: boolean
}

/**
 * Renders the four standard blog sections from a content module.
 */
export function BlogArticle({ content, showGenericLesson = false }: BlogArticleProps) {
  return (
    <>
      <section id="overview" className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-black dark:text-white">
          Overview
        </h2>
        {content.overview}
      </section>

      <section id="architecture" className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-black dark:text-white">
          Architecture decisions
        </h2>
        {content.architecture}
      </section>

      <section id="impact" className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-black dark:text-white">
          Impact & tradeoffs
        </h2>
        {content.impact}
      </section>

      <section id="lessons" className="space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-black dark:text-white">
          Lessons for teams
        </h2>
        {showGenericLesson && (
          <p className={PROSE}>
            The common thread across all of these projects is simple:{' '}
            <span className="font-medium text-gray-900 dark:text-gray-100">
              architecture is there to serve teams, not the other way around
            </span>
            . Good systems make it obvious how to do the right thing, and cheap to recover when you
            inevitably get something wrong.
          </p>
        )}
        {content.lessons}
      </section>
    </>
  )
}

export { POST_SECTIONS }
