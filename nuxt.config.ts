import path, { resolve } from "path";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],

  components: [
    {
      path: "~/src/components",
      pathPrefix: false,
    },
  ],

  alias: {
    "@": resolve(__dirname, "src"),
    "@components": resolve(__dirname, "src/components"),
    "@containers": resolve(__dirname, "src/containers"),
    "@pages": resolve(__dirname, "src/pages"),
    "@services": resolve(__dirname, "src/services"),
    "@context": resolve(__dirname, "src/context"),
    "@images": resolve(__dirname, "src/images"),
    "@types": resolve(__dirname, "src/model"),
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
      },
    },
    build: {
      minify: "esbuild",
      chunkSizeWarningLimit: 600,
      cssMinify: true,
    },
  },

  nitro: {
    compressPublicAssets: true,
    minify: true,
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'vi',
      },
      title: "Trang chủ Bitis – Nuxt 4 + Vite",
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
        {
          rel: 'preload',
          as: 'image',
          href: '/images/logo.svg',
          type: 'image/svg+xml'
        },
      ],
      // style: [
      //   {
      //     innerHTML: '@import "tailwindcss/base"; @import "tailwindcss/components";',
      //     tagPriority: 'critical',
      //   },
      // ],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "Trang web được tối ưu bởi Nuxt 4 + Vite",
        },
      ],
    },
  },

  image: {
    provider: 'ipx',
    format: ['webp', 'avif'],
    domains: [],
    // experimental: {
    //   disableImageOptimization: true,
    // },
  },

  experimental: {
    payloadExtraction: true,
  },

  modules: ["@nuxt/image"],
  hooks: {
    "vite:extendConfig"(config, { isClient }) {
      if (isClient) {
        config.build = config.build || {};
        config.build.cssMinify = true;
      }
    },
  },
});