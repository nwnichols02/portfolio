import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ClassicPortfolio from './portfolio/ClassicPortfolio'
import WireframePortfolio from './portfolio/WireframePortfolio'
import ArchitectPortfolio from './portfolio/ArchitectPortfolio'

const queryClient = new QueryClient()

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: WireframePortfolio,
})

const classicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/classic',
  component: ClassicPortfolio,
})

const architectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/architect',
  component: ArchitectPortfolio,
})

const routeTree = rootRoute.addChildren([indexRoute, classicRoute, architectRoute])

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