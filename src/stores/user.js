import { defineStore } from 'pinia'
import { ref } from 'vue'
import auth0 from '@auth0/auth0-vue';

export const useUserStore = defineStore('user', ()=>{
    // const SessionData = sessionStorage.getItem("user");
    const LocalData_LOGGED = localStorage.getItem("user_logged");
    const LocalData_id = localStorage.getItem("user_id");

    let id = ref("none");
    let LOGGED = ref(false);

    console.log("LocalData_LOGGED: ",typeof(LocalData_LOGGED))
    if (LocalData_LOGGED!=undefined && LocalData_LOGGED!="undefined" && LocalData_LOGGED!=null){
        LOGGED.value = JSON.parse(LocalData_LOGGED);
        // console.log("Logged value from local storage:", LOGGED)
    }
    if (LocalData_id!=undefined && LocalData_id!="undefined" && LocalData_id!=null){
        id.value = LocalData_id;
    }
    return {id, LOGGED}
  })