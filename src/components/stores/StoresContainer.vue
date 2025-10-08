<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const ListStoreSection = defineAsyncComponent(() =>
  import('@/containers/stores/ListStoreSection.vue')
);

const RegisterSection = defineAsyncComponent(() =>
  import('@/containers/register/RegisterSection.vue')
);

</script>

<template>
  <ListStoreSection />
  <RegisterSection />
</template>

