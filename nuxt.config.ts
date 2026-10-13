// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Users table UTW TT',
      htmlAttrs: { lang: 'en' },
    },
  },
  css: ['~/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/styles/_variables.scss" as *;
          @use "~/styles/_mixins.scss" as *;
        `,
        },
      },
    },
  },
})
