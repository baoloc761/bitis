<template>
  <footer class="bg-white text-[#333]">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 bg-white">
      <NuxtLink v-for="(img, index) in FOOTER_IMAGES" :key="index" :to="img.href" target="_blank"
        rel="noopener noreferrer" external>
        <NuxtImg :src="img.src" :alt="img.alt" format="webp" width="216" height="216" quality="85" loading="lazy"
          class="object-cover" />
      </NuxtLink>
    </div>

    <div class="container mx-auto mt-[40px] grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
      <div v-for="(section, index) in FOOTER_SECTIONS" :key="index" class="text-center md:text-left">
        <h3 class="text-[18px] font-semibold mb-3 text-[#333]">
          {{ section.title }}
        </h3>
        <ul class="space-y-2 text-[14px] text-[#555]">
          <li v-for="(link, i) in section.links" :key="i">
            <NuxtLink :to="link.href" target="_blank" rel="noopener noreferrer" external
              class="hover:text-[#194FAE] transition">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <div v-if="section.extra" class="pt-4 flex justify-center md:justify-start">
          <NuxtLink :to="section.extra.href" target="_blank" rel="noopener noreferrer" external>
            <NuxtImg :src="section.extra.image" alt="Bán hàng B2B" class="w-[140px] h-[33px] object-contain" />
          </NuxtLink>
        </div>
      </div>

      <div class="text-center md:text-left">
        <NuxtImg src="/images/logo.svg" alt="Biti's Logo" width="120" height="50" class="mx-auto md:mx-0 mb-3" />

        <p class="text-sm font-semibold">{{ COMPANY_INFO.name }}</p>
        <p class="text-sm mt-2">Địa chỉ: {{ COMPANY_INFO.address }}</p>

        <p class="text-sm">
          Điện thoại:
          <a :href="`tel:${COMPANY_INFO.phone}`" class="text-blue-600 hover:underline">
            {{ COMPANY_INFO.phone }}
          </a>
        </p>

        <p class="text-sm">
          Email:
          <a :href="`mailto:${COMPANY_INFO.email}`" class="text-blue-600 hover:underline">
            {{ COMPANY_INFO.email }}
          </a>
        </p>

        <p class="text-sm">
          Hotline:
          <a :href="`tel:${COMPANY_INFO.hotline}`" class="text-blue-600 hover:underline">
            {{ COMPANY_INFO.hotline }}
          </a>
        </p>

        <p class="text-sm">Thời gian tư vấn: {{ COMPANY_INFO.workingHours }}</p>
      </div>
    </div>

    <div class="bg-[#DFDFDF] pt-[15px] pb-[15px] text-sm text-[#333]">
      <div
        class="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4 text-center md:text-left">
        <div class="flex flex-col items-center md:items-start gap-1 md:flex-1">
          <div class="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1">
            <NuxtLink v-for="(item, i) in FOOTER_BOTTOM_LINKS" :key="i" :to="item.href" target="_blank"
              rel="noopener noreferrer" external class="hover:text-[#194FAE] transition">
              {{ item.label }}
            </NuxtLink>
          </div>
          <span class="mt-[4px] text-[14px]">
            Copyright © {{ new Date().getFullYear() }} Biti's. Powered by Haravan Enterprise
          </span>
        </div>

        <div class="flex justify-center md:flex-1">
          <NuxtImg src="/images/bocongthuong.webp" alt="Bộ Công Thương" width="120" height="45"
            class="object-contain" />
        </div>

        <div class="md:flex-1 text-center md:text-right">
          <p class="max-w-[420px] mx-auto md:ml-auto leading-snug text-[13px] text-[#333]">
            Giấy CNĐKDN: 0301340497 được cấp ngày 20/01/1992, được sửa đổi lần thứ 25
            ngày 27/01/2022 bởi Sở Kế hoạch và Đầu tư TPHCM
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { FOOTER_IMAGES } from "@/constants/images";
import { FOOTER_SECTIONS, COMPANY_INFO, FOOTER_BOTTOM_LINKS } from "@/constants/footer";
</script>
