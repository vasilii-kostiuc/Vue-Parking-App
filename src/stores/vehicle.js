import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
 
export const useVehicle = defineStore("vehicle", () => {
  const router = useRouter();
  const errors = reactive({});
  const loading = ref(false);
  const vehicles =ref([]);
  const form = reactive({
    plateNumber: "",
    description: "",
  });
  
 
  function resetForm() {
    form.plateNumber = "";
    form.description = "";
 
    errors.value = {};
  }
 
  function storeVehicle() {
    if (loading.value) return;
 
    loading.value = true;
    errors.value = {};
 
    window.axios
      .post("api/vehicle", form)
      .then(() => {
        router.push({ name: "vehicles.index" });
      })
      .catch((error) => {
        if (error.response.status === 400) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }

  function getVehicles(){
    return window.axios
    .get("api/vehicle")
    .then((response)=>{
      vehicles.value = response.data.data;
    });
  }

  function updateVehicle(vehicle) {
    if (loading.value) return;
   
    loading.value = true;
    errors.value = {};
   
    window.axios
      .put(`api/vehicle/${vehicle.id}`, form)
      .then(() => {
        router.push({ name: "vehicles.index" });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }
   
  function getVehicle(vehicle) {
    window.axios.get(`api/vehicle/${vehicle.id}`).then((response) => {
      form.plateNumber = response.data.data.plateNumber;
      form.description = response.data.data.description;
    });
  }

  function deleteVehicle(vehicle) {
    window.axios.delete(`api/vehicle/${vehicle.id}`).then(getVehicles);
  }

  return { form, errors, loading, vehicles, resetForm, storeVehicle, getVehicles, getVehicle, updateVehicle, deleteVehicle };
});