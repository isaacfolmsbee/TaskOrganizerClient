<template>
	<div class="task-wrapper"
		:class="{ deleted: task.isDeleted }">

		<div class="task-datetime">
			<p>Due: {{ task.dueDate }}</p>
			<p>{{ task.timeToComplete }}</p>
		</div>
		<div class="task-desc">
			<h1>{{ task.text }}</h1>
		</div>
		<div class="task-buttons">
			<h4 @click="$emit('editTask', task)">Edit</h4>
			<h4 @click="$emit('deleteTask', task)">Delete</h4>
		</div>
	</div>
</template>
<script>
export default {
	name: "Task",
	props: {
		task: {
			type: Object,
			required: true,
			_id: {
				type: String,
				required: false,
			},
			isDeleted: {
				type: Boolean,
				required: false,
			},
			text: {
				type: String,
				required: true,
			},
			dueDate: {
				type: String,
				required: true,
			},
			timeToComplete: {
				type: String,
				required: true,
			},
		},
	}
}
</script>
<style scoped>
.task-wrapper {
	width: 87.5%;
	height: 4rem;
	border-radius: 50px;
	margin: 0.35rem auto 0 auto;
	display: grid;
	grid-template-columns: 9fr 1fr;
	grid-template-rows: 1fr 3fr;
	background-color: #6C6C6C;
	cursor: default;
	
}

.task-wrapper:last-child {
	margin-bottom: 0.35rem;
}

.task-wrapper.deleted {
	background-color: #c33737;
	transition: 350ms;
}

.task-datetime {
	grid-column: 1/2;
	display: flex;

	/* To center based on task-wrapper */
	margin-left: 12.5%;
}

.task-datetime p {
	display: inline;
	width: 50%;
}

.task-datetime p:first-child {
	text-align: right;
	margin-right: 0.75rem;
}

.task-datetime p:last-child {
	margin-left: 0.75rem;
}

.task-desc {
	grid-column: 1/2;
	grid-row: 2/3;
	margin-left: 1.25rem;
	text-align: center;
}

.task-desc h1 {
	font-size: 1.15rem;
}

.task-buttons {
	/* Unneeded? */
	grid-column: 2/3;
	grid-row: 1/3;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0.5rem 0;
	/*  */
}

.task-buttons h4 {
	margin: auto 0;
	cursor: pointer;
}
</style>