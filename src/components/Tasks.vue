<template>
	<div v-if="this.authtoken">
		<div class="task-tab">
			<h1>Dev</h1>
			<h1>Homework</h1>
			<h1>+</h1>
		</div>

		<hr>

		<div class="task-list">
			<div class="task-wrapper"
				v-for="task in tasks"
				:key="task._id"
			>
				<div class="task-datetime">
					<p>Due: {{ task.dueDate }}</p>
					<p>{{ task.timeToComplete }}</p>
				</div>
				<div class="task-desc">
					<h1>{{ task.text }}</h1>
				</div>
				<div class="task-buttons">
					<h4 @click="deleteTask(task)">Edit</h4>
					<h4>Delete</h4>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
		<h1 class="notice">Please login to use website</h1>
	</div>
</template>

<script>
import TaskHandler from '../TaskHandler'

export default {
	name: 'Tasks',
	data() {
		return {
			tasks: [],
			text: '',
			dueDate: '',
			timeToComplete: '',
			authtoken: ''
		}
	},
	async created() {
		this.authtoken = sessionStorage.getItem('authtoken');
		this.tasks = await TaskHandler.getTasks(this.authtoken);
	},
	methods: {
		async createTask() {
			await TaskHandler.insertTask(this.text, this.dueDate, this.timeToComplete, this.authtoken);
			this.tasks = await TaskHandler.getTasks(this.authtoken);
			this.text = '';
			this.dueDate = '';
			this.timeToComplete = '';
		},
		async deleteTask(task) {
			task.isDeleted = true;

			await new Promise(r => setTimeout(r, 350));

			await TaskHandler.deleteTask(task._id, this.authtoken);
			this.tasks = await TaskHandler.getTasks(this.authtoken);
		},
		async editTask(task) {
			this.text = task.text;
			this.dueDate = task.dueDate;
			this.timeToComplete = task.timeToComplete;

			await this.deleteTask(task);
		}
	},
}
</script>

<style scoped>
.task-tab {
	width: 87.5%;
	height: 2.5rem;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.65em;
}

.task-tab h1 {
	padding: 0.225rem 0.5rem;
	border-radius: 50px;
	margin: 0 0.25rem;
	background-color: #6C6C6C;
}

.body-wrapper hr {
	margin: 0 auto;
	width: 92.5%;
	background-color: #6C6C6C;
	border: 1.5px solid #6C6C6C;
	border-radius: 10px;
}

/* Task CSS */

.task-list {
	width: 92.5%;
	height: 28.3rem;
	overflow: auto;
	margin: 0.1rem auto;
}

/* Firefox scroll-bar */
.task-list {
	scrollbar-width: 0.5rem;
	scrollbar-color: #000000 #6C6C6C;
}

/* Chrome, Edge, and Safari scroll-bar */
.task-list::-webkit-scrollbar {
	width: 0.375rem;
}

.task-list::-webkit-scrollbar-track {
	background: #6C6C6C;
	border-radius: 15px;
}

.task-list::-webkit-scrollbar-thumb {
	background-color: #C4C4C4;
	border-radius: 15px;
	border: 3px solid #6C6C6C;
}

.task-wrapper {
	width: 87.5%;
	height: 4rem;
	border-radius: 50px;
	margin: 0.35rem auto 0 auto;
	display: grid;
	grid-template-columns: 9fr 1fr;
	grid-template-rows: 1fr 3fr;
	background-color: #6C6C6C;
	
}

.task-wrapper:last-child {
	margin-bottom: 0.35rem;
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
}
</style>