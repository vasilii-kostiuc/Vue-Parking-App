import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { useAuth } from "@/stores/auth";

const auth = useAuth();


export const useRegister = defineStore("register", () => {
  const form = reactive({
    name: "",
    email: "",
    password: "",
    confirmation: "",
  });
 
  const errors = reactive({});
  const loading = ref(false);

  function resetForm() {
    form.name = "";
    form.email = "";
    form.password = "";
    form.confirmation = "";

    errors.value = {};
  }
 
  async function handleSubmit() {

    if (loading.value) return;
 
    loading.value = true;

    errors.value = {};

    return window.axios.post("api/Auth/register", form).then((response) => {
      console.log(response.data);
      auth.login(response.data.accessToken)
    }).catch(function (error) {
      if (error.response.status === 400) {
        errors.value = error.response.data.errors;
      }    
    }).finally(() => {
      form.password = "";
      form.confirmation = "";
    });
  }
 
  return { form, errors, loading, resetForm, handleSubmit };
});