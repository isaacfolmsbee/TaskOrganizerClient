<template>
	<div class="header">
		<div class="theme-picker">
			<p>testing tag</p>
		</div>
		<a class="header-title" href="/">Task Organizer</a>
		<div class="links" v-if="!this.authtoken">
			<a href="/register">register</a>
			<a href="/login" >login</a>
		</div>
		<div class="links" v-else>
			<a @click="logout()">logout</a>
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
@import url('https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@700&display=swap');

.header {
	width: 85%;
	height: 100px;
	background-color: #C4C4C4;
	margin: 20px auto 0 auto;
	border-radius: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.header-title {
	color: #000000;
	text-decoration: none;
	font-family: 'Ubuntu Mono', monospace;
	font-size: 64px;
}

.links {
	font-family: 'Ubuntu Mono', monospace;
	font-size: 24px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	padding-left: 50%;
}

.links a {
	text-decoration: none;
	color: #000000;
}
</style>