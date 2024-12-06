<template>
  <DepartmentContainer :department-id="Department.surgical"/>
</template>

<script setup lang="ts">
import { Department } from "../constants/departments.ts";
import DepartmentContainer from "../components/DepartmentContainer.vue";
</script>