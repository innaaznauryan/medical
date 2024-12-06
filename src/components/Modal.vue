<template>
  <TransitionRoot as="template" :show="show" @after-leave="handleAfterLeave">
    <Dialog as="div" class="fixed inset-0 z-50 overflow-y-auto" @close="closeModal">
      <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel class="p-8 relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:w-full">
            <DialogTitle as="h3" class="text-lg text-center font-medium leading-6 text-gray-900">
              {{ title }}
            </DialogTitle>
            <div class="mt-2">
              <slot/>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogOverlay,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue';

defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['close', 'afterLeave']);

const closeModal = () => {
  emit('close');
}
const handleAfterLeave = () => {
  emit('afterLeave');
}
</script>
