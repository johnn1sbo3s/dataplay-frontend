import { useQuery } from '@tanstack/vue-query'
import type { BetModel } from '~/types'

export const useBetModels = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  return useQuery({
    queryKey: ['bet-models'],
    queryFn: () => $fetch<{ betModels: BetModel[] }>(baseURL + `/bet-models`)
  })
}
