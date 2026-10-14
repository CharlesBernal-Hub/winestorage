<script setup>
// import LanguageSwitcher from "./language-switcher.vue";
// import FooterContent from "./footer-content.vue";
</script>

<template>
  <pv-confirm-dialog/>
  <header class="w-full absolute top-0 left-0">
    <pv-toolbar class="bg-primary">
      <template #start>
        <!-- Logo simulado temporal si no tienes token de Logo.dev -->
        <i class="pi pi-box text-2xl mr-2"></i>
        <h3>Custom Wine Cellars Manufacturers</h3>
      </template>
      <template #center>
        <div class="flex gap-3">
          <routes-link to="/home" custom v-slot="{ navigate }">
            <pv-button label="Home" text @click="navigate" />
          </routes-link>
          <routes-link to="/storage/items/new" custom v-slot="{ navigate }">
            <pv-button label="New Storage Item" text @click="navigate" />
          </routes-link>
        </div>
      </template>
      <template #end>
        <!-- <language-switcher /> -->
      </template>
    </pv-toolbar>
  </header>

  <main class="flex-1 mt-7">
    <routes-view />
  </main>

  <!-- <footer-content /> -->
</template>