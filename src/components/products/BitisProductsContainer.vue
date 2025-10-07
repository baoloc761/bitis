<script setup lang="ts">
import { BITIS_COLLECTIONS } from "@/constants/api";
import { defineAsyncComponent } from "vue";

const BitisProductSection = defineAsyncComponent(() => import('@/components'))
</script>

<template>
  <div class="space-y-20">
    <BitisProductSection
      v-for="item in BITIS_COLLECTIONS"
      :key="item.key"
      :title="item.title"
      :collection="item.collection"
    />
  </div>
</template>
