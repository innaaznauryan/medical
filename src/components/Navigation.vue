<template>
  <h1 class="text-3xl font-bold tracking-tight">
    <RouterLink :to="{ name: 'home' }">Welcome</RouterLink>
  </h1>
  <nav class="flex space-x-8">
    <RouterLink
      :to="{ name: 'home' }"
      class="font-medium hover:text-gray-200 transition duration-300"
      :class="{ 'text-gray-200': $route.name === 'home' }"
    >
      Departments
    </RouterLink>
    <RouterLink
      :to="{ name: 'doctor' }"
      class="font-medium hover:text-gray-200 transition duration-300"
      :class="{ 'text-gray-200': $route.name === 'doctor' }"
    >
      Doctors
    </RouterLink>
    <RouterLink
      :to="{ name: 'nurse' }"
      class="font-medium hover:text-gray-200 transition duration-300"
      :class="{ 'text-gray-200': $route.name === 'nurse' }"
    >
      Nurses
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">

</script>