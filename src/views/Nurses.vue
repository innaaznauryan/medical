<template>
  <EmployeesContainer
    :position="Position.nurse"
    :label="PositionLabel[Position.nurse]"
  />
</template>

<script setup lang="ts">
import { Position, PositionLabel } from "../constants/positions.ts";
import EmployeesContainer from "../components/EmployeesContainer.vue";
</script>