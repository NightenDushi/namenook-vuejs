import {createApp, watch } from 'vue';
import App from './App.vue';
import router from "./routes";
import { createPinia } from 'pinia';
// import { useUserStore } from './stores/user'
import { createAuth0 } from '@auth0/auth0-vue';


const pinia = createPinia()
const app = createApp(App).use(createPinia());

app.use(pinia)
app.use(router);

app.use(
    createAuth0({
      domain: "dev-o1qgbkvgimd7ya17.us.auth0.com",
      clientId: "qxLFaub7QfL41Ed9xJTYv7SBeNyMVKKB",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  );

// watch(pinia.state,
//     (state) => {
//         console.log("Watch triggered: ",state.user);
//         localStorage.setItem("user_logged", state.user.LOGGED);
//         localStorage.setItem("user_id", state.user.id);
//     //   sessionStorage.setItem("user", JSON.stringify(state.user));
//     },
//     { deep: true }
//     );

// const events = new Map();
// app.config.globalProperties.$bus = {
//     $on(eventName, fn){
//         if (!events.has(eventName)){
//             events.set(eventName, [])
//         }

//         events.get(eventName).push(fn);
//     },

//     $off(eventName, fn){
//         throw {message: "Not implemented!"}
//     },

//     $emit(eventName, data){
//         console.log("Sending",eventName)
//         if (events.has(eventName)){
//             events.get(eventName).forEach(fn=>fn(data));
//         }
//     }
// }

app.mount("#app");