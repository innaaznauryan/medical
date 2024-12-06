<template>
  <EmployeesContainer
    :position="Position.doctor"
    :label="PositionLabel[Position.doctor]"
  />
</template>

<script setup lang="ts">
import { Position, PositionLabel } from "../constants/positions.ts";
import EmployeesContainer from "../components/EmployeesContainer.vue";
</script>