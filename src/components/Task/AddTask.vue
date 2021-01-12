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
	min-width: 3rem;
	padding: 0.1rem 0.2rem;
	font-size: 0.65rem;
	background-color: var(--background-secondary-offset);
	border-radius: 10px;
	cursor: pointer;
}

.add-task hr {
	width: 42.5%;
	height: 0.2rem;
	margin: 0 0.5rem;
	background-color: var(--background-secondary-offset);
	border: 1.5px solid var(--background-secondary-offset);
	border-radius: 10px;
}

@media screen and (max-width: 740px) {
	.add-task {
		height: 0.5rem;
	}

	.add-task h4 {
		min-width: fit-content;
		padding: 0.1rem 0.175rem;
		font-size: 0.5rem;
		border-radius: 8px;
	}

	.add-task hr {
		width: 42.5%;
		height: 0.125rem;
		margin: 0 0.35rem;
		border-radius: 6px;
	}
}
</style>