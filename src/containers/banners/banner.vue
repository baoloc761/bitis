<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { BANNERS } from '@/constants/banners'
import { createSlider } from '@/utils/slider.ts'

const banners = BANNERS
const current = ref(0)
const translateX = ref(0)
const transition = ref(true)

const slider = createSlider(banners)
let autoSlideTimer: ReturnType<typeof setInterval> | null = null

const handleStart = (e: TouchEvent | MouseEvent) => {
  transition.value = false
  if (autoSlideTimer) clearInterval(autoSlideTimer)
  slider.handleStart(e)
}

const handleMove = (e: TouchEvent | MouseEvent) => {
  slider.handleMove(e, (offsetPercent) => {
    translateX.value = -current.value * 100 + offsetPercent
  })
}

const handleEnd = () => {
  transition.value = true
  const action = slider.handleEnd()
  if (action === 'next') current.value = slider.next()
  else if (action === 'prev') current.value = slider.prev()
  translateX.value = -current.value * 100
  startAutoSlide()
}

const goToSlide = (i: number) => {
  current.value = slider.goTo(i)
  translateX.value = -current.value * 100
}

const startAutoSlide = () => {
  if (autoSlideTimer) clearInterval(autoSlideTimer)
  autoSlideTimer = setInterval(() => {
    transition.value = true
    current.value = slider.next()
    translateX.value = -current.value * 100
  }, 5000)
}

onMounted(() => {
  translateX.value = 0
  setTimeout(startAutoSlide, 2000)
})

onUnmounted(() => {
  if (autoSlideTimer) clearInterval(autoSlideTimer)
})
</script>

<template>
  <section class="relative w-full overflow-hidden select-none touch-pan-x cursor-grab active:cursor-grabbing"
    @touchstart="handleStart" @touchmove="handleMove" @touchend="handleEnd" @mousedown="handleStart"
    @mousemove="handleMove" @mouseup="handleEnd" @mouseleave="handleEnd">
    <div class="flex" :class="transition ? 'transition-transform duration-500 ease-in-out' : ''"
      :style="{ transform: `translateX(${translateX}%)` }">
      <div v-for="(banner, i) in banners" :key="i" class="w-full flex-shrink-0 select-none">
        <NuxtImg
          :src="banner.src"
          :alt="banner.alt"
          width="1280"
          height="480"
          format="webp"
          quality="70"
          sizes="(max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
          :loading="i === 0 ? 'eager' : 'lazy'"
          fetchpriority="high"
          decoding="async"
          class="w-[100%] object-cover"
        />
      </div>
    </div>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      <button v-for="(banner, i) in banners" :key="i" @click="goToSlide(i)"
        class="w-3 h-3 rounded-full transition-all duration-300" :aria-label="`Đi tới banner ${i + 1}`"
        :class="current === i ? 'bg-black scale-125' : 'bg-black/30 hover:bg-black/60'" />
    </div>
  </section>
</template>
