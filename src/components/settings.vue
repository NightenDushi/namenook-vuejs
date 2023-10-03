<template>
<div class="row">
    <generic-page-title display-title="Settings"></generic-page-title>
    <div class="col-lg-6">
        <div class="card shadow mb-4">
            <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">General settings</h6>
            </div>
            <div class="card-body import-option">
                <!-- <p>Here are the settings</p> -->
                
                <div>
                    <label for="date_format">Birthday date format</label>
                    <select name="date_format" class="form-control" value="en-US" v-model="$root.user_setting['date-format']" @change="console.log($root.user_setting)">
                        <option value="en-US" :selected="$root.user_setting['date-format']=='en-US'">month, day, year</option>
                        <option value="en-GB" :selected="$root.user_setting['date-format']=='en-GB'">day, month, year</option>
                        <!-- <option value="en-ZA">year, month, day</option> -->
                    </select>

                </div>
                <!-- <a href="#" class="btn btn-primary btn-icon-split btn-lg mt-3">
                    <span class="text"><img :src="loading_icon" alt="loading spinner" width="25" height="25"></span>
                    <span class="text" v-else>Import</span>
                </a> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import genericPageTitle from "./generic-page-title.vue";

export default {
    components:{
        genericPageTitle
    },
    created(){
        //NOTE(Nighten) for some reason this doesn't fire
        // this.$watch(()=>{return this.$root.user_setting}, (newValue, oldValue)=>{
        //     console.log("settings saved")
        //     localStorage.setItem("settings", JSON.stringify(newValue))
        // })
    }
}
</script>