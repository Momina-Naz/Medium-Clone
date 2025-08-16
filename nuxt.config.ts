// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
   
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',

  ],

  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined' }
      ]
    }
  },


})

