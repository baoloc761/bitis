<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);

function handleScroll() {
  isVisible.value = window.scrollY > 300;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <transition name="fade">
    <button v-if="isVisible" @click="scrollToTop" aria-label="Go to top"
      class="fixed bottom-[90px] right-6 z-50 p-3 rounded-full transition-all duration-300">
      <img src="/images/go-to-top.svg" alt="Go to top" width="100" height="100" />
    </button>
  </transition>

  <NuxtLink to="https://zalo.me/2394985460451590858?ref=1673104722175004" target="_blank" rel="noopener noreferrer"
    external aria-label="Chat qua Zalo"
    class="fixed bottom-6 right-10 z-40 p-10 bg-[#0573FF] rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
    <NuxtImg src="/images/zalo.svg" alt="Zalo" width="44" height="44" class="object-contain invert brightness-0 saturate-0 contrast-200" />
  </NuxtLink>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
