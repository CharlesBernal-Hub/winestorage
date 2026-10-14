<script setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import usePublishingStore from "../../application/iam.store.js";
import {computed, onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {Tutorial} from "../../domain/model/tutorial.entity.js";

const {t} = useI18n();
const route = useRoute();
const router = useRouter();
const store = usePublishingStore();
const {errors, categories, categoriesLoaded} = storeToRefs(store);
const {addTutorial, updateTutorial, fetchCategories} = store;

const form = ref({title: '', summary: '', categoryId: null});
const isEdit = computed(() => !!route.params.id);
const categoryRequiredError = ref(false);
const categoryOptions = computed(() => categories.value.map(category => ({id: category.id, name: category.name})));

onMounted(() => {
  if (!categoriesLoaded.value) fetchCategories();
  if (isEdit.value) {
    const tutorial = getTutorialById(route.params.id);
    if (tutorial) {
      form.value.title = tutorial.title;
      form.value.summary = tutorial.summary;
      form.value.categoryId = tutorial.categoryId;
    } else router.push({name: 'iam-tutorials'});
  }
});

function getTutorialById(id) {
  return store.getTutorialById(id);
}

const saveTutorial = () => {
  if (!form.value.categoryId) {
    categoryRequiredError.value = true;
    return;
  }
  categoryRequiredError.value = false;
  const tutorial = new Tutorial({
    id: isEdit.value ? Number(route.params.id) : null,
    title: form.value.title,
    summary: form.value.summary,
    categoryId: form.value.categoryId,
  });
  if (isEdit.value) updateTutorial(tutorial); else addTutorial(tutorial);
  navigateBack();
};

const navigateBack = () => {
  router.push({name: 'iam-tutorials'});
};
</script>

<template>
  <div class="p-4">
    <h1>{{ isEdit ? t('tutorial.edit-title') : t('tutorial.new-title') }}</h1>
    <form @submit.prevent="saveTutorial">
      <div class="field mb-3">
        <label for="title">{{ t('tutorial.title') }}</label>
        <pv-input-text id="title" v-model="form.title" required class="w-full" />
      </div>
      <div class="field mb-3">
        <label for="summary">{{ t('tutorial.summary') }}</label>
        <pv-textarea id="summary" v-model="form.summary" rows="4" class="w-full" />
      </div>
      <div class="field mb-3">
        <label for="category">{{ t('tutorial.category') }}</label>
        <pv-select
            id="category"
            v-model="form.categoryId"
            :options="categoryOptions"
            optionLabel="name"
            optionValue="id"
            placeholder="Select a category"
            class="w-full"
        />
        <small v-if="categoryRequiredError" class="text-red-500">{{ t('tutorial.category-required') }}</small>
      </div>
      <pv-button type="submit" :label="t('tutorial.save')" icon="pi pi-save" />
      <pv-button :label="t('tutorial.cancel')" severity="secondary" class="ml-2" @click="navigateBack" />
    </form>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.join(', ') }}
    </div>
  </div>
</template>

<style scoped>

</style>
