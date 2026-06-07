import type { BlogPostContent } from './types'
import { content as enterpriseMfPlatform } from './content/enterprise-mf-platform'
import { content as secureSdlcFrontend } from './content/secure-sdlc-frontend'
import { content as reactMicroLoader } from './content/react-micro-loader'
import { content as beginnersGuide } from './content/beginners-guide'
import { content as technicalLeadership } from './content/technical-leadership'
import { content as domainDrivenDesign } from './content/domain-driven-design'
import { content as melonSeriesIntro } from './content/melon-series-intro'
import { content as melonAstFirst } from './content/melon-ast-first'
import { content as melonSplitStorageSync } from './content/melon-split-storage-sync'
import { content as melonThreeQuerySurfaces } from './content/melon-three-query-surfaces'
import { content as melonPrismaNotEngine } from './content/melon-prisma-not-engine'
import { content as melonExpoGoVsNative } from './content/melon-expo-go-vs-native'
import { content as melonNativeIsAProduct } from './content/melon-native-is-a-product'
import { content as melonReactiveQueries } from './content/melon-reactive-queries'
import { content as melonPostFetchIncludes } from './content/melon-post-fetch-includes'
import { content as melonPrdBeforeCode } from './content/melon-prd-before-code'
import { content as melonDocsAsProduct } from './content/melon-docs-as-product'
import { content as melonOpenSourceRelease } from './content/melon-open-source-release'
import { content as melonCodemodsMigration } from './content/melon-codemods-migration'

export const POST_CONTENT: Record<string, BlogPostContent> = {
  'enterprise-mf-platform': enterpriseMfPlatform,
  'secure-sdlc-frontend': secureSdlcFrontend,
  'react-micro-loader': reactMicroLoader,
  'beginners-guide': beginnersGuide,
  'technical-leadership': technicalLeadership,
  'domain-driven-design': domainDrivenDesign,
  'melon-series-intro': melonSeriesIntro,
  'melon-ast-first': melonAstFirst,
  'melon-split-storage-sync': melonSplitStorageSync,
  'melon-three-query-surfaces': melonThreeQuerySurfaces,
  'melon-prisma-not-engine': melonPrismaNotEngine,
  'melon-expo-go-vs-native': melonExpoGoVsNative,
  'melon-native-is-a-product': melonNativeIsAProduct,
  'melon-reactive-queries': melonReactiveQueries,
  'melon-post-fetch-includes': melonPostFetchIncludes,
  'melon-prd-before-code': melonPrdBeforeCode,
  'melon-docs-as-product': melonDocsAsProduct,
  'melon-open-source-release': melonOpenSourceRelease,
  'melon-codemods-migration': melonCodemodsMigration,
}

const LEGACY_GENERIC_LESSON_SLUGS = new Set([
  'enterprise-mf-platform',
  'secure-sdlc-frontend',
  'react-micro-loader',
  'beginners-guide',
  'domain-driven-design',
])

/**
 * Whether BlogArticle should prepend the generic architecture lesson paragraph.
 */
export function shouldShowGenericLesson(slug: string): boolean {
  return LEGACY_GENERIC_LESSON_SLUGS.has(slug)
}
