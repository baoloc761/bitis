<script setup lang="ts">
import { CONTENT_BANNERS } from "@/constants/images";
</script>

<template>
  <section class="relative pt-50 pb-30 bg-cover bg-center mb-[70px]"
    :style="{ backgroundImage: `url('/images/banners/bg-content.webp')`, backgroundPosition: 'center top', marginTop: '50px' }">
    <h4 class="text-center text-18 mb-40">
      CHÚNG TÔI CÓ GÌ MỚI
    </h4>

    <div class="container mx-auto flex flex-col md:flex-row justify-center gap-6 px-4">
      <div v-for="(banner, index) in CONTENT_BANNERS" :key="index"
        class="overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
        <NuxtImg :src="banner.src" :alt="banner.alt" width="510" height="275" format="webp" quality="85" loading="lazy"
          decoding="async" />
      </div>
    </div>

  </section>
  <NuxtImg src="/images/banners/banner_stitch_.webp" width="510" height="180" format="webp" quality="85" loading="lazy"
    decoding="async" class="w-full overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer" />
</template>
