declare module "@nuxt/schema" {
  interface NuxtConfig {
    tailwindcss?: {
      cssPath?: string | false;
      configPath?: string;
      viewer?: boolean;
    };
  }
  interface NuxtOptions {
    tailwindcss?: {
      cssPath?: string | false;
      configPath?: string;
      viewer?: boolean;
    };
  }
}
