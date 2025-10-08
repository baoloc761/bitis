<template>
  <footer class="bg-white">
    <div class="flex flex-wrap">
      <NuxtLink
        v-for="(img, index) in FOOTER_IMAGES"
        :key="index"
        :to="img.href"
        target="_blank"
        rel="noopener noreferrer"
        external
      >
        <NuxtImg
          :src="img.src"
          :alt="img.alt"
          format="webp"
          width="216"
          height="216"
          quality="85"
          loading="lazy"
          class="object-cover"
        />
      </NuxtLink>
    </div>

    <div class="text-center text-[#666] text-sm mt-6">
      <p>Bản quyền © {{ new Date().getFullYear() }} Biti’s Việt Nam</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { FOOTER_IMAGES } from "@/constants/images";
</script>
