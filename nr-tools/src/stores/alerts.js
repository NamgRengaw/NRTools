import { ref } from "vue";
import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", () => {
  const alerts = ref([]);

  function addAlert({ message, type = "info", timeout = 3000 }) {
    const id = Date.now();
    alerts.value.push({ id, message, type });
    setTimeout(() => {
      removeAlert(id);
    }, timeout);
  }

  function removeAlert(id) {
    alerts.value = alerts.value.filter(alert => alert.id !== id);
  }

  return { alerts, addAlert, removeAlert };
});