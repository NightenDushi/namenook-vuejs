<template>
<!-- Sidebar -->
<sidebar :contacts="$root.contacts"></sidebar>

<!-- Content Wrapper -->
<div id="content-wrapper" class="d-flex flex-column">

    <!-- Main Content -->
    <div id="content">
        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <!-- Topbar Search -->
            <search-bar></search-bar>
            
            <router-link to="/" @click="$root.LOGOUTUSER()">Logout</router-link>
        </nav>
        <!-- End of Topbar -->
        <div class="container-fluid" id="content">
                <router-view></router-view>
        </div>
    </div>
    <!-- Footer -->
    <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>Copyright &copy; Guilhot Nathan 2023</span>
            </div>
        </div>
    </footer>
    <!-- End of Footer -->

</div>
<!-- /.container-fluid -->
</template>

<script>
import sidebar from '../components/sidebar.vue';
import searchBar from '../components/search-bar.vue';


export default {
    components:{
        sidebar,
        searchBar,
    },
    methods:{
        printauth(){
            console.log("Auth: ",this.$auth0.user?._value?.sub)
            // this.$auth0.getAccessTokenSilently().then((foo)=>console.log(foo))
        }
    },
    created(){
        
        // console.log("User_id:", this.$auth0.user?._value?.sub)
        console.log("The loged view is created")
        console.log(this.$auth0.isAuthenticated);
        if (this.$auth0.isAuthenticated.value){
            /*NOTE(Nighten) this is an awful hack because the values stored 
                in $auth0 are undefined when accessed despite showing up in
                console when printing the object.
                Therefore, we need to wait half a second before accessing the
                user's sub and calling the API to fetch our contacts
            */
            setTimeout(()=>{
                    // console.log("We should be authentificated by now")
                    // console.log(this.$auth0.isAuthenticated);
                    // console.log(this.$auth0);
                    // console.log(this.$auth0.user?._rawValue);
                    // console.log(this.$auth0.user);
                    this.$root.get_contacts(this.$auth0.user?._value?.sub);
                    // console.log("----------------");

            }, 500)

        }
    },
}
</script>