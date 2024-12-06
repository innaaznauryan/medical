<template>
  <p class="p-4" v-if="!employees.length">No Employees to show</p>
  <div v-else class="overflow-x-auto bg-white shadow rounded-lg mb-6">
    <table class="min-w-full table-auto text-left text-sm text-gray-600">
      <thead class="bg-primary text-white">
      <tr>
        <th class="p-4 font-semibold">Full Name</th>
        <th class="p-4 font-semibold">Position</th>
        <th class="p-4 font-semibold">Role</th>
        <th class="p-4 font-semibold">Department</th>
        <th class="p-4 font-semibold">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="employee in employees"
        :key="employee.id"
        class="border-b hover:bg-gray-100"
      >
        <td class="p-4">{{ employee.fullName }}</td>
        <td class="p-4">{{ PositionLabel[employee.position as keyof typeof PositionLabel] }}</td>
        <td class="p-4">{{ employee.isHead ? 'Head of Department' : 'Employee' }}</td>
        <td class="p-4 capitalize">
          <RouterLink :to="{ name: DepartmentLabel[employee.departmentId] }">
            {{ DepartmentLabel[employee.departmentId] }}
          </RouterLink>
        </td>
        <td class="p-4">
          <button
            class="mx-2 my-1 text-primary"
            @click="$emit('openEditModal', employee)"
          >
            Edit
          </button>
          <button
            class="mx-2 my-1 text-red-600"
            @click="$emit('openDeleteModal', employee)"
          >
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { EmployeeSchema } from "../types/employee.ts";
import { PositionLabel } from "../constants/positions.ts";
import { DepartmentLabel } from "../constants/departments.ts";

defineProps({
  employees: {
    type: Array as PropType<EmployeeSchema[]>,
    required: true,
  },
});
defineEmits(['openEditModal', 'openDeleteModal'])
</script>