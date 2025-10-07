// @ts-expect-error Nuxt type not yet includes 'devtools'
import path, { resolve } from "path";
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
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
    "@graphql": resolve(__dirname, "src/services/graphql"),
    "@context": resolve(__dirname, "src/context"),
    "@images": resolve(__dirname, "src/images"),
    "@types": resolve(__dirname, "src/model"),
    "@constants": resolve(__dirname, "src/constants"),
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
        "@graphql": path.resolve(__dirname, "src/services/graphql"),
      },
    },
    build: {
      minify: "esbuild",
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id: string | string[]) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
      cssMinify: true,
    },
  },

  nitro: {
    compressPublicAssets: true,
    minify: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: "vi" },
      title: "Trang web bán hàng trực tuyến của Biti's Việt Name",
      link: [
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
        {
          rel: "preload",
          as: "font",
          href: "/fonts/MN-HUNTER.woff2",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          href: "/fonts/Futura.woff2",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "image",
          href: "/images/logo.svg",
          type: "image/svg+xml",
        },
      ],
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
    provider: "ipx",
    format: ["webp", "avif"],
  },

  modules: ["@nuxt/image"],

  runtimeConfig: {
    public: {
      NUXT_PUBLIC_BITIS_API_BASE:
        process.env.NUXT_PUBLIC_BITIS_API_BASE || "https://bitis.com.vn",
    },
  },
});
