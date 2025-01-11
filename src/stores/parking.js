import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
 
export const useParking = defineStore("parking", () => {
  const router = useRouter();
  const errors = reactive({});
  const loading = ref(false);
  const form = reactive({
    vehicleId: null,
    zoneId: null,
  });
 
  const parkings = ref([]);

  const stoppedParkings = ref([]);


  function getActiveParkings(){
    return window.axios.get("api/parking").then((response) => {
        parkings.value = response.data.data;
    })
  }

  function getStoppedParkings() {
    return window.axios.get("api/parking/history").then((response) => {
      stoppedParkings.value = response.data.data;
    });
  }


  function stopParking(parking){
    window.axios.put(`api/parking/stop/${parking.id}`).then(getActiveParkings);
  }

  function resetForm() {
    form.vehicleId = null;
    form.zoneId = null;
 
    errors.value = {};
  }
 
  function startParking() {
    if (loading.value) return;
 
    loading.value = true;
    errors.value = {};
 
    return window.axios
      .post("api/parking/start", form)
      .then(() => {
        router.push({ name: "parkings.active" });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }
 
  return { 
    form,
    errors, 
    loading, 
    parkings, 
    stoppedParkings,
    resetForm, 
    startParking, 
    stopParking, 
    getActiveParkings,
    getStoppedParkings
  };
});