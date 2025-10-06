<script setup lang="ts">
import { ref } from 'vue'
import { flags } from '@/constants/icon'

type Lang = 'vn' | 'en'

const currentLang = ref<Lang>('vn')
const isOpen = ref(false)

const langs: Lang[] = ['vn', 'en']

const selectLang = (lang: Lang) => {
  currentLang.value = lang
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <div
      class="flex items-center gap-1 cursor-pointer select-none"
      @click="isOpen = !isOpen"
    >
      <img :src="flags[currentLang]" :alt="currentLang" class="w-4 h-4" />
      <span class="uppercase text-13 font-medium">{{ currentLang }}</span>
      <img
        src="/images/dropdown.svg"
        alt="dropdown"
        class="w-[12px] h-[12px] transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </div>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 bg-white shadow-md rounded-md w-20 py-1 z-10 border border-gray-100"
    >
      <div
        v-for="lang in langs"
        :key="lang"
        class="flex items-center gap-2 px-3 py-1 hover:bg-gray-100 cursor-pointer transition"
        @click="selectLang(lang)"
      >
        <img :src="flags[lang]" :alt="lang" class="w-4 h-4" />
        <span class="uppercase text-13 font-medium text-black">{{ lang }}</span>
      </div>
    </div>
  </div>
</template>
