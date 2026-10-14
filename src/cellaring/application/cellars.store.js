import { defineStore } from 'pinia';
import { ref, shallowRef, computed } from 'vue';
import { CellaringApi } from '../infrastructure/cellaring-api.js';
import { CellarsAssembler } from '../infrastructure/cellars.assembler.js';
import { StorageAssembler } from '../infrastructure/storage.assembler.js';

const cellaringApi = new CellaringApi();

export const useCellarsStore = defineStore('cellars', () => {
    // Usamos shallowRef para no romper la privacidad de las entidades
    const cellars = shallowRef([]);
    const storageItems = shallowRef([]);
    const errors = ref([]);

    const cellarsLoaded = ref(false);
    const storageItemsLoaded = ref(false);

    function fetchCellars() {
        cellaringApi.getCellar().then(response => {
            cellars.value = CellarsAssembler.toEntitiesFromResponse(response);
            cellarsLoaded.value = true;
        }).catch(error => {
            errors.value.push(error.message);
        });
    }

    function fetchStorageItems() {
        cellaringApi.getStorage().then(response => {
            storageItems.value = StorageAssembler.toEntitiesFromResponse(response);
            storageItemsLoaded.value = true;
        }).catch(error => {
            errors.value.push(error.message);
        });
    }

    function addStorageItem(item) {
        cellaringApi.createStorage(StorageAssembler.toResourceFromEntity(item)).then(response => {
            const newItem = StorageAssembler.toEntityFromResource(response.data);
            // Agregamos el nuevo item creando un nuevo arreglo
            storageItems.value = [...storageItems.value, newItem];
        }).catch(error => {
            errors.value.push(error.message);
        });
    }

    return {
        cellars,
        storageItems,
        errors,
        cellarsLoaded,
        storageItemsLoaded,
        fetchCellars,
        fetchStorageItems,
        addStorageItem
    };
});