import { useQuery } from '@tanstack/vue-query'
import type { Bet } from '~/types'

interface BetsParams {
  date?: string
}

export const useBets = (params: Ref<BetsParams>) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  return useQuery({
    queryKey: ['bets', params],
    queryFn: () => $fetch<{ bets: Bet[] }>(baseURL + `/bets?`, {
      method: 'GET',
      params: params.value
    })
  })
}
