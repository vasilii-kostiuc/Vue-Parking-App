import { reactive } from "vue";
import { defineStore } from "pinia";
 
export const useRegister = defineStore("register", () => {
  const form = reactive({
    name: "",
    email: "",
    password: "",
    confirmation: "",
  });
 
  const errors = reactive({});

  function resetForm() {
    form.name = "";
    form.email = "";
    form.password = "";
    form.confirmation = "";

    errors.value = {};
  }
 
  async function handleSubmit() {
    errors.value = {};

    return window.axios.post("api/Auth/register", form).then((response) => {
      console.log(response.data);
    }).catch(function (error) {
      if (error.response.status === 400) {
        errors.value = error.response.data.errors;
      }    
    }).finally(() => {
      form.password = "";
      form.confirmation = "";
    });
  }
 
  return { form, errors, resetForm, handleSubmit };
});