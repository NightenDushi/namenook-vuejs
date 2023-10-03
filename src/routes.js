import {createRouter, createWebHistory} from 'vue-router';
import newContactPage from './components/new-contact-page.vue';
import settings from './components/settings.vue';
import contactView from './components/contact-view.vue';
import rooPage from './views/root-page.vue'

// import { useUserStore } from './stores/user'
import { createAuth0, authGuard } from '@auth0/auth0-vue';

//Todo: [ ] completely separate public and loged view (no more weird nesting)
const routes = [
    // {path:'/', component: landingPage, name:"public"},
    {path:'/', component: rooPage, name:"home", 
    children:[
        {path: 'new', component: newContactPage, name:"contact_default", beforeEnter: authGuard},
        {path: 'settings', component: settings, beforeEnter: authGuard},
        {path: 'contact', redirect: '/'},
        {path: 'contact/:contact_param', component: contactView, props:true, beforeEnter: authGuard},
    ]},
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {

    // console.log("Router, to=",to)
    // console.log("from=",from)
    // if (to.path == "/contact/"){
    //     next({path:"/"})
    //     return
    // }

    next()
})

export default router;