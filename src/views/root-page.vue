<template>
<landing-page v-if="logged==false"></landing-page>
<loged-view v-else></loged-view>
</template>

<script>
import logedView from './loged_view.vue';
import landingPage from './landing_page.vue';

export default{
    data(){
        return{
            logged: this.$auth0.isAuthenticated
        }
    },
    components:{
        logedView,
        landingPage
    }
}
</script>