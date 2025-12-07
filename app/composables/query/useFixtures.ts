import { useQuery } from '@tanstack/vue-query'

export const useFixtures = (date: Ref<string>) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  return useQuery({
    queryKey: ['fixtures', date],
    queryFn: () => $fetch(baseURL + `/fixtures?`, {
      method: 'GET',
      params: {
        date: date.value
      }
    })
  })
}
