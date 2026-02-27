import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ClassicPortfolio from './portfolio/ClassicPortfolio'
import WireframePortfolio from './portfolio/WireframePortfolio'
import ArchitectPortfolio from './portfolio/ArchitectPortfolio'
import BlogIndex from './portfolio/architect/BlogIndex'
import BlogPage from './portfolio/architect/BlogPage'

const queryClient = new QueryClient()

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/old',
  component: WireframePortfolio,
})

const classicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/classic',
  component: ClassicPortfolio,
})

const architectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ArchitectPortfolio,
})

const blogIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog',
  component: BlogIndex,
})

const blogPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blog/$slug',
  component: BlogPage,
})

const routeTree = rootRoute.addChildren([indexRoute, classicRoute, architectRoute, blogIndexRoute, blogPostRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App