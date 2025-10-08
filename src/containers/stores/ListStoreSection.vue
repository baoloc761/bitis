<template>
  <section class="mx-auto py-10 px-4 mt-20 pt-[90px] mb-[30px]" :style="{
    backgroundImage: `url('/images/banners/bg-content.webp')`,
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
  }">
    <div class="container">
      <h2 class="mb-6 border-b border-[#f3f3f3] text-[20px] font-semibold">
        HỆ THỐNG CỬA HÀNG BITIS
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white border rounded shadow-sm flex flex-col h-[600px]">
          <div class="px-4 py-3">
            <select v-model="selectedProvince"
              class="border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300 w-full">
              <option v-for="province in provinces" :key="province" :value="province">
                {{ province }}
              </option>
            </select>
          </div>

          <div class="flex-1 overflow-y-auto">
            <div v-if="loading" class="p-6 text-center text-gray-500">
              Đang tải danh sách cửa hàng...
            </div>

            <ul v-else class="divide-y p-6">
              <li v-for="store in filteredStores" :key="store.name"
                class="p-4 hover:bg-gray-50 cursor-pointer transition" @mouseenter="hoveredStore = store.province_code"
                @mouseleave="hoveredStore = null">
                <div class="flex items-start gap-3">
                  <img src="/images/address.svg" alt="icon" width="20" height="20"
                    class="w-5 h-5 mt-1 opacity-70 select-none" loading="lazy" decoding="async" />
                  <div>
                    <h3 class="text-bluePrimary text-[15px] mb-1">
                      {{ store.name }}
                    </h3>
                    <p class="text-[13px] text-grayPrimary leading-snug">
                      {{ store.address }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="relative h-[600px] w-full rounded overflow-hidden border shadow">
          <NuxtImg src="/images/map_bitis.webp" alt="Bản đồ Biti's"
            class="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getBitisStores } from "@/services/graphql/bitisStores.service";
import { IBitisStore } from "@/modal/types/BitisStore";

const stores = ref<IBitisStore[]>([]);
const loading = ref(true);
const selectedProvince = ref("Tất cả");
const hoveredStore = ref<string | null>(null);

onMounted(async () => {
  try {
    stores.value = await getBitisStores();
  } finally {
    loading.value = false;
  }
});

const provinces = computed(() => {
  const unique = Array.from(new Set(stores.value.map((s) => s.province)));
  return ["Tất cả", ...unique];
});

const filteredStores = computed(() => {
  if (selectedProvince.value === "Tất cả") return stores.value;
  return stores.value.filter((store) => store.province === selectedProvince.value);
});
</script>