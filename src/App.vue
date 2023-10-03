<template>
        
<router-view></router-view>

</template>

<script>
import { toRaw } from 'vue';
import { useUserStore } from './stores/user'
// import { useAuth0 } from '@auth0/auth0-vue';

export default {
    data() {
        return {
            title:'Create a new contact',
            page_id:-1,
            contacts:[],
            user_setting:{
                "date-format": "en-US"
            },
            user:useUserStore(),
            user_logged: this.$auth0.isAuthenticated
        }
    },
    created() {

    },
    
    methods: {
        LOGINUSER(){
            this.$auth0.loginWithRedirect()
            // this.user.LOGGED = true;
            // this.get_contacts();
            // this.$router.push({ name: 'contact_default' })
        },
        LOGOUTUSER(){
            console.log("User_id:",this.$auth0.user.sub)
            this.$auth0.logout({ logoutParams: { returnTo: window.location.origin } });
            // this.user.LOGGED = false;
            // console.log("Logging out:", this.user)
            // this.$router.push({ name: 'public' })

        },
        async get_contacts(pOwnerId) {
            console.log("Fetching contacts...")
            const option = {mode: "cors", credentials: "same-origin"};
            const res = await fetch("http://api.nathan-guilhot.com/api/contacts?owner_id="+pOwnerId, option);
            console.log(res);
            if (res.ok){
                console.log("Contacts retrieved!");
                const finalRes = await res.json();
                this.contacts = finalRes;
            } else console.log("There was an error")
            
        },
        async send_database(pSource_object) {
            console.log("Sending to the database...",pSource_object)
            const res = await fetch("http://api.nathan-guilhot.com/api/contacts/"+pSource_object.id, {
                method: "PUT",
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pSource_object)
            });
            console.log(res);
            const finalRes = await res.json();
            let updated_contact = this.contacts.find(c => c.id === pSource_object.id)
            updated_contact = finalRes;
        },
        async add_user(pSource_object) {
            const contact = pSource_object;
            console.log("Adding to the database...",contact)
            const lastContact = await fetch("http://api.nathan-guilhot.com/api/contacts", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(contact)
            });

            const foo = await Promise.all([this.get_contacts(this.$auth0.user?._value?.sub), lastContact.json()]).then((data)=>{
                console.log(data);
                const lastContact_id = data[1][0].id
                const last_user_route = '/contact/'+ lastContact_id //last contact id
                console.log(last_user_route)
                this.$router.push({ path: last_user_route })
                console.log("lastContact_id", lastContact_id)
                return lastContact_id;
            });
            return foo;
        },
        async delete_user(pId) {
            console.log("Adding to the database... ",pId)
            const res = await fetch("http://api.nathan-guilhot.com/api/contacts/"+pId+"?owner_id=this.$auth0.user?._value?.sub", {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(res);
            const finalRes = await res.json();
            this.contacts = finalRes;

            this.$router.push({ path: '/new' })
        },
        async upload_image(pData, pContactId){
            console.log("Uploading to server...",pContactId, "=",pData)

            //NOTE(Nighten) uploading an image give back the whole contact list
            const foo = fetch("http://api.nathan-guilhot.com/api/upload/"+pContactId+"?owner_id="+this.$auth0.user?._value?.sub, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pData)
            }).then(async (pRes)=>{
                this.contacts = await pRes.json();
            })
            .catch(function(err){
                console.warn(err);
                //TODO(Nighten) Replace the alert with a proper modal
                //FIXME(Nighten) Why is the function sometimes triggered twice??
                alert("Please select a valid file")
            })
        },
        //pValue is either an url or a base64 image
        ScaleImageAndUpload(pValue, pContactId){
            console.log("Scaling and uploading for id:", pContactId)
            
            const filetype="image/jpeg";
            var img = document.createElement("img");
            img.onload = (event)=>{
                // Dynamically create a canvas element
                var canvas = document.createElement("canvas");

                // var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");

                canvas.width = 512;
                canvas.height = 512;

                // Actual resizing
                //https://stackoverflow.com/questions/23104582/scaling-an-image-to-fit-on-canvas
                var hRatio = canvas.width/img.width;
                var vRatio = canvas.height/img.height;
                var ratio  = Math.max ( hRatio, vRatio );
                var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
                var centerShift_y = ( canvas.height - img.height*ratio ) / 2;

                ctx.drawImage(img, 0, 0, img.width, img.height,
                    centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);

                // Show resized image in preview element
                var dataURI = canvas.toDataURL(filetype);
                
                this.upload_image({data:dataURI, type:filetype}, pContactId)
                // document.getElementById("preview").src = dataurl;
            }
            img.setAttribute('crossorigin', 'anonymous');
            img.crossOrigin = "anonymous";
            img.src = pValue;
        },
        async WebFingerResolve(pMastodonHandle){
            let pHandle = pMastodonHandle.trim()
            if (pHandle.startsWith("@")) pHandle=pHandle.slice(1);
            if (pHandle.length<=5) return ""
            const pUrl = pHandle.replace(/^(.*)@(.*)/, "https://$2/.well-known/webfinger?resource=acct:")+pHandle

            const res = await fetch("http://api.nathan-guilhot.com/api/proxy?url="+pUrl);
            const finalRes = await res.json();
            
            console.log(finalRes.links);
            return finalRes.links[0].href;

        }
    }
}
</script>

<style>

</style>
