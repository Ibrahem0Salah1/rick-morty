import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  render,
  renderHook,
  type RenderHookOptions,
  type RenderOptions,
} from "@testing-library/react"
import { NuqsAdapter } from "nuqs/adapters/react"
import type { ReactElement, ReactNode } from "react"

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  })
}

export function seedUrl(url: string) {
  window.history.replaceState(null, "", url)
}

type ProviderOptions = {
  url?: string
  queryClient?: QueryClient
}

function buildWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </NuqsAdapter>
    )
  }
}

export function renderWithProviders(
  ui: ReactElement,
  options: RenderOptions & ProviderOptions = {},
) {
  const { url = "/", queryClient = createTestQueryClient(), ...rest } = options
  if (url !== "/") seedUrl(url)
  return {
    queryClient,
    ...render(ui, { wrapper: buildWrapper(queryClient), ...rest }),
  }
}

export function renderHookWithProviders<TResult, TProps>(
  callback: (props: TProps) => TResult,
  options: RenderHookOptions<TProps> & ProviderOptions = {},
) {
  const { url = "/", queryClient = createTestQueryClient(), ...rest } = options
  if (url !== "/") seedUrl(url)
  return {
    queryClient,
    ...renderHook(callback, { wrapper: buildWrapper(queryClient), ...rest }),
  }
}
