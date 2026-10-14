<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCellarsStore } from '../../../cellaring/application/cellars.store.js';

const store = useCellarsStore();
const { cellars, storageItems, cellarsLoaded, storageItemsLoaded } = storeToRefs(store);

onMounted(() => {
  if (!cellarsLoaded.value) store.fetchCellars();
  if (!storageItemsLoaded.value) store.fetchStorageItems();
});

// Funciones de cálculo exigidas por el examen
const getItemsForCellar = (cellarId) => {
  return storageItems.value.filter(item => item.cellarId === cellarId);
};

const getTotalBottles = (cellarId) => {
  const items = getItemsForCellar(cellarId);
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

const getAvailableCapacity = (cellar) => {
  return cellar.capacity - getTotalBottles(cellar.id);
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-4xl font-bold">Home</h1>
    <p class="text-xl text-color-secondary mb-5">Engineered Products for Wine Cellars.</p>

    <h2 class="text-2xl mb-4">My Wine Cellars</h2>

    <!-- PrimeFlex grid: 2 columnas en pantallas medianas (md:col-6) -->
    <div class="grid">
      <div class="col-12 md:col-6 mb-4" v-for="cellar in cellars" :key="cellar.id">
        <pv-card class="h-full">

          <template #title>
            {{ cellar.name }}
          </template>

          <template #content>
            <div v-if="getItemsForCellar(cellar.id).length === 0" class="text-color-secondary font-italic">
              Empty
            </div>
            <ul v-else class="pl-3 m-0">
              <li v-for="item in getItemsForCellar(cellar.id)" :key="item.id">
                {{ item.wineName }} (Quantity: {{ item.quantity }})
              </li>
            </ul>
          </template>

          <template #footer>
            <div class="border-top-1 surface-border pt-3 mt-3 flex justify-content-between font-bold">
              <span>Total Bottles: {{ getTotalBottles(cellar.id) }}</span>
              <span>Available Capacity: {{ getAvailableCapacity(cellar) }}</span>
            </div>
          </template>

        </pv-card>
      </div>
    </div>

  </div>
</template>