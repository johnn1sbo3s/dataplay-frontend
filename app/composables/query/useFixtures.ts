import { useQuery } from '@tanstack/vue-query'
import type { Fixture } from '~/types'

export const useFixtures = (date: Ref<string>) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  return useQuery({
    queryKey: ['fixtures', date],
    queryFn: () => $fetch<{ fixtures: Fixture[] }>(baseURL + `/fixtures?`, {
      method: 'GET',
      params: {
        date: date.value
      }
    })
  })
}
