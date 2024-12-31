<script setup>
import { onBeforeUnmount } from "vue";
import { useRegister } from "@/stores/register";
 
const store = useRegister();
 
onBeforeUnmount(store.resetForm);
</script>
 
<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Register</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="name" class="required">Name</label>
        <input
          v-model="store.form.name"
          id="name"
          name="name"
          type="text"
          class="form-input"
          autocomplete="name"
          required          
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="Name" />
      </div>
 
    
      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="required">Email</label>
        <input
          v-model="store.form.email"
          id="email"
          name="email"
          type="email"
          class="form-input"
          autocomplete="email"
          required
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="Email" />

      </div>
 
      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="required">Password</label>
        <input
          v-model="store.form.password"
          id="password"
          name="password"
          type="password"
          class="form-input"
          autocomplete="new-password"
          required
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="Password" />

      </div>
 
      <div class="flex flex-col gap-2">
        <label for="confirmation" class="required">
          Confirm password
        </label>
        <input
          v-model="store.form.confirmation"
          id="confirmation"
          name="confirmation"
          type="password"
          class="form-input"
          autocomplete="new-password"
          required
          :disabled="store.loading"
        />
      </div>
 
      <div class="border-t h-[1px] my-6"></div>
 
      <div class="flex flex-col gap-2">
        <button type="submit" class="btn btn-primary"><SpinnerIcon v-show="store.loading" />Registhher</button>
      </div>
    </div>
  </form>
</template>npm 