<template>
<li class="nav-item">
    <router-link class="nav-link" :class="{active : pageId==contactId}" :to="`/contact/${contact.firstname}_${contact.lastname}_${contact.id}`" tabindex=0>
        <img class="img-profile rounded-circle" :src="getimage" @error="onImageLoadFailure($event)" width="512" height="512">
        <span class="ml-2">{{contact.firstname}} {{contact.lastname}}</span>
    </router-link>
</li>
</template>

<script>
export default {
    props: ["contactId", "contact", "pageId"],
    computed:{
        getimage(pUrl){
            // '../assets/profile/'+contact.picture
            let img_src = ""
            try {
                img_src = require("../assets/profile/" + this.contact.picture);
            }
            catch {
                img_src = "https://namenook.nathan-guilhot.com/img/"+ this.contact.picture;
                // console.log(img_src)

            }
            return img_src;
        }
    },
    data(){
        return {
            // image : "img/assets/profile/" + this.contact.picture,
        }
    },
    methods: {
      onImageLoadFailure (event) {
        event.target.src = require('../assets/profile/undraw_profile.svg')
      }
    }
    
}
</script>

<style scoped>
.nav-item>a:focus{  
    background-color:rgba(255, 255, 255, 0.267);
    color: black!important;
    border:solid 1px black; 
}
.nav-item>a:focus>img{
    box-shadow: 0 0 3px black;
}
</style>