<template>
<div :class="wrapperClass">
    <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2 d-flex justify-content-between align-items-baseline" v-if="edit_mode">
                    <div class="d-flex align-items-baseline">
                        <input v-for="(element, element_id) in elements"
                            :type="inputType[element_id]"
                            :value="source_object[element]" @input="(event) => {source_object[element]=event.target.value}"
                            class="form-control"
                            @keyup.enter="toggle_edit(source_object)"
                            @keyup.escape="toggle_edit(source_object)"
                            :key="element_id">
                    </div>
                    <span class="col-auto">
                        <a href="#" @click.prevent="toggle_edit(source_object)" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" tabindex="0">back</a>
                        <!--<a href="#" @click.prevent="toggle_edit(source_object)">back</a>-->
                    </span>
                </div>
                <div class="col mr-2 d-flex justify-content-between align-items-baseline" v-else>
                    <h1 class="h3 mb-0 text-gray-800 d-md-inline-block" v-html="displayTitle"></h1>
                    <span class="col-auto">
                        <a href="#" @click.prevent="edit_mode=true" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" tabindex="0">edit</a>
                        <!--<a href="#" @click.prevent="edit_mode=true">edit</a>-->
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {ref} from 'vue';

export default {
    props: ['displayTitle', 'elements', 'source_object', 'inputType', 'wrapperClass'],
    data () {
        return {
            edit_mode: false
        }
    },
    methods: {
        toggle_edit(pSource_object){
            this.edit_mode = !this.edit_mode;
            if (!this.edit_mode){
                this.$emit('edited');
                this.$root.send_database(pSource_object);
            }
        },
        
    },
    created() {
        this.$watch(()=>this.$route.params, (newValue, oldValue)=>{
            this.edit_mode=false;
            // this.toggle_edit(this.source_object)
        })
    },
}
</script>

<style scoped>
h1{
    overflow:hidden;
}

.btn-primary:focus{
    border:solid 2px black; 
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.658) !important;
}
</style>