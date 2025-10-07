<template>
  <section class="banner-carousel">
    <Swiper
      :modules="[Autoplay, Pagination, EffectFade]"
      :loop="true"
      :autoplay="autoplay"
      :pagination="pagination"
      effect="fade"
      :speed="800"
      class="mySwiper"
    >
      <SwiperSlide
        v-for="(banner, index) in BANNERS"
        :key="index"
        class="banner-slide"
      >
        <NuxtImg
          :src="banner.src"
          :alt="banner.alt"
          class="w-full banner-image"
          format="webp"
          width="1280"
          height="500"
          quality="80"
          sizes="(max-width: 768px) 100vw, 1280px"
          loading="eager"
          decoding="async"
          preload
        />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import type { PaginationOptions, AutoplayOptions } from 'swiper/types'

// CSS import cần đủ cả 3 loại
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

import { BANNERS } from '@/constants/images'

// ✅ Định nghĩa options đúng kiểu để không cần as any
const autoplay: AutoplayOptions = {
  delay: 4000,
  disableOnInteraction: false,
}

const pagination: PaginationOptions = {
  clickable: true,
}
</script>
