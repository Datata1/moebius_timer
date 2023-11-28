// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@nuxtjs/google-fonts"],
  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ssr: true,

  app: {
    head: {
      bodyAttrs: {
        class: "overflow-hidden",
      },
      script: [
        // {
        //   src: "https://use.ntpjs.org/ntp.js",
        //   async: true,
        //   defer: true,
        // },
      ],
    },
  },
  googleFonts: {
    families: {
      Roboto: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
      Inter: {
        wght: [700],
      },
    },
  },
  devtools: { enabled: true },
});
