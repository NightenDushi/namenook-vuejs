<template>
<div class="col-xl-3 col-md-4 mb-2">
    <form id="img_uploader">
        <input type="file" id="img" name="img" accept="image/*" @change="uploadFiles">
        <label for="img"></label>
    </form>
    <img :src="getimage" class="img-fluid img-thumbnail rounded-circle" @error='onImageLoadFailure($event)' width="512" height="512">
</div>
</template>

<script>
export default {
    props: ["currentContact"],
    computed:{
        getimage(){
            let img_src = ""
            try {
                img_src = require("../assets/profile/" + this.currentContact.picture);
            }
            catch {}
            return img_src;
        }
    },
    methods: {
        onImageLoadFailure(event) {
            event.target.src = require('../assets/profile/undraw_profile.svg');
        },
        uploadFiles(event) {
            console.log("Avatar input entered...");
            const file = event.target.files[0];
            const filename = (file.name);
            const fileReader = new FileReader();
            fileReader.addEventListener('load', (e)=>{
                
                this.$root.ScaleImageAndUpload(e.target.result, this.currentContact.id)
                                
            });
            fileReader.readAsDataURL(file)

        }
    }
}
</script>

<style>
#img_uploader{
    cursor:pointer;
}
#img_uploader>input{
    width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
#img_uploader>label{
    position: absolute;
    width:95%;
    height:100%;
    margin-bottom:0;


    color: white;
    background-color: rgba(0, 0, 0, 0);
    border-radius:10%;
    cursor:pointer;

    /* pointer-events: none; */
}
#img_uploader>input:focus + label,
#img_uploader>label:hover {
    background-color: rgba(0, 0, 0, 0.11);
}
</style>