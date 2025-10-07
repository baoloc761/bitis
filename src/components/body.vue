<script setup lang="ts">
import BitisProductsContainer from "@/containers/products/BitisProductSection.vue";
import { BITIS_COLLECTIONS } from "@/constants/api";
import { Post } from '@/components'
</script>

<template>
  <div class="container">
    <BitisProductsContainer
      v-for="section in BITIS_COLLECTIONS"
      :key="section.key"
      :title="section.title"
      :collection="section.collection"
    />
  </div>
  <Post />
</template>
