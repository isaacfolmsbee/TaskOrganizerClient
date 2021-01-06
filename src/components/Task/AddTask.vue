<template>
	<div class="add-task">
		<hr>
			<h4 @click="$emit('addTask')">Add Task</h4>
		<hr>
	</div>
</template>

<script>
export default {
	name: "AddTask",
}
</script>

<style scoped>
.add-task {
	width: 100%;
	height: 0.75rem;
	display: flex;
	justify-content: center;
	align-items: center;
}

.add-task h4 {
	padding: 0.1rem 0.2rem;
	font-size: 0.65rem;
	background-color: #6C6C6C;
	border-radius: 10px;
	cursor: pointer;
}

.add-task hr {
	width: 42.5%;
	height: 0.2rem;
	margin: 0 0.5rem;
	background-color: #6C6C6C;
	border: 1.5px solid #6C6C6C;
	border-radius: 10px;
}
</style>