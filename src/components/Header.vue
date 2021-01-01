<template>
	<div class="header-wrapper">
		<div class="theme-selector">
		</div>
		<div class="title">
			<a href="/">Task Organizer</a>
		</div>
		<div class="links" v-if="!this.authtoken">
			<a href="/login">Login</a>
			<a href="/register">Register</a>
		</div>
		<div class="links" v-else>
			<a @click="logout()">Logout</a>
		</div>
	</div>
</template>

<script>
export default {
	name: "Header",
	data() {
		return {
			authtoken: '',
		}
	},
	created() {
		this.authtoken = sessionStorage.getItem('authtoken');
	},
	methods: {
		logout() {
			sessionStorage.removeItem('authtoken');
			window.location.href = '/';
		},
		home() {
			window.location.href = '/';
		}
	},
}
</script>

<style scoped>
.header-wrapper {
	width: 60rem;
	height: 100px;
	margin: 20px auto 0 auto;
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