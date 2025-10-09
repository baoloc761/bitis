<template>
  <button
  @click="toggleModal"
  class="fixed bottom-[80px] left-4 z-[60] flex items-center gap-2 bg-bluePrimary hover:bg-[#092f86] text-white p-10 rounded-xl shadow-lg transition-all duration-300 md:rounded-xl"
>
  <NuxtImg
    src="/images/coupon.svg"
    alt="Coupon"
    width="30"
    height="30"
    format="webp"
    class="object-contain invert brightness-0 saturate-0 contrast-200"
  />

  <!-- Ẩn chữ trên mobile, hiện trên PC -->
  <span class="hidden md:inline text-sm font-medium">Danh sách mã Coupon</span>
</button>

  <transition name="fade">
    <div v-if="showModal" class="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-[70]" @click.self="toggleModal">
    </div>
  </transition>

  <transition name="slide-up">
    <div v-if="showModal"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[450px] bg-white rounded-lg shadow-2xl z-[80] overflow-hidden">
      <div class="flex justify-between items-center border-b bg-background-grayDark">
        <h3 class="text-[20px] text-center m-auto py-10 px-2">Danh sách mã khuyến mãi:</h3>
        <button @click="toggleModal" aria-label="Đóng" class="hover:opacity-70">
          <NuxtImg src="/images/close.svg" alt="Đóng" width="18" height="18" />
        </button>
      </div>

      <div class="max-h-[420px] overflow-y-auto bg-[#d9f1fd] p-10">
        <div v-for="(coupon, i) in coupons" :key="i" class="flex mb-[10px]">
          <NuxtImg :src="coupon.image" alt="Coupon" width="100" height="100" format="webp"
            class="bg-white flex-shrink-0 px-10 py-10 rounded-[15px] border-r border-dashed border-gray-300" />

          <div class="flex-1 bg-white px-5 py-10 rounded-[15px]">
            <h4 class="text-[15px] font-semibold text-gray-800 mb-[2px]">
              {{ coupon.title }}
            </h4>
            <p class="text-[13px] text-gray-500 leading-snug">
              {{ coupon.description }}
            </p>
            <div class="flex items-center justify-between mt-2">
              <p class="text-[13px]">
                <span class="text-gray-500">Mã:</span>
                <span class="text-[#e20000] font-bold ml-1">
                  {{ coupon.code }}
                </span>
              </p>
              <button @click="copyCode(coupon.code)"
                class="bg-[#f1c14f] text-[12px] text-white py-[5px] px-[7px] rounded-full">
                Sao chép mã
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="p-[10px] text-[13px leading-snug bg-[#d9f1fd]">
        <p>
          • Thời gian áp dụng mã từ
          <span class="font-semibold">{{ startDate }}</span> đến
          <span class="font-semibold">{{ endDate }}</span>.<br />
          <span class="text-[#e20000] font-medium">Chỉ áp dụng khi mua tại website chính hãng.</span>
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {coupons} from "@/constants/coupon"

const showModal = ref(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const startDate = "06/10/2025";
const endDate = "10/10/2025";

function copyCode(code: string) {
  navigator.clipboard.writeText(code);
  alert(`Đã sao chép mã: ${code}`);
}
</script>