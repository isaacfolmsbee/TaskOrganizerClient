<template>
	<div id="app" :class="{ light: lightTheme }">
		<Header 
			:lightTheme="lightTheme" 
			@changeTheme="lightTheme = !lightTheme" />
		<!-- <Notice /> -->
		<div class="body-wrapper">
			<Tasks />
		</div>
	</div>
</template>

<script>
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
			lightTheme: false,
		}
	},
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
	--dark-red: #992222;
	--light-red: #c33737;
	--text: #000000;
	--text-offset: #494949;
	--text-secondary: #222222;
	--border-color: #000000;
}

.body-wrapper {
	width: 55rem;
	max-height: 32rem;
	flex: 1;
	margin: 0 auto;
	border-radius: 30px;
	background-color: var(--background-secondary);
}
</style>
