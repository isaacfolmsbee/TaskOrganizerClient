<template>
	<div class="notice-wrapper">
		<h1>Test Notice</h1>
	</div>
</template>
<script>
export default {
	name: "Notice"
}
</script>
<style scoped>
.notice-wrapper {
	width: 55rem;
	height: 2rem;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.35em;
}

.notice-wrapper h1 {
	padding: 0.225rem 0.325rem;
	border-radius: 50px;
	background-color: #c33737;
}
</style>