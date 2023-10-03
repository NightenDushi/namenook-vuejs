<template>
<form
class="d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
<div class="input-group">
    <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
        aria-label="Search" aria-describedby="basic-addon2" v-model="field_value" @keyup.enter="run_search" @input="run_search">
    <div class="input-group-append">
        <button class="btn btn-primary" type="button" tabindex="-1">
            Search
        </button>
    </div>
</div>
</form>
<div class="bg-white mb-4 static-top shadow" id="search_result"
    v-if="search_result.length>0 && field_value.trim().length>0">
    <ul>
        <nav-contact-item 
            v-for="(s, s_id) in search_result" :key="s_id"
            :contact="s" :contact-id="s.id"></nav-contact-item>
        <!-- <li v-for="(s, s_id) in search_result" :key="s_id">{{s.firstname}}</li> -->
    </ul>
</div>
</template>

<script>
import navContactItem from "./nav-contact-item.vue"

export default {
    props: [],
    components:{
        navContactItem
    },
    data () {
        return {
            field_value: "",
            search_result:[],
        }
    },
    methods: {
        run_search(){
            console.log(this.field_value)
            this.search_result = this.$root.contacts.filter(
                    (item)=>{
                        return ([item.firstname,item.lastname,item.email,item.phone,item.twitter,item.instagram,item.mastodon].join(" ").toLowerCase().includes(this.field_value.toLowerCase()))
                    }
                )
        }
        
    },
    created() {
        this.$watch(()=>this.$route.params, (newValue, oldValue)=>{
            this.field_value=""
            // this.toggle_edit(this.source_object)
        })
        // this.$bus.$on('pagechange', (index)=>this.field_value="");
    },
}
</script>

<style>
#search_result{
    position:absolute;
    background:rgb(148, 141, 141);
    top:100%;
    width:100%;
    padding:10px;
    color:black;
    z-index: 2;
}
#search_result > ul{
    list-style: none;
}

</style>