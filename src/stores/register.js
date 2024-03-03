import { reactive } from "vue";
import { defineStore } from "pinia";
 
export const useRegister = defineStore("register", () => {
  const form = reactive({
    name: "",
    email: "",
    password: "",
    confirmation: "",
  });
 
  function resetForm() {
    form.name = "";
    form.email = "";
    form.password = "";
    form.confirmation = "";
  }
 
  async function handleSubmit() {
    return window.axios("api/Auth/register", form).then((response) => {
      console.log(response.data);
    });
  }
 
  return { form, resetForm, handleSubmit };
});