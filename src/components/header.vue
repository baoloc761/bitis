<template>
  <header class="w-full relative z-50">
    <div class="hidden md:block bg-dark text-white text-sm py-13">
      <div class="container mx-auto flex justify-between items-center px-4">
        <div class="flex items-center gap-2">
          <span class="text-13">
            Hotline: <span class="font-semibold">0966158666</span> (8h – 21h30)
          </span>
          <span class="mx-2 text-gray-400">|</span>
          <NuxtLink to="/lien-he" class="hover:underline text-13">
            Liên hệ hợp tác
          </NuxtLink>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLink to="/cua-hang" class="hover:underline">Tìm cửa hàng</NuxtLink>
          <span class="text-gray-400">|</span>
          <NuxtLink to="/kiem-tra-don" class="hover:underline">Kiểm tra đơn hàng</NuxtLink>
          <span class="text-gray-400">|</span>
          <Languages />
          <NuxtLink to="https://b2b.bitis.com.vn/?utm_source=trade&utm_medium=b2b_header">
            <NuxtImg src="/images/sell-b2b.jpg" alt="Bán hàng B2B" width="120" height="28" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="hidden md:flex bg-white border-b border-gray-100 shadow-sm">
      <div class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/">
          <NuxtImg src="/images/logo.svg" alt="Biti's" class="w-[95px] h-[60px]" />
        </NuxtLink>

        <HeaderNav />

        <div class="flex items-center gap-4">
          <div class="relative hidden md:block">
            <input type="text" placeholder="Bạn cần tìm gì..."
              class="w-[186px] h-[35px] bg-background-grayDark text-dark text-13 placeholder:text-grayLight pt-3 pr-8 pb-3 pl-40 focus:bg-white transition-all duration-200" />
            <NuxtImg src="/images/search.svg" alt="Tìm kiếm"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-[16px] h-[16px] opacity-70 pointer-events-none" />
          </div>

          <div class="flex items-center gap-3">
            <button aria-label="Tài khoản">
              <NuxtImg src="/images/user.svg" alt="user" class="w-[22px] h-[22px]" />
            </button>
            <button aria-label="Yêu thích" class="relative">
              <img :src="ICON_HEART" alt="Wishlist" class="w-[22px] h-[22px]" />
              <span
                class="absolute -top-[6px] -right-[6px] bg-black text-white text-[10px] font-semibold rounded-full w-[16px] h-[16px] flex items-center justify-center border border-white shadow-md">
                0
              </span>
            </button>
            <button aria-label="Giỏ hàng" class="relative">
              <NuxtImg src="/images/cart.svg" alt="cart" class="w-[22px] h-[22px]" />
              <span
                class="absolute -top-[6px] -right-[6px] bg-black text-white text-[10px] font-semibold rounded-full w-[16px] h-[16px] flex items-center justify-center border border-white shadow-md">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex md:hidden items-center justify-between px-15 py-10 border-b border-gray-200 bg-white relative">
      <div class="flex items-center gap-3">
        <button @click="toggleMenu" class="flex flex-col gap-[5px]">
          <template v-if="!isMenuOpen">
            <span class="block w-6 h-[2px] bg-black"></span>
            <span class="block w-6 h-[2px] bg-black"></span>
            <span class="block w-6 h-[2px] bg-black"></span>
          </template>
          <template v-else>
            <img src="/images/close.svg" alt="Đóng menu" class="w-[18px]" />
          </template>
        </button>

        <Languages />
      </div>

      <NuxtLink to="/">
        <NuxtImg src="/images/logo.svg" alt="Biti's" class="h-[36px]" />
      </NuxtLink>

      <div class="flex items-center gap-4">
        <button aria-label="Yêu thích">
          <NuxtImg :src="ICON_HEART" alt="Wishlist" class="w-[22px] h-[22px]" />
        </button>
        <button aria-label="Tài khoản">
          <NuxtImg src="/images/user.svg" alt="user" class="w-[22px] h-[22px]" />
        </button>
        <button aria-label="Giỏ hàng">
          <NuxtImg src="/images/cart.svg" alt="cart" class="w-[22px] h-[22px]" />
        </button>
      </div>
    </div>

    <transition enter-active-class="animate-slide-down" leave-active-class="animate-slide-up">
      <div v-if="isMenuOpen"
        class="absolute top-50 left-0 w-full bg-white border-t border-gray-100 shadow-xl overflow-hidden z-[60]">
        <transition mode="out-in"
          :enter-active-class="transitionDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'"
          :leave-active-class="transitionDirection === 'right' ? 'animate-slide-out-left' : 'animate-slide-out-right'">
          <div v-if="currentMenu" key="submenu" class="divide-y divide-gray-100">
            <button @click="closeSubmenu"
              class="flex items-center gap-3 px-20 py-14 text-[15px] font-medium text-dark hover:bg-gray-50 transition">
              <img src="/images/arrow-left.svg" alt="Quay về" class="w-[14px] opacity-70" />
              <span>QUAY VỀ</span>
            </button>

            <NuxtLink v-for="(child, i) in currentMenu.children" :key="i" :to="child.link"
              class="block px-20 py-14 text-[15px] text-dark hover:bg-gray-50" @click="toggleMenu">
              {{ child.title }}
            </NuxtLink>
          </div>

          <div v-else key="mainmenu" class="divide-y divide-gray-100 animate-slide-in-left">
            <div v-for="(menu, index) in MAIN_MENU" :key="index"
              class="flex justify-between items-center px-20 py-14 text-[15px] font-medium text-dark">
              <NuxtLink v-if="!menu.children" :to="menu.link" class="flex-1 hover:text-hoverBlue transition"
                @click="toggleMenu">
                {{ menu.title }}
              </NuxtLink>

              <button v-else @click="openSubmenu(index)" class="flex justify-between items-center w-full text-left">
                <span>{{ menu.title }}</span>
                <NuxtImg   src="/images/arrow-right.svg" alt="" class="w-[14px] opacity-70" />
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    <section class="bg-orange h-[70px] flex items-center relative">
      <div class="absolute left-0 md:left-20 flex items-center pl-10 md:pl-0">
        <img src="/images/bitis-hunter.svg" alt="Biti's Hunter" class="h-[32px] md:h-[38px] object-contain" />
      </div>
      <div class="hidden md:flex flex-1 justify-center">
        <span class="font-hunter text-36 text-black font-semibold italic tracking-tight">
          BITI'S HUNTER THẾ HỆ MỚI
        </span>
      </div>
    </section>
    <Banners />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ICON_HEART } from '@/constants/icon'
import { HeaderNav } from '@/containers'
import { Languages } from '@/containers'
import { Banners } from '@/containers'
import { MAIN_MENU } from '@/constants/menu'

const isMenuOpen = ref(false)
const activeSubmenu = ref<number | null>(null)
const transitionDirection = ref<'left' | 'right'>('right')

const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)

const openSubmenu = (index: number) => {
  transitionDirection.value = 'right'
  activeSubmenu.value = index
}
const closeSubmenu = () => {
  transitionDirection.value = 'left'
  activeSubmenu.value = null
}

const currentMenu = computed(() => {
  if (activeSubmenu.value === null) return null
  return MAIN_MENU[activeSubmenu.value] || null
})
</script>