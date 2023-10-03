<template>
<div class="row">
<generic-page-title display-title="Create a new contact"></generic-page-title>
<div class="col-lg-6">
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Import options</h6>
        </div>
        <div class="card-body">
            <p>Select one of the option to create a new contact. You can start blank or try one of our import option:</p>
            <a href="#" class="btn btn-primary btn-icon-split btn-lg" @click.prevent="NewContact(blank_contact)">
                <span class="text">New contact </span>
                <span class="icon text-white-50">+</span>
            </a>
            <div class="my-2"></div>
            <a href="#" class="btn btn-success btn-icon-split" @click="import_type='Gravatar (email)'">
                <span class="text">Import from Gravatar (email)</span>
            </a>
            <div class="my-2"></div>
            <a href="#" class="btn btn-info btn-icon-split" @click.prevent="import_type='Mastodon'">
                <span class="text">Import from Mastodon</span>
            </a>
        </div>
    </div>

</div>
<Transition>
<div class="col-lg-6" v-if="import_type!=''" id="import_field">
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Import from {{import_type}}</h6>
        </div>
        <Transition mode="out-in">
        <div class="card-body import-option" v-if="import_type=='Gravatar (email)'">
            <p>Enter the email adresse of the Gravatar account</p>
            
            <div><input type="email" class="form-control" v-model="pGravatarHandle" @keyup.enter="FetchGravatar"></div>
            <a type="button" href="#" class="btn btn-primary btn-icon-split btn-lg mt-3" @click.prevent="FetchGravatar" :class='{"disable":isGravatarFormInvalid}'>
                <span class="text" v-if="isFetching"><img :src="loading_icon" alt="loading spinner" width="25" height="25"></span>
                <span class="text" v-else>Import</span>
            </a>
        </div>
        <div class="card-body import-option" v-else-if="import_type=='Mastodon'">
            <p>Enter the name of the account you want to import <br><i>(exemple : <code>@year_progress@techhub.social</code>)</i></p>
            
            <div><input type="text" class="form-control" v-model="pMastodonHandle" @keyup.enter="FetchMastodon"></div>
            <a href="#" class="btn btn-primary btn-icon-split btn-lg mt-3" @click.prevent="FetchMastodon" :class='{"disable":isMastodonFormInvalid}'>
                <span class="text" v-if="isFetching"><img :src="loading_icon" alt="loading spinner"  width="25" height="25"></span>
                <span class="text" v-else>Import account</span>
            </a>
        </div>
        </Transition>
    </div>
</div>
</Transition>
</div>
</template>

<script>
import genericPageTitle from './generic-page-title.vue';
import bimd5 from '../../node_modules/blueimp-md5/js/md5.min.js';

