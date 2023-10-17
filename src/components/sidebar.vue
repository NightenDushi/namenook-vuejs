<template>
    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="contacts">

        <!-- Sidebar - Brand -->
        <router-link class="sidebar-brand d-flex align-items-center justify-content-center" to="/new">
            <div class="sidebar-brand-text mx-3">NameͶook</div>
        </router-link>

        <hr class="sidebar-divider my-0">

        <!-- Nav Item - Dashboard -->
        <li class="nav-item active">
            <router-link class="btn nav-link" to="/new" tabindex="0">
                <span>New Contact +</span>
            </router-link>
        </li>

        <hr class="sidebar-divider">

        <!-- Heading -->
        <div class="sidebar-heading">
            Contacts
        </div>

        <!-- Nav Item - Pages Collapse Menu -->
        <nav-contact-item 
            v-for="(contact, contact_id) in $root.contacts" :key="contact_id"
            :contact="contact" :contact-id="contact.id"></nav-contact-item>

        <hr class="sidebar-divider d-none d-md-block">

        <li class="nav-item">
            <router-link class="nav-link collapsed" to="/settings"  tabindex="0">
                <span class="ml-2">Settings</span>
            </router-link>
        </li>
    </ul>
</template>

<script>
import navContactItem from './nav-contact-item.vue';

export default {
    components:{
        navContactItem
    },
}
</script>

<style scoped>
a:focus{
    border: solid 1px black;
}
</style>

