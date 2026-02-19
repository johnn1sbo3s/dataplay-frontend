import { useQuery } from '@tanstack/vue-query'
import type { BetModel, Bet } from '~/types'

export const useBetModels = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  return useQuery({
    queryKey: ['bet-models'],
    queryFn: () => $fetch<{ betModels: BetModel[] }>(baseURL + `/bet-models`)
  })
}

export const useBetsByModel = (name: Ref<string>, date: Ref<string>) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  console.log('chegou: ', name, date)
  return useQuery({
    queryKey: ['bets-by-model', name, date],
    queryFn: () => $fetch<{ bets: Bet[] }>(baseURL + `/bet-models/${name.value}/bets?date=${date.value}`)
  })
}
