<template>
  <header class="bg-primary text-white py-4 shadow-md w-full fixed top-0 left-0 z-40">
    <div class="container mx-auto flex justify-between items-center px-6">
      <Navigation />
    </div>
  </header>

  <div
    v-if="$route.name !== 'home'"
    class="pt-16 capitalize font-semibold"
  >
    {{ $route.meta.title }}
  </div>

  <main class="container mx-auto p-6">
    <RouterView />
  </main>
</template>


<script setup lang="ts">
import { onMounted } from "vue";
import employeesData from "./data/employeesData.json";
import departmentsData from "./data/departmentsData.json";
import Navigation from "./components/Navigation.vue";

onMounted(() => {
  if (!localStorage.getItem('employees')) {
    localStorage.setItem('employees', JSON.stringify(employeesData));
  }
  if (!localStorage.getItem('departments')) {
    localStorage.setItem('departments', JSON.stringify(departmentsData));
  }
})
</script>
