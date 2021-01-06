<template>
	<div id="app">
		<Header />
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
	}
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
}

:root {
	background-color: #ffffff;
	font-size: 24px;
	font-family: 'Rubik', sans-serif;
}

body {
	margin: 0;
	min-height: 100vh;
	
	display: flex;
	flex-direction: column;
}

.body-wrapper {
	width: 55rem;
	height: 32rem;
	flex: 1;
	margin: 0 auto;
	border-radius: 30px;
	background-color: #C4C4C4;
}
</style>
