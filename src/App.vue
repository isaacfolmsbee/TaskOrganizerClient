<template>
	<div id="app" :class="{ light: lightTheme }">
		<Header 
			:lightTheme="lightTheme" 
			@changeTheme="changeTheme()" />
		<!-- <Notice /> -->
		<div class="body-wrapper">
			<Tasks />
		</div>
	</div>
</template>

<script>
import UserHandler from './UserHandler';
import Header from './components/Header';
import Tasks from './components/Task/Main';
// import Notice from './components/Notice.vue'

export default {
	name: 'App',
	components: {
		Header,
		Tasks,
		// Notice
	},
	data() {
		return {
			lightTheme: true,
			authtoken: '',
		}
	},
	async created() {
		this.authtoken = sessionStorage.getItem('authtoken');

		if (this.authtoken) {
			const response = await UserHandler.getTheme(this.authtoken);
			this.lightTheme = response.data;	
		}
	},
	methods: {
		async changeTheme() {
			this.lightTheme = !this.lightTheme;

			await UserHandler.setTheme(this.lightTheme, this.authtoken);
		},
	}
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
}

:root {
	font-size: 24px;
}

#app {
	--background: #111111;
	--background-offset: #202020;
	--background-secondary: #3b3b3b;
	--background-secondary-offset: #696969;
	--dark-red: #992222;
	--light-red: #c33737;
	--text: #dadada;
	--text-offset: #5d5d5d;
	--text-secondary: #222222;
	--text-secondary-offset: #000000;
	--border-color: #000000;

	margin: 0;
	height: 100vh;
	
	display: flex;
	flex-direction: column;

	background-color: var(--background);
	font-family: 'Rubik', sans-serif;
}

#app.light {
	--background: #ffffff;
	--background-offset: #dfdfdf;
	--background-secondary: #C4C4C4;
	--background-secondary-offset: #6C6C6C;
	/* --dark-red: #992222;
	--light-red: #c33737; */
	--text: #000000;
	--text-offset: #494949;
	--text-secondary: #222222;
	/* --border-color: #000000; */
}

.body-wrapper {
	position: absolute;
	top: 6rem;
	left: 0;
	right: 0;
	bottom: 0;
	width: 55rem;
	margin: 0 auto 1rem auto;
	border-radius: 30px;
	background-color: var(--background-secondary);
}

@media screen and (max-width: 1450px) {
	.body-wrapper {
		top: 4.3rem;
		width: 92vw;
	}
}

@media screen and (max-width: 740px) {
	.body-wrapper {
		top: 3.6rem;
	}
}
</style>
