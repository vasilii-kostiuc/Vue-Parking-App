<script setup>
import { onBeforeUnmount } from "vue";
import { useVehicle } from "@/stores/vehicle";
 
const store = useVehicle();
 
onBeforeUnmount(store.resetForm);
</script>
 
<template>
  <form @submit.prevent="store.storeVehicle" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Add vehicle</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="plate_number" class="required">License plate</label>
        <input
          v-model="store.form.plateNumber"
          id="plate_number"
          name="plate_number"
          type="text"
          class="form-input plate"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="PlateNumber" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="description">Description</label>
        <input
          v-model="store.form.description"
          id="description"
          name="description"
          type="text"
          class="form-input"
          placeholder="My Ferrari, Big truck, Rental"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="description" />
      </div>
 
      <div class="border-t h-[1px] my-6"></div>
 
      <div class="flex gap-2">
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="store.loading"
        >
          <IconSpinner class="animate-spin" v-show="store.loading" />
          Save vehicle
        </button>
        <RouterLink :to="{ name: 'vehicles.index' }" class="btn btn-secondary">
          Cancel
        </RouterLink>
      </div>
    </div>
  </form>
</template>