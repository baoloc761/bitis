<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const ListStoreSection = defineAsyncComponent(() =>
  import('@/containers/stores/ListStoreSection.vue')
);
</script>

<template>
  <ListStoreSection />
</template>

