<script setup lang="ts">
import { ref } from "vue";
import { MAIN_MENU } from "@/constants/menu";

const activeMenu = ref<number | null>(null);
</script>

<template>
  <nav
    class="hidden lg:flex items-center gap-8 pt-25 pb-25 text-sm font-medium text-dark relative select-none"
  >
    <div
      v-for="(menu, index) in MAIN_MENU"
      :key="index"
      class="relative group"
      @mouseenter="activeMenu = index"
      @mouseleave="activeMenu = null"
    >
      <NuxtLink
        :to="menu.link"
        class="relative flex items-center gap-1 uppercase tracking-wide text-[15px] text-dark transition-all duration-300 pb-[4px]"
      >
        {{ menu.title }}
        <img
          v-if="menu.children"
          src="/images/dropdown.svg"
          alt="dropdown"
          class="w-[10px] h-[10px] mt-[2px] transition-transform duration-200"
          :class="activeMenu === index ? 'rotate-180' : ''"
        />
        <span
          class="absolute bottom-0 left-0 h-[2px] bg-[#0056b3] w-0 transition-all duration-300 ease-out group-hover:w-full"
        ></span>
      </NuxtLink>

      <div
        v-if="menu.children"
        :class="[
          'absolute left-0 top-full bg-white border border-gray-200 min-w-[240px] z-50 rounded-sm overflow-hidden shadow-[0_6px_15px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out origin-top',
          activeMenu === index
            ? 'opacity-100 visible scale-y-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 invisible scale-y-95 -translate-y-1 pointer-events-none',
        ]"
      >
        <NuxtLink
          v-for="(child, i) in menu.children"
          :key="i"
          :to="child.link"
          class="block px-18 py-9 text-[15px] text-dark border-b border-gray-100 hover:bg-[#f7f7f7] hover:text-[#0056b3] transition-colors duration-200"
          :class="{ 'border-b-0': i === menu.children.length - 1 }"
        >
          {{ child.title }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
