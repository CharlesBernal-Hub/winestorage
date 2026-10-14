<script setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {useConfirm} from "primevue";
import usePublishingStore from "../../application/iam.store.js";
import {onMounted} from "vue";
import {storeToRefs} from "pinia";

const { t } = useI18n();
const router = useRouter();
const confirm = useConfirm();
const store = usePublishingStore();
const {tutorials, tutorialsLoaded, categoriesLoaded, errors} = storeToRefs(store);
const {fetchTutorials, fetchCategories, deleteTutorial} = store;

onMounted(() => {
  if (!categoriesLoaded.value) fetchCategories();
  if (!tutorialsLoaded.value) fetchTutorials();
});

const navigateToNew = () => {
  router.push({ name: 'iam-tutorial-new' });
};

const navigateToEdit = (id) => {
  router.push({ name: 'iam-tutorial-edit', params: { id } });
};

const confirmDelete = (tutorial) => {
  confirm.require({
    message: t('tutorials.confirm-delete', { title: tutorial.title }),
    header: t('tutorials.delete-header'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => { deleteTutorial(tutorial); },
  });
};
</script>

<template>
  <div class="p-4">
    <h1>{{ t('tutorials.title') }}</h1>
    <pv-button :label="t('tutorials.new')" icon="pi pi-plus" class="mb-3" @click="navigateToNew" />
    <pv-data-table
        :value="tutorials"
        :loading="!tutorialsLoaded"
        striped-rows
        table-style="min-width: 50rem"
        paginator
        :rows="5"
        :rows-per-page-options="[5, 10, 20]"
    >
      <pv-column field="id" :header="t('tutorials.id')" sortable />
      <pv-column field="title" :header="t('tutorial.title')" sortable />
      <pv-column field="summary" :header="t('tutorials.summary')" />
      <pv-column :header="t('tutorial.category')">
        <template #body="slotProps">{{ slotProps.data.category?.name }}</template>
      </pv-column>
      <pv-column :header="t('tutorials.actions')">
        <template #body="slotProps">
          <pv-button icon="pi pi-pencil" text rounded @click="navigateToEdit(slotProps.data.id)" />
          <pv-button icon="pi pi-trash" text rounded severity="danger" @click="confirmDelete(slotProps.data)" />
        </template>
      </pv-column>
    </pv-data-table>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.join(', ') }}
    </div>
  </div>
</template>

<style scoped>

</style>
