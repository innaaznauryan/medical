<template>
  <form @submit.prevent="submitForm">
    <div class="space-y-12">
      <div class="border-b border-gray-200 pb-12">
        <div class="mt-10 flex flex-col gap-6">
          <div>
            <label for="fullName" class="block text-sm font-medium text-dark">Full Name</label>
            <div class="mt-2">
              <input
                v-model="fullName"
                type="text"
                name="fullName"
                id="fullName"
                required
                class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-dark focus-visible:outline-none sm:text-sm"
              >
            </div>
          </div>

          <div>
            <label for="isHead" class="block text-sm font-medium text-dark">Is Head of Department</label>
            <div class="mt-2 flex items-center">
              <input
                v-model="isHead"
                type="checkbox"
                name="isHead"
                id="isHead"
                class="h-4 w-4 rounded accent-dark"
              >
              <label for="isHead" class="ml-3 text-sm text-gray-600">{{ isHead ? 'Yes' : 'No' }}</label>
            </div>
          </div>

          <div v-if="isDepartmentVisible">
            <label for="departmentId" class="block text-sm font-medium text-dark">Department</label>
            <div class="mt-2">
              <select
                v-model="departmentId"
                id="departmentId"
                name="departmentId"
                required
                class="block w-full rounded-md border-0 p-2 text-gray-900 capitalize shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-dark focus-visible:outline-none sm:text-sm">
                <option disabled :value="null">Select a department</option>
                <option
                  v-for="department in departments"
                  :key="department.id"
                  :value="department.id"
                >
                  {{ DepartmentLabel[department.id] }}
                </option>
              </select>
            </div>
          </div>

          <div v-if="isPositionVisible">
            <label for="position" class="block text-sm font-medium text-dark">Position</label>
            <div class="mt-2">
              <select
                  v-model="position"
                  id="position"
                  name="position"
                  required
                  class="block w-full rounded-md border-0 p-2 text-gray-900 capitalize shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-dark focus-visible:outline-none sm:text-sm">
                <option disabled :value="null">Select position</option>
                <option
                    v-for="position in positions"
                    :key="position"
                    :value="position"
                >
                  {{ PositionLabel[position as Position] }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-center gap-4">
      <button
        type="button"
        class="btn btn-secondary"
        @click="closeModal"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="btn"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, PropType, onMounted } from "vue";
import { useRoute } from 'vue-router';
import { EmployeeSchema } from "../types/employee.ts";
import { DepartmentSchema } from "../types/department.ts";
import { DepartmentLabel } from "../constants/departments.ts";
import { Position, PositionLabel } from "../constants/positions.ts";
import departmentsData from "../data/departmentsData.json";

const props = defineProps({
  selectedEmployee: {
    type: Object as PropType<EmployeeSchema>,
    default: null
  },
  isEditMode: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['close', 'submitForm']);

const route = useRoute();

const positions = Object.keys(PositionLabel);
const departments = ref<DepartmentSchema[]>([]);

const isDepartmentVisible = computed(() => {
  const routeName = route.name as string | undefined;
  return routeName ? !Object.values(DepartmentLabel).includes(routeName) : true;
});
const isPositionVisible = computed(() => {
  const routeName = route.name as string | undefined;
  return routeName ? !Object.keys(Position).includes(routeName) : true;
});

const fullName = ref<string | null>(null);
const isHead = ref(false);
const departmentId = ref<number | null>(null);
const position = ref<string | null>(null);

const closeModal = () => {
  emit('close');
}

const submitForm = () => {
  const employee = {
    ...(props.isEditMode ? { ...props.selectedEmployee } : {}),
    fullName: fullName.value,
    isHead: isHead.value,
    departmentId: departmentId.value,
    position: position.value,
  };
  emit('submitForm', employee);
};

onMounted(() => {
  const data = localStorage.getItem('departments');
  departments.value = data ? JSON.parse(data) : departmentsData;

  if (props.selectedEmployee && props.isEditMode) {
    fullName.value = props.selectedEmployee.fullName;
    isHead.value = props.selectedEmployee.isHead;
    departmentId.value = props.selectedEmployee.departmentId;
    position.value = props.selectedEmployee.position;
  }
});
</script>