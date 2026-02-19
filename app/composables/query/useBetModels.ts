import { useQuery } from '@tanstack/vue-query'
import type { BetModel, Bet } from '~/types'

interface ResultsByModelParams {
  initialDate?: string
  finalDate?: string
}

export const useBetModels = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  return useQuery({
    queryKey: ['bet-models'],
    queryFn: () => $fetch<{ betModels: BetModel[] }>(baseURL + `/bet-models`)
  })
}

export const useBetsByModel = (name: Ref<string | undefined>, date: Ref<string>) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  return useQuery({
    queryKey: ['bets-by-model', name, date],
    queryFn: () => $fetch<{ bets: Bet[] }>(baseURL + `/bet-models/${name.value}/bets?date=${date.value}`),
    enabled: computed(() => !!name.value)
  })
}

export const useResultsByModel = (name: Ref<string | undefined>, params?: Ref<ResultsByModelParams>) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  return useQuery({
    queryKey: ['results-by-model', name, params],
    queryFn: () => $fetch<{ results: BetModel[] }>(baseURL + `/bet-models/${name.value}/historical-metrics`, {
      method: 'GET',
      params: params?.value
    }),
    enabled: computed(() => !!name.value)
  })
}
