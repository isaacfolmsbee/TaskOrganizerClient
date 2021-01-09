<template>
	<div class="header-wrapper">
		<Modal 
			v-if="modal.isActive" 
			:modalTemplate="modal.activeModal"
			:title="modal.title"
			@closeModal="closeModal()" />
		<div class="theme-selector">
			<img src="moon.svg" alt="Moon icon for website theme selection"
				:class="{ white: lightTheme }"
				@click="$emit('changeTheme')" >
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
import Modal from './Modal'

export default {
	name: "Header",
	components: {
		Modal,
	},
	props: {
		lightTheme: {
			type: Boolean,
			required: true,
		}
	},
	data() {
		return {
			user: {
				email: '',
				password: '',
				confirmpassword: '',
			},
			modal: {
				isActive: false,
				activeModal: 'login',
				title: 'Login',
			},
			authtoken: '',
		}
	},
	created() {
		this.authtoken = sessionStorage.getItem('authtoken');
	},
	methods: {
		openLoginModal() {
			this.modal.title = 'Login';
			this.modal.activeModal = 'login';
			this.modal.isActive = true;
		},
		openRegisterModal() {
			this.modal.title = 'Register';
			this.modal.activeModal = 'register';
			this.modal.isActive = true;
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
			this.modal.isActive = false;
		}
	},
}
</script>

<style scoped>
.header-wrapper {
	width: 60rem;
	height: 100px;
	margin: 20px auto 20px auto;
	background-color: var(--background-secondary);
	border-radius: 25px;
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;
}

.theme-selector {
	display: flex;
	justify-content: center;
	align-items: center;
}

.theme-selector img {
	width: 1.45rem;
	height: 1.45rem;
	cursor: pointer;
	transition: 400ms;
}

.white {
	filter: invert(100%);
}

.title {
	display: flex;
	align-items: center;
	justify-content: center;
}

.title a {
	font-size: 2.25em;
	text-decoration: none;
	color: var(--text);
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
	padding: 0.15rem 0.25rem;
	border-radius: 10px;
	font-size: 0.95em;
	text-decoration: none;
	color: var(--text);
	font-weight: 500;
	cursor: pointer;
	transition: 400ms;
}

.links a:hover {
	background-color: var(--background-tertiary);
}
</style>