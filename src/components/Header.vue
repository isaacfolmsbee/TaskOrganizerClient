<template>
	<div class="header-wrapper">
		<Modal 
			:isActive="isModalActive" 
			:activeModal="activeModal"
			:user="user"
			@loginUser="loginUser($event)"
			@registerUser="registerUser($event)"
			@closeModal="closeModal()" />
		<div class="theme-selector">
		</div>
		<div class="title">
			<a href="/">Task Organizer</a>
		</div>
		<div class="links" v-if="!this.authtoken">
			<a @click="openLoginModal()">Login</a>
			<a @click="openRegisterModal()">Register</a>
		</div>
		<div class="links" v-else>
			<a @click="logout()">Logout</a>
		</div>
	</div>
</template>

<script>
import UserHandler from '../UserHandler'
import Modal from './Modal'

export default {
	name: "Header",
	components: {
		Modal,
	},
	data() {
		return {
			user: {
				email: '',
				password: '',
				confirmpassword: '',
			},
			isModalActive: false,
			activeModal: 'login',
			authtoken: '',
		}
	},
	created() {
		this.authtoken = sessionStorage.getItem('authtoken');
	},
	methods: {
		openLoginModal() {
			this.isModalActive = true;
			this.activeModal = 'login';
		},
		openRegisterModal() {
			this.isModalActive = true;
			this.activeModal = 'register';
		},
		async loginUser(user) {
			const response = await UserHandler.loginUser(user.email, user.password);

			sessionStorage.setItem('authtoken', response.data);

			if (response.status == 202) {
				window.location.href = "/";
			}
			else {
				//this.info = response.data;
			}
		},
		async registerUser(user) {
			if (user.password === user.confirmpassword) {
				const response = await UserHandler.registerUser(user.email, user.password);
				//this.info = response.data;

				if (response.status == 201) {
					this.user.password = '';
					this.user.confirmpassword = '';
					this.activeModal = 'login';
				}
			} else {
				//this.info = "Passwords don't match";
			}
		},
		logout() {
			sessionStorage.removeItem('authtoken');
			window.location.href = '/';
		},
		home() {
			window.location.href = '/';
		},
		closeModal() {
			this.user = {
				email: '',
				password: '',
				confirmpassword: '',
			};
			this.isModalActive = false;
		}
	},
}
</script>

<style scoped>
.header-wrapper {
	width: 60rem;
	height: 100px;
	margin: 20px auto 20px auto;
	background-color: #C4C4C4;
	border-radius: 50px;
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;
}

/* .theme-selector {
	Fill in later
} */

.title {
	display: flex;
	align-items: center;
	justify-content: center;
}

.title a {
	font-size: 2.25em;
	text-decoration: none;
	color: #000000;
	font-weight: 700;
}

.links {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.links a {
	margin: 0.1em 0;
	font-size: 0.95em;
	text-decoration: none;
	color: #000000;
	font-weight: 500;
}
</style>