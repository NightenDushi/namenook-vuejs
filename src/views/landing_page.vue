<template>
<div class="container-fluid">
    <div class="bg-success text-white p-2">
        Demo Login <span class="d-none d-md-inline">: nathan.guilhot@gmx.fr Password123+</span> <a class="btn btn-light" @click.prevent="copy_login">{{copy_button_text}}</a>
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
						Namenook is a complete <i>CRUD application</i> built with <b>VueJS</b>, <b>NodeJS</b> and <b>Express</b> and <b>fully deployed</b> on a Nginx server with SSL certificate. It features full authentification and authorization, database, file upload and web crawling.
					</p>
					<div class="d-flex justify-content-center align-items-center mb-3 flex-wrap">
						<img class="img-fluid icon" alt="VueJs' logo" :src="require('../assets/logo/vuejs.svg')" style="height:40px;">
						<img class="img-fluid icon" alt="NodeJs' logo" :src="require('../assets/logo/node.svg')">
						<img class="img-fluid icon" alt="Auth0's logo" :src="require('../assets/img/Auth0.svg')">
						<img class="img-fluid icon" alt="SQLite's logo" :src="require('../assets/logo/sqlite.svg')">
						<img class="img-fluid icon" alt="Nginx's logo" :src="require('../assets/logo/nginx.svg')" style="height:25px;">
					</div>
                    <a class="btn btn-primary mb-1" @click.prevent="$root.LOGINUSER()">Start now</a>
                    <a class="btn btn-secondary" href="#crud">Read about the project</a>
				</div>
				<div class="col-md-6 col-sd-12 d-flex flex-column justify-content-center align-items-center pr-5">
					<img class="w-75 sm-w-50 center m-5" alt="Namenook log" :src="img_logo" />
				</div>
			</div>
            <img class="lp_banner" :src="img_banner">
			<div class="jumbotron row" id="crud">
				<div class="col-sm">
					<h2>
						Complete CRUD with NodeJS
					</h2>
					<p>
						Being a full CRUD application, this project feature a backend server and the ability Create, Read, Update, Delete entries in a database <b>via an Express API</b>.
					</p>
					<p>
						For security reason, using the API requires an user identifier that prevent any malicious user to read, modify or delete any contacts created by other users.
					</p>
					<p>
						Being already familiar with SQL, I chose <b>SQLite</b> for its simplicity and fast iteration. But to prepare for any future evolution, I have isolated the code enough so that switching to another storage system wouldn't be an issue. This is actually what I did during development, first working with an in-memory array before swapping the data container to use SQLite.
					</p>
					<p>
						For the purpose of this demo, I also made a straight forward way of automatically copy the database upon server restart, which allow me to experiment and showcase the functionality without manual database reset.
					</p>
				</div>
				<video width="555" height="484" autoplay muted loop class="col-sm">
					<source :src="require('../assets/video/Namenook01_crop.mp4')" type="video/mp4">
					Your browser does not support the video tag.
				</video>
			</div>
			<div class="jumbotron bg-light row">
				<p class="col-sm"><img class="img-fluid" alt="Auth0's logo" :src="require('../assets/img/Auth0.svg')"></p>
				<div class="col-sm">
				<h2>
					Authentification & Authorization with Auth0
				</h2>
				<p>
					Even though I have implemented authentification myself in the past, I wanted for this project to integrate the industry standard for login with Auth0.
				</p>
				<p>
					This required me to navigate documentation and typescript interface offered by the library, sometimes giving contradicting information.
				</p>
				<p>
					But overall Auth0 integration was very straight forward, and I think it is a suitable solution if the company needs to get to market fast and want to include advanced features like double factor authentification; and if obviously the business model can sustain Auth0's pricing.
				</p>
				</div>
			</div>
			<div class="jumbotron row">
				<div class="col-sm">
				<h2>
					Image uploading and rescaling
				</h2>
				<p>
					In addition to the CRUD functionality, I also implemented the ability to upload images to the server. The user can set a custom picture to each of their contacts.
				</p>
				<p>
					Any kind of user-facing interaction with the server represent a major security concern; that's why <b>the raw file is never sent to the server</b>: instead, it goes through a rescale function that uses the browser canvas api. The image is rescaled, the raw pixels are captured, and only then sent to the server and saved on disk.
				</p>
				<p>
					Uploading a picture to the server also require to provide a valid user id to verify that the accound exist, and that the contact being edited belong to this user. If the user id went to be discovered by a malicious user, they could only use it to change the contacts belonging to that user id.
				</p>
				<p>
					Furthermore, the name of the individual images are set to the hash MD5 of the image; this prevent what could be SQL or XSS injection through malicious filename. This also avoid storing the exact same image twice, saving space on the disk.
				</p>
				</div>
				<div class="col-sm"><img class="img-fluid" alt="File uploading in Namenook" :src="require('../assets/upload_illustration.png')"></div>
			</div>
			<div class="jumbotron bg-light row">
				<video width="555" height="484" autoplay muted loop class="col-sm">
					<source :src="require('../assets/video/Namenook02_crop.mp4')" type="video/mp4">
					Your browser does not support the video tag.
				</video>
				<div class="col-sm">
					<h2>
						Web crawling to import account
					</h2>
					<p>
						Being able to retrieve contacts from social media was a key user-facing feature. Currently, you can import contact from <b>Twitter</b>, <b>Mastodon</b> and <b>Gravatar</b>.
					</p>
					<p>
						In the case of Twitter, I didn't had access to the official API and I didn't wanted to do heavy crawling (with headless browser to pass Twitter security and javascript) on the server side.  but I instead used RSS feeds generated through a <a href="https://github.com/zedeus/nitter" target="_blank">Nitter</a> (an alternative Twitter front-end) instance. I then parse the rss with a regular expression to load the <!--profile picture and--> name of the profile.
					</p>
					<p>
						Mastodon is a decentralized alternative to Twitter. To structure its federation, it use the <i>ActivityPub</i> and <i>WebFinger</i> standard; so to resolve a profile url from a Mastodon handle I had to learn about these standards, both by reading W3C documentation and experimenting with existing implementation. From there, I had to find the standard location of the json file that would allow me to get the name, website, and profile picture used in that account.
					</p>
					<p>
						As I wanted to do most of the parsing on the client side, I <b>had to build an entire proxy service</b> in the back end to work around cors policy in browsers. This service serves an api that forward plain text, xml, json or images from any url source. Transferring images was a special challenge, as I had to learn how stream works and how to forward the server response.
					</p>
					<p>
						Once the first import functionality was implemented, it was really easy to transfer the code (fetching, proxy and image scaling) to Gravatar, which is a service that uses email to centralize profile picture on the internet.
					</p>
					<p class="d-flex flex-column">
						<a class="btn btn-primary btn-large mb-1" @click.prevent="$root.LOGINUSER()">Login and try it yourself!</a>
						<a class="btn btn-secondary btn-large" href="#">Back to the top</a>
					</p>
				</div>
			</div>
			<nav>
				<ol class="breadcrumb d-flex justify-content-between">
					<ul class="nav">
						<li class="nav-item"><a class="nav-link" href="https://github.com/NightenDushi/namenook-vuejs" target="_blank">Github</a></li>
						<li class="nav-item"><a class="nav-link" href="https://nathan-guilhot.com" target="_blank">Portfolio</a></li>
					</ul>
					<div class="nav-link">
						&copy; Nathan guilhot - 2023
					</div>
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
            img_logo : require("../../src/assets/logo_small.svg"),
            img_banner : require("../../src/assets/wave.svg"),
            copy_button_text: "Copy"
        }
    },
    methods: {
        copy_login(){
            this.copy_button_text = "Copied! :)"
            setTimeout(()=>{this.copy_button_text = "Copy"}, 1500)
            navigator.clipboard.writeText('nathan.guilhot@gmx.fr Password123+')

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

.jumbotron>div>p, .jumbotron>p{
	width:100%;
	max-width:50vmax;
}

.icon{
	max-height:50px;
	margin-right:10px;
	margin-left:10px;
}
</style>