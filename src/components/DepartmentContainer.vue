<template>
  <EmployeesTable
    :employees="employees"
    @open-edit-modal="openEditModal"
    @open-delete-modal="openDeleteModal"
  />
  <Modal
    title="Update Employee"
    :show="isModalOpen"
    @close="closeModal"
  >
    <EmployeeForm
      v-if="selectedEmployee"
      :selected-employee="selectedEmployee"
      :is-edit-mode="true"
      @close="closeModal"
      @afterLeave="clearSelectedEmployee"
      @submit-form="submitForm"
    />
  </Modal>
  <Modal
    :show="isDeleteModalOpen"
    title="Are you sure you want to delete this Employee?"
    @close="closeDeleteModal"
    @afterLeave="clearSelectedEmployee"
  >
    <ConfirmDelete
      v-if="selectedEmployee"
      :selected-employee="selectedEmployee"
      @close="closeDeleteModal"
      @confirm="deleteEmployee"
    />
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useStore } from 'vuex';
import { EmployeeSchema } from "../types/employee.ts";
import EmployeesTable from "./EmployeesTable.vue";
import EmployeeForm from "../components/EmployeeForm.vue";
import ConfirmDelete from "../components/ConfirmDelete.vue";
import Modal from "../components/Modal.vue";

const props = defineProps({
  departmentId: {
    type: Number,
    required: true
  }
})

const store = useStore();
const employees = computed(() => store.state.employees
  .filter((employee: EmployeeSchema) => employee.departmentId === props.departmentId)
  .sort((a: EmployeeSchema, b: EmployeeSchema) => (b.isHead ? 1 : 0) - (a.isHead ? 1 : 0)));

const isModalOpen = ref<boolean>(false);
const isDeleteModalOpen = ref<boolean>(false);
const selectedEmployee = ref<EmployeeSchema | null>(null);

const closeModal = () => {
  isModalOpen.value = false;
};
const openEditModal = (employee: EmployeeSchema) => {
  selectedEmployee.value = employee;
  isModalOpen.value = true;
}
const openDeleteModal = (employee: EmployeeSchema) => {
  selectedEmployee.value = employee;
  isDeleteModalOpen.value = true;
};
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
}
const clearSelectedEmployee = () => {
  selectedEmployee.value = null;
}

const submitForm = (employee: EmployeeSchema) => {
  updateEmployee(employee);
  closeModal();
};

const updateEmployee = (updatedEmployee: EmployeeSchema) => {
  store.dispatch('updateEmployee', updatedEmployee);
};
const deleteEmployee = () => {
  if (selectedEmployee.value && selectedEmployee.value.id) {
    store.dispatch('deleteEmployee', selectedEmployee.value.id);
  }
  closeDeleteModal();
};
</script>