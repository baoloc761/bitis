<script setup lang="ts">
import { NEWS_ITEMS } from '@/constants/news';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
</script>

<template>
  <section class="py-12 bg-white mt-[70px]">
    <div class="container mx-auto px-4">
      <h2 class="mb-6 border-b border-[#f3f3f3]">
        TIN TỨC BITIS
      </h2>

      <Swiper
        :modules="[Navigation, Autoplay]"
        :slides-per-view="1"
        :space-between="20"
        :loop="true"
        :autoplay="{ delay: 4000, disableOnInteraction: false }"
        navigation
        :breakpoints="{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }
        }"
        class="news-swiper"
      >
        <SwiperSlide v-for="item in NEWS_ITEMS" :key="item.id">
          <article
            class="bg-white shadow-sm overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-md transition-all duration-300"
          >
            <NuxtLink :to="item.link" class="block group relative overflow-hidden">
              <NuxtImg
                :src="item.image"
                :alt="item.title"
                class="w-full h-[230px] object-cover group-hover:scale-105 transition-transform duration-300"
                width="400"
                height="230"
                format="webp"
              />
            </NuxtLink>

            <div class="flex-1 flex flex-col justify-between p-8">
              <div>
                <h3
                  class="text-[15px] font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 uppercase"
                >
                  {{ item.title }}
                </h3>
                <p class="text-sm text-gray-500 line-clamp-2 mb-3">{{ item.excerpt }}</p>
              </div>

              <div
                class="mt-auto flex justify-between items-center border-t border-gray-100 pt-2 text-[13px] text-gray-500 italic"
              >
                <span>{{ item.date }}</span>
                <NuxtLink
                  :to="item.link"
                  class="text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  Xem thêm
                </NuxtLink>
              </div>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>