var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
    components:{
        genericPageTitle
    },
    data(){
        return{
            blank_contact: {
                "owner_id": "",
                "firstname": "",
                "lastname": "",
                "picture": "",
                "email": "",
                "phone": "",
                "birthday": "",
                "website": "",
                "twitter": "",
                "instagram": "",
                "mastodon": ""
            },
            import_type : "",
            pMastodonHandle:"",
            pGravatarHandle:"",
            isFetching: false,
            loading_icon: require("../assets/load.gif"),

            user:this.$auth0.user
        }
    },
    computed: {
        isGravatarFormInvalid(){
            if (this.pGravatarHandle.length<5) return true;
            if (!this.pGravatarHandle.match(EMAIL_REGEX)) {return true};
            return false;
        },
        isMastodonFormInvalid(){
            if (this.pMastodonHandle.length<5) return true;
            if (!this.pMastodonHandle.match(/.+@.+\..+$/)) return true;
            return false;
        }
    },
    methods: {
        async NewContact(pContact = this.blank_contact){
            pContact["owner_id"] = this.$auth0.user?._value?.sub;
            if (pContact["owner_id"] == undefined){console.log("error: no valid user id!");return}
            const new_contact_id = await this.$root.add_user(pContact);
            console.log("New contact:",new_contact_id );
            return new_contact_id
        },

        async FetchMastodon(){
            // console.log(this.pMastodonHandle)
            this.isFetching = true;
            let pHandle = this.pMastodonHandle.trim()
            if ((this.pMastodonHandle.length<5) || (!this.pMastodonHandle.match(/.+@.+\..+$/))){
                this.isFetching = false;
                return;
            } 

            // if (!pHandle.startsWith("@")) pHandle="@"+pHandle;
            const pUrl = await this.$root.WebFingerResolve(pHandle) //this is the address of the profile page
            console.log(pUrl)
            const res = await fetch(pUrl+".json"); //read the json
            console.log(res)
            const finalRes = await res.json()
            let names = finalRes.name.split(" ")

            const picture_url = finalRes.icon.url
            console.log(picture_url)

            this.blank_contact.mastodon = pHandle;
            this.blank_contact.firstname = names[0]
            if (names.length>1){
                names = names.slice(1)
                this.blank_contact.lastname = names.join(" ")
            }

            // console.log(finalRes.attachment)
            for (let i in finalRes.attachment){
                if (finalRes.attachment[i].value.startsWith("<a")){
                    //NOTE(Nighten) We pick the first link in the array; this is not perfect but the best I can do without making too many false negative
                    this.blank_contact.website = finalRes.attachment[i].value.match(/http.*(?=" target)/g)[0];
                    console.log(this.blank_contact.website)
                    if (this.blank_contact.website){
                        break;
                    }
                    this.blank_contact.website = "";
                };
            }

            const contact_id = await this.NewContact(this.blank_contact)
            const picture_req = await fetch("http://api.nathan-guilhot.com/api/proxy?url="+picture_url);
            console.log("Fetched!")
            const picture_res = await picture_req.blob();
            console.log("Going to scale")
            // console.log(picture_res);
            this.$root.ScaleImageAndUpload(URL.createObjectURL(picture_res), contact_id);
            this.isFetching = false;

        },
        FetchGravatar(){
            this.isFetching = true;
            console.log(this.pGravatarHandle)
            this.pGravatarHandle = this.pGravatarHandle.trim();
            if ((this.pGravatarHandle.length<=5) || (!this.pGravatarHandle.match(EMAIL_REGEX))){
                this.isFetching = false;
                return
            }
            let hash = bimd5(this.pGravatarHandle) //"764705a2dadc4b8dcf5ea26ad1e740a7"
            console.log(hash)
            // hash = "205e460b479e2e5b48aec07710c08d50";
            const profile_url = "https://www.gravatar.com/"+hash +".json"
            const avatar_url = "https://www.gravatar.com/avatar/"+hash+"?s=512"

            //TODO(Nighten) Send these fetches in parallel in one promise
            //              Then send the new contact
            //Get the name
            const profile_fetch = fetch("http://api.nathan-guilhot.com/api/proxy?url="+profile_url);
            //Get the avatar
            const picture_fetch = fetch("http://api.nathan-guilhot.com/api/proxy?url="+avatar_url)

            Promise.all([profile_fetch, picture_fetch]).then((datas)=>{
                const profile_data = datas[0]
                const picture_data = datas[1]
                profile_data.json().then((data)=>{
                    let names = data.entry[0].displayName.split(" ");
                    this.blank_contact.firstname = names[0];
                    if (names.length>1){
                        names = names.slice(1);
                        this.blank_contact.lastname = names.join(" ");
                    }

                    console.log("Creating new contact")
                    this.blank_contact.email = this.pGravatarHandle;

                    const contact_promise = this.NewContact(this.blank_contact);
                    const picture_parse_promise = picture_data.blob();

                    Promise.all([contact_promise, picture_parse_promise]).then(
                        (datas)=>{
                            const NewContactId = datas[0];
                            console.log(datas)
                            const PictureData = datas[1];
                            this.$root.ScaleImageAndUpload(URL.createObjectURL(PictureData), NewContactId)
                        }
                    ).catch((err)=>{alert("Unable to find the profile while parsin json", err); console.log(err); this.isFetching = false;})
                })
                .catch((err)=>{alert("Unable to find the profile", err); console.log(err); this.isFetching = false;})
            })
        }
    },
    
}
</script>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease;
}

.v-leave-to,
.v-enter-from{
    opacity: 0;
}

.disable{
    opacity:0.5;
    cursor:initial !important
}
</style>