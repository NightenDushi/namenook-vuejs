<template>
<!-- Begin Page Content -->
<div class="row" v-if="currentContact">
    <editable-field :display-title="contact_display(currentContact.firstname, currentContact.lastname)"
        :elements="['firstname', 'lastname']"
        :input-type="['text','text']"
        :source_object="currentContact"
        :wrapper-class = "'col-xl-9 col-md-8 col-sm-12 mb-4 h-25 mt-auto h1'">
    </editable-field>
    <avatar-upload :currentContact="currentContact"></avatar-upload>
    <editable-field :display-title="email_display(currentContact.email)"
        :elements="['email']"
        :input-type="['email']" :source_object="currentContact"
        :wrapper-class = "'col-xl-6 col-md-12 col-sm-12 mb-5'">
    </editable-field>
    <editable-field :display-title="'📞 '+currentContact.phone"
        :elements="['phone']"
        :input-type="['tel']" :source_object="currentContact"
        :wrapper-class = "'col-xl-6 col-md-12 col-sm-12 mb-5'">
    </editable-field>
    <editable-field :display-title="website_display(currentContact.website)"
        :elements="['website']"
        :input-type="['url']" :source_object="currentContact"
        :wrapper-class = "'col-xl-6 col-md-12 col-sm-12 mb-5'">
    </editable-field>
    <editable-field :display-title="twitter_display(currentContact.twitter)"
        :elements="['twitter']"
        :input-type="['text']" :source_object="currentContact"
        :wrapper-class = "'col-xl-6 col-md-12 col-sm-12 mb-5'">
    </editable-field>
    <editable-field :display-title="instagram_display(currentContact.instagram)"
        :elements="['instagram']"
        :input-type="['text']" :source_object="currentContact"
        :wrapper-class = "'col-xl-6 col-md-12 col-sm-12 mb-5'">
    </editable-field>
    <editable-field :display-title="mastodon_fullurl ? mastodon_fullurl : mastodon_display(currentContact.mastodon)" @edited="mastodon_fullurl=false"
        :elements="['mastodon']"
        :input-type="['text']" :source_object="currentContact"
        :wrapper-class = "'col-xl-6 col-md-12 col-sm-12 mb-5'">
    </editable-field>
    <editable-field :display-title="date_display(currentContact.birthday)"
        :elements="['birthday']"
        :input-type="['date']" :source_object="currentContact"
        :wrapper-class = "'col-xl-6 col-md-12 col-sm-12 mb-5'">
    </editable-field>

    <div class="col-xl-12 col-md-12 col-sm-12 mb-5 d-flex justify-content-end">
    <a href="#" class="btn btn-danger btn-icon-split" @click.prevent="DeleteContact" tabindex="0">
        <span class="icon text-white-50 bold">
            ❕
        </span>
        <span class="text">Delete contact</span>
    </a>
    </div>
        
    <!-- <div v-else-if="pageId === -1" class="row">
        <new-contact-page :page-title="pageTitle"></new-contact-page>
    </div>
    <div v-else-if="pageId === -2" class="row">
        <settings :page-title="pageTitle"></settings>
    </div> -->
</div>
</template>

<script>
import editableField from "./editable-field.vue";
// import genericPageTitle from "./generic-page-title.vue";
import avatarUpload from "./avatar-upload.vue";

export default {
    components:{
        editableField,
        avatarUpload,
    },
    // props: ['pageTitle', 'pageId', 'currentContact'],
    props: ['contact_param'],
    data(){
        return{
            mastodon_fullurl: false, //set as false until the promise is resolved
            currentContact: null,
            contact_id:0
        }
    },
    created(){
        // this.$bus.$on('pagechange', (index)=>this.mastodon_fullurl=false);
        this.changeUser();

        this.$watch(()=>this.$root.contacts, (newValue, oldValue)=>{
            this.currentContact = this.$root.contacts.find((c)=>c.id==this.contact_id);
        });
    },
    methods: {
        changeUser(){
            this.mastodon_fullurl=false //trigger a refresh of the mastodon url

            const param_list = this.contact_param.split("_")
            this.contact_id = param_list[param_list.length-1]
            this.currentContact = this.$root.contacts.find((c)=>c.id==this.contact_id);
            console.log("contact param:",this.contact_id)
            if (!this.currentContact){
                console.log("Redirect...")
                this.$router.push({ path: '/contact/', replace: true })
            }
        },
        contact_display(pFirstName, pLastName) {
            return pFirstName+" "+pLastName;
        },
        website_display(pUrl) {
            if (pUrl.length<5) return "🌍 ";
            const pDiplayUrl = pUrl;
            if (!pUrl.startsWith("https://") || !pUrl.startsWith("http://")) pUrl="https://"+pUrl;

            return "🌍 <a href='"+pUrl+"' target='_blank'>"+pDiplayUrl+"</a>"
        },
        email_display(pMail) {
            if (pMail.length==0) return "✉ ";
            return "✉ <a href='mailto:"+pMail+"'>"+pMail+"</a>"
        },
        twitter_display(pHandle) {
            if (pHandle.length==0) return "✖ ";
            if (pHandle.startsWith("@")) pHandle=pHandle.slice(1,pHandle.length)
            return "✖ <a href='https://twitter.com/"+pHandle+"' target='_blank'>@"+pHandle+"</a>"
        },
        instagram_display(pHandle) {
            if (pHandle.length==0) return "📷 ";
            if (pHandle.startsWith("@")) pHandle=pHandle.slice(1,pHandle.length)
            return "📷 <a href='https://instagram.com/"+pHandle+"' target='_blank'>@"+pHandle+"</a>"
        },
        mastodon_display(pHandle) {
            if (pHandle.length<=5) return "🐘 ";
            if (!pHandle.startsWith("@")) pHandle="@"+pHandle;
            // console.log("Hop hop")
            this.$root.WebFingerResolve(pHandle).then((pUrl)=>{
                // console.log("Webfinger resolved")
                this.mastodon_fullurl = "🐘 <a href='"+pUrl+"'' target='_blank'>"+pHandle+"</a>"
                // console.log(this.mastodon_html)
            })
            return "🐘 "+pHandle
        },
        date_display(pDateString) {
            if (pDateString.length==0) return "🍰 "
            const date = new Date(pDateString);
            return "🍰 "+date.toLocaleDateString(this.$root.user_setting["date-format"], { year: 'numeric', month: 'short', day: 'numeric' })
            
        },
        DeleteContact() {
            console.log("Deleting contact...")
            this.$root.delete_user(this.currentContact.id)
        }
    },
    watch:{
        contact_param(newParam, oldParam){
            this.changeUser();
        }
    }
}
</script>

