<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCellarsStore } from '../../application/cellars.store.js';
import { StorageItemEntity } from '../../domain/model/storage.entity.js';
import axios from 'axios';

const router = useRouter();
const store = useCellarsStore();
const { cellars, storageItems, cellarsLoaded, storageItemsLoaded } = storeToRefs(store);

// Variables del formulario
const form = ref({ wineType: null, wine: null, quantity: null });
const availableWines = ref([]);
const capacityError = ref(false);

const wineTypes = [
  { label: 'Reds', value: 'reds' },
  { label: 'Whites', value: 'whites' },
  { label: 'Sparkling', value: 'sparkling' },
  { label: 'Rose', value: 'rose' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'Port', value: 'port' }
];

onMounted(() => {
  if (!cellarsLoaded.value) store.fetchCellars();
  if (!storageItemsLoaded.value) store.fetchStorageItems();
});

// Cuando el usuario elige un tipo de vino, llamamos a la API de SampleAPI
watch(() => form.value.wineType, async (newType) => {
  form.value.wine = null;
  availableWines.value = [];
  if (newType) {
    try {
      const response = await axios.get(`https://api.sampleapis.com/wines/${newType}`);
      availableWines.value = response.data;
    } catch (e) {
      console.error("Error fetching wines", e);
    }
  }
});

const saveStorageItem = () => {
  // 1. Encontrar a qué bodega (cellar) pertenece este tipo de vino
  const targetCellar = cellars.value.find(c => c.wineType === form.value.wineType);
  if (!targetCellar) return;

  // 2. Calcular cuántas botellas hay y la capacidad disponible
  const currentItems = storageItems.value.filter(item => item.cellarId === targetCellar.id);
  const totalBottles = currentItems.reduce((sum, item) => sum + item.quantity, 0);
  const availableCapacity = targetCellar.capacity - totalBottles;

  // 3. Validar capacidad
  if (form.value.quantity > availableCapacity) {
    capacityError.value = true;
    return;
  }
  capacityError.value = false;

  // 4. Crear y guardar
  const newItem = new StorageItemEntity({
    id: null,
    cellarId: targetCellar.id,
    wineType: form.value.wineType,
    wineId: form.value.wine.id,
    wineName: form.value.wine.wine, // SampleAPI devuelve el nombre en el atributo "wine"
    quantity: form.value.quantity,
    registeredAt: new Date().toISOString()
  });

  store.addStorageItem(newItem);
  router.push({ name: 'home' }); // Reemplaza con la ruta de tu lista si difiere
};

const cancel = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <div class="p-4 max-w-30rem mx-auto">
    <h1 class="text-3xl font-bold mb-2">New Storage Item</h1>
    <p class="text-color-secondary mb-4">Add Wine Bottles to Your Cellar</p>

    <form @submit.prevent="saveStorageItem" class="flex flex-column gap-3">

      <!-- Wine Type -->
      <div class="flex flex-column gap-2">
        <label for="wineType" class="font-bold">Wine Type</label>
        <pv-select id="wineType" v-model="form.wineType" :options="wineTypes" optionLabel="label" optionValue="value" placeholder="Select a Wine Type" required />
      </div>

      <!-- Select Wine (obtenido de SampleAPI) -->
      <div class="flex flex-column gap-2" v-if="form.wineType">
        <label for="wine" class="font-bold">Wine</label>
        <pv-select id="wine" v-model="form.wine" :options="availableWines" optionLabel="wine" placeholder="Select a Wine" required />
      </div>

      <!-- Quantity -->
      <div class="flex flex-column gap-2">
        <label for="quantity" class="font-bold">Quantity</label>
        <pv-input-text id="quantity" type="number" v-model.number="form.quantity" required min="1" />
        <small v-if="capacityError" class="text-red-500">Quantity exceeds available capacity for this cellar.</small>
      </div>

      <!-- Buttons -->
      <div class="flex gap-2 mt-3">
        <pv-button type="submit" label="Create" icon="pi pi-check" />
        <pv-button type="button" label="Cancel" severity="secondary" icon="pi pi-times" @click="cancel" />
      </div>

    </form>
  </div>
</template>