<template>
<div class="container-fluid">
    <div class="bg-success text-white p-2">
        Demo Login <span class="d-none d-md-inline">: nathan.guilhot@gmx.fr Password123</span> <a class="btn btn-light" @click.prevent="copy_login">{{copy_button_text}}</a>
    </div>
	<div class="row">
		<div class="col-md-12">
			<ul class="navbar navbar-expand navbar-light bg-primary text-white topbar mb-4 static-top shadow nav flex flex-row nav-tabs justify-content-between rounded-bottom">
				<li class="nav-item h4 sidebar-brand-text mx-3 mb-0">
					NAMEͶOOK
				</li>
				<li class="nav-item">
					<a class="btn btn-light" @click.prevent="$root.LOGINUSER()">Sign-in/Sign-up</a>
				</li>
			</ul>
			<div class="row flex-sm-column-reverse flex-md-row mb-5" style="min-height:60vh">
				<div class="col-md-6 col-sd-12 d-flex flex-column justify-content-center pl-5 pr-5">
					<h3 class="h2 text-center">
						Keep up with those that matter to you
					</h3>
					<p class="text-center">
						Namenook is a full <i>CRUD application</i> built with <b>VueJS</b>, <b>NodeJS</b> and <b>Express</b>.<br> 
                        It features full authentification and authorization, database, file upload and web crawling.
					</p>
                    <a class="btn btn-primary mb-1" @click.prevent="$root.LOGINUSER()">Start now</a>
                    <a class="btn btn-secondary" href="#crud">Read about the project</a>
				</div>
				<div class="col-md-6 col-sd-12 d-flex flex-column justify-content-center align-items-center pr-5">
					<img class="w-75 sm-w-50 center m-5" alt="Namenook log" :src="img_logo" />
				</div>
			</div>
            <img class="lp_banner" :src="img_banner">
			<div class="jumbotron" id="crud">
				<h2>
					Complete CRUD with NodeJS
				</h2>
				<p>
					//Being a full CRUD application, the project feature a backend  Create, Read, Update, Delete
				</p>
				<p>
					//SQLite -> But I have isolated the code enough so that swiping to another storage system wouldn't be an issue; This is actually what I did during development, first working with an in-memory array before swapping the data container to use SQLite.
				</p>
				<p>
					//For the purpose of this demo, I also made a straight forward way of automatically copying the database upon server restart, which allow me to experiment and showcase the functionality without manual reset.
				</p>
				<!-- <p>
					<a class="btn btn-primary btn-large" href="#">Learn more</a>
				</p> -->
			</div>
			<div class="jumbotron bg-light">
				<h2>
					Authentification & Authorization with Auth0
				</h2>
				<p>
					Even though I have implemented authentification myself in the past, I wanted for this project to integrate the industry standard for login with Auth0.
				</p>
				<p>
					//Navigate documentation and typescript interface offered by the library, sometimes giving contradicting information
				</p>
				<p>
					//Auth0 integration was overall very straight forward, and I think it is a suitable solution if the company needs to get to market fast and want to include advanced features like double factor authentification; and if obviously the business model can sustain Auth0's pricing.
				</p>
				<p>
					<a class="btn btn-primary btn-large" href="#">Learn more</a>
				</p>
			</div>
			<div class="jumbotron">
				<h2>
					Image uploading and rescaling
				</h2>
				<p>
					In addition to the CRUD functionality, I also implemented the ability to upload images to the server. 
				</p>
				<p>
					//The risk of malicious file injection is metigated by the simple fact that the raw file is never sent to the server: instead, it goes through a rescale function that uses the canvas api. The image is rescaled, the raw pixels are captured, and only then sent to the server and saved on disk.
				</p>
				<p>
					//Furthermore, the name of the individual images are set to the hash MD5 of the image; this prevent what could be SQL or XSS injection through malicious filename. This also avoid storing the exact same image twice, saving space on the disk.
				</p>
				<p>
					<a class="btn btn-primary btn-large" href="#">Learn more</a>
				</p>
			</div>
			<div class="jumbotron bg-light">
				<h2>
					Web crawling to import account
				</h2>
				<p>
					//The feature I really wanted in an adresse book is the ability to import a contact from social media
				</p>
				<p>
					//Import Mastodon (introduce Mastodon), would have loved to use Twitter as well if their API was still affordable, but hopefully you get the idea: had to learn about the webfinger standard for resolving a profile url from an user handle. From there I had to find the standard location of the json file that would allow me to get the name, website, and profile picture used in that profile.
				</p>
				<p>
					//Had to build an entire proxy service in my back end to go around cors policy in browser; that can forward plain text/html, json or images from any source. Transferring images was a special challenge, as I had to learn how stream works and how to forward it in a response
				</p>
				<p>
					//Once the import from Mastodon was done, it was really easy to transfer the code I've done (fetching, proxy and image scaling) to Gravatar
				</p>
				<p>
					<a class="btn btn-primary btn-large" href="#">Learn more</a>
				</p>
			</div>
            <div class="row">
                links
            </div>
			<nav>
				<ol class="breadcrumb">
					<li class="breadcrumb-item">
						<a href="#">Home</a>
					</li>
					<li class="breadcrumb-item">
						<a href="#">Library</a>
					</li>
					<li class="breadcrumb-item active">
						Data
					</li>
				</ol>
			</nav>
		</div>
	</div>
</div>
<!-- <div>
<div class="lp_header">
<section>
    <h1>NAMEͶOOK</h1>
    <p>Your contact manager to keep up with those that matter</p>
</section>
<div class="lp_header_logo">
    <img :src="img_logo">
</div>
</div>
<br>
<router-link to="contact" @click.prevent="$root.LOGINUSER()">>>LOGIN</router-link>
</div> -->

</template>

<script>
// import { useUserStore } from '../stores/user'


export default{
    data(){
        return {
            img_logo : require("../../src/assets/logo.png"),
            img_banner : require("../../src/assets/wave.svg"),
            copy_button_text: "Copy"
        }
    },
    methods: {
        copy_login(){
            this.copy_button_text = "Copied! :)"
            setTimeout(()=>{this.copy_button_text = "Copy"}, 1500)
            navigator.clipboard.writeText('nathan.guilhot@gmx.fr Password123')

        }
        // LogUser(){
        //     const user = useUserStore();
        //     user.LOGGED = true;
        //     console.log("User has been logged!")
            
        // }
    }

}

</script>

<style scoped>
.lp_banner{
    margin-top:-3rem;
    margin-bottom:10px;
    width:100%;

    border-radius:10px;
    /* background:url('src/wave.svg') */
}

.jumbotron>p{
	width:100%;
	max-width:50vmax;
}
</style>