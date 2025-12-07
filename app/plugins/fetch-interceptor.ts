export default defineNuxtPlugin(() => {
  globalThis.$fetch = $fetch.create({
    onRequest: ({ options }) => {
      const token = localStorage.getItem('token')

      if (token && typeof options.headers === 'object') {
        options.headers.set('authorization', `Bearer ${token}`)
      }
    },

    onResponse: ({ response, error }) => {
      if (error) {
        console.error(error)
        return
      }
    }
  })
})
