<script setup lang="ts">
import { ref } from 'vue'
import { ICON_HEART } from '@/constants/icon';
import { MAIN_MENU } from '@/constants/menu'
const activeMenu = ref<number | null>(null)
</script>

<template>
  <header class="w-full">
    <div class="bg-dark text-white text-sm py-13">
      <div class="container mx-auto flex justify-between items-center px-4">
        <div class="flex items-center gap-2">
          <span class="text-13">Hotline: <span class="font-semibold">0966158666</span> (8h – 21h30)</span>
          <span class="mx-2 text-gray-400">|</span>
          <NuxtLink to="/lien-he" class="hover:underline text-13">Liên hệ hợp tác</NuxtLink>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLink to="/cua-hang" class="hover:underline">Tìm cửa hàng</NuxtLink>
          <span class="text-gray-400">|</span>
          <NuxtLink to="/kiem-tra-don" class="hover:underline">Kiểm tra đơn hàng</NuxtLink>
          <span class="text-gray-400">|</span>

          <!-- <div class="flex items-center gap-1 cursor-pointer">
              <img src="/images/flag-vn.png" alt="VN" class="w-4 h-4" />
              <span>VN</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6" />
              </svg>
            </div> -->

          <NuxtLink to="https://b2b.bitis.com.vn/?utm_source=trade&utm_medium=b2b_header">
            <NuxtImg src="/images/sell-b2b.jpg" alt="Bán hàng B2B" width="120" height="28"
              class="hover:opacity-90 transition" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="bg-white border-b border-gray-100 shadow-sm">
      <div class="container mx-auto flex justify-between items-center py-2 px-4">
        <NuxtLink to="/">
          <img src="/images/logo.svg" alt="Biti's" loading="eager" decoding="async" data-nuxt-no-img
            class="w-[95px] h-[60px]" />
        </NuxtLink>

        <nav class="hidden lg:flex items-center gap-6 pt-25 pb-25 text-sm font-medium text-dark relative">
          <div v-for="(menu, index) in MAIN_MENU" :key="index" class="relative group" @mouseenter="activeMenu = index"
            @mouseleave="activeMenu = null">
            <NuxtLink :to="menu.link" class="transition flex items-center gap-1">
              {{ menu.title }}
              <img src="/images/dropdown.svg" alt="drop down" class="w-[11px] h-[11px]" />
            </NuxtLink>

            <div v-if="menu.children" v-show="activeMenu === index"
              class="absolute left-0 top-full bg-white border border-gray-200 shadow-lg mt-2 min-w-[220px] z-50">
              <NuxtLink v-for="(child, i) in menu.children" :key="i" :to="child.link"
                class="block px-4 py-2 text-dark hover:bg-gray-50 transition">
                {{ child.title }}
              </NuxtLink>
            </div>
          </div>
        </nav>

        <div class="flex items-center gap-4">
          <div class="relative hidden md:block">
            <input type="text" placeholder="Bạn cần tìm gì..." class="w-[186px] h-[35px] bg-background-grayDark text-dark text-13 placeholder:text-grayLight
         pt-3 pr-8 pb-3 pl-40
         focus:bg-white transition-all duration-200" />

            <img src="/images/search.svg" alt="Tìm kiếm"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-[16px] h-[16px] opacity-70 pointer-events-none" />
          </div>

          <div class="flex items-center gap-3">
            <button class="relative transition">
              <img src="/images/user.svg" alt="user" class="w-[22px] h-[22px]" />
            </button>

            <button class="relative transition">
              <img :src="ICON_HEART" alt="Wishlist" class="w-[22px] h-[22px]" />
              <span
                class="absolute -top-[6px] -right-[6px] bg-black text-white text-[10px] font-semibold rounded-full w-[16px] h-[16px] flex items-center justify-center border border-white shadow-md">
                0
              </span>
            </button>

            <button class="relative transition">
              <img src="/images/cart.svg" alt="cart" class="w-[22px] h-[22px]" />
              <span
                class="absolute -top-[6px] -right-[6px] bg-black text-white text-[10px] font-semibold rounded-full w-[16px] h-[16px] flex items-center justify-center border border-white shadow-md">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
