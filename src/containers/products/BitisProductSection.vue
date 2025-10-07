<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getBitisProducts } from "@/services/graphql/bitisProducts.service";
import { API_DEFAULT } from "@/constants/api";
import { IBitisProduct } from "@/modal/types/Products";
import { ICON_HEART } from "@/constants/icon";
import { formatCurrency, formatDiscount } from "@/utils/formatCurrency";

interface IProps {
  title: string;
  collection: string;
}

const props = defineProps<IProps>();
const products = ref<IBitisProduct[]>([]);
const loading = ref(true);
const hoveredId = ref<number | null>(null);

const fetchProducts = async () => {
  try {
    loading.value = true;
    const result = await getBitisProducts(
      props.collection,
      API_DEFAULT.PAGE,
      API_DEFAULT.LIMIT
    );
    products.value = result;
  } finally {
    loading.value = false;
  }
};

const isNewProduct = (tags?: string[] | string): boolean => {
  if (!tags) return false;
  const tagString = Array.isArray(tags) ? tags.join(",") : tags;
  return tagString.toLowerCase().includes("new");
};

onMounted(fetchProducts);
</script>

<template>
  <section class="bitis-section py-8 mt-[70px]">
    <p class="sectionHeading-tab-new drop-shadow-redStrong text-[20px] md:text-[26px] font-bold text-center uppercase">
      {{ title || "QUÀ TẶNG PHẢI ĐẸP" }}
    </p>

    <div v-if="!loading" class="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 min-h-[500px]">
      <article v-for="item in products" :key="item.id"
        class="relative border overflow-hidden bg-white shadow-sm hover:shadow-lg transition"
        @mouseenter="hoveredId = item.id" @mouseleave="hoveredId = null">
        <div class="relative w-full aspect-square bg-gray-50 overflow-hidden cursor-pointer">
          <NuxtImg :src="item.images?.[0]?.src || item.image?.src" :alt="item.title" width="310" height="310"
            fit="contain" format="webp" class="object-contain w-full h-full transition-opacity duration-500"
            :class="{ 'opacity-0': hoveredId === item.id }" placeholder="empty" loading="lazy" decoding="async" />

          <!-- Ảnh hover -->
          <NuxtImg v-if="item.images?.[1]?.src" :src="item.images[1].src" :alt="item.title" width="310" height="310"
            fit="contain" format="webp"
            class="absolute inset-0 object-contain w-full h-full opacity-0 transition-opacity duration-500"
            :class="{ 'opacity-100': hoveredId === item.id }" placeholder="empty" loading="lazy" decoding="async" />

          <span v-if="isNewProduct(item.tags)"
            class="absolute top-2 left-2 bg-green-600 text-white text-xs px-10 py-2 rounded">
            Mới
          </span>

          <img :src="ICON_HEART" alt="Yêu thích" width="18" height="18"
            class="absolute top-2 right-2 w-[18px] h-[18px] object-contain select-none pointer-events-none" />
        </div>

        <div class="p-4 space-y-2 text-sm">
          <div class="flex items-end justify-between text-gray-600">
            <p>{{ item.variants?.length }} Size</p>
            <p>{{ item.options?.length || 1 }} Màu sắc</p>
          </div>

          <NuxtLink :to="`https://bitis.com.vn/products/${item.handle}`"
            class="text-black hover:text-hoverBlue transition-colors line-clamp-2 font-medium leading-snug">
            {{ item.title }}
          </NuxtLink>

          <div class="flex items-center justify-between">
            <p class="text-lg text-black">
              {{ formatCurrency(item.variants?.[0]?.price) }}
            </p>

            <template v-if="
              item.variants?.[0]?.compare_at_price &&
              Number(item.variants?.[0]?.compare_at_price) >
              Number(item.variants?.[0]?.price)
            ">
              <p class="text-[17px] text-black line-through">
                {{ formatCurrency(item.variants?.[0]?.compare_at_price) }}
              </p>

              <span
                class="text-[#e20000] border border-[#e20000] bg-[#fff0f0] text-[14px] font-medium px-[8px] py-[2px] rounded-md">
                {{ formatDiscount(
                  item.variants?.[0]?.price,
                  item.variants?.[0]?.compare_at_price
                ) }}
              </span>
            </template>

            <p class="text-red-600 text-xs">
              Đã bán: {{ item.sole_quantity }}
            </p>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="text-center py-10 text-gray-500 min-h-[500px] flex items-center justify-center">
      Đang tải sản phẩm...
    </div>

    <div v-if="!loading && products.length > 0" class="mt-10 text-center uppercase tracking-wide">
      <NuxtLink :to="`https://bitis.com.vn/collections/${props.collection}`"
        class="inline-block text-14 font-semibold text-black border-b-[2px] border-black transition-all duration-300">
        Còn nhiều lắm, xem thêm
      </NuxtLink>
    </div>
  </section>
</template>
