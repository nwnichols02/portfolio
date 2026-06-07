import { Link } from '@tanstack/react-router'

interface BlogLinkProps {
  slug: string
  children: React.ReactNode
}

/**
 * Internal link to another blog post.
 */
export function BlogLink({ slug, children }: BlogLinkProps) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug }}
      className="text-gray-900 dark:text-gray-100 underline underline-offset-4 decoration-[0.5px] hover:text-black dark:hover:text-white"
    >
      {children}
    </Link>
  )
}
