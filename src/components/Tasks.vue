<template>
	<div v-if="authtoken">
		<div class="task-tab">
			<div class="category"
				v-for="(category, name) in categories"
				:key="name"
				:class="{ selected: isSelected(name) }">

				<h1 @click="setTasks(name)">
					{{ name }}
				</h1>
				<h1 
					v-if="name == selectedCategory"
					@click="deleteCategory()"
					style="margin-left: 0.4rem; color: #c33737">
					-
				</h1>
			</div>
			<div class="category">
				<h1 @click="openCategoryModal()">+</h1>
			</div>
		</div>

		<div class="add-task">
			<hr>
				<h4 @click="isModalActive = true">Add Task</h4>
			<hr>
		</div>

		<div class="task-list">
			<div class="task-wrapper"
				v-for="task in tasks"
				:key="task._id"
				:class="{ deleted: task.isDeleted }"
			>
				<div class="task-datetime">
					<p>Due: {{ task.dueDate }}</p>
					<p>{{ task.timeToComplete }}</p>
				</div>
				<div class="task-desc">
					<h1>{{ task.text }}</h1>
				</div>
				<div class="task-buttons">
					<h4 @click="editTask(task)">Edit</h4>
					<h4 @click="deleteTask(task)">Delete</h4>
				</div>
			</div>
		</div>
		<div class="modal-bg"
			:class="{ active: isModalActive }">
			<div class="task-modal"
				v-if="activeModal == 'task'">
				<span class="modal-close"
					@click="closeModal()">X</span>
				<h3>Add Task - {{ selectedCategory }}</h3>
				<input type="text" v-model="text" placeholder="Task Name...">
				<input type="text" v-model="dueDate" placeholder="Date...">
				<input type="text" v-model="timeToComplete" placeholder="Time...">
				<button @click="createTask()">Submit Task</button>
			</div>
			<div v-else
				class="category-modal">
				<span class="modal-close"
					@click="closeModal()">X</span>
				<h3>Add Category</h3>
				<input type="text" v-model="text" placeholder="Category Name...">
				<button @click="createCategory()">Submit Category</button>
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
			categories: {},
			selectedCategory: '',
			tasks: [],
			text: '',
			dueDate: '',
			timeToComplete: '',
			authtoken: '',
			isModalActive: false,
			activeModal: 'task',
			editingTask: null
		}
	},
	async created() {
		this.authtoken = sessionStorage.getItem('authtoken');
		this.categories = await TaskHandler.getCategories(this.authtoken);

		//set this.tasks to the first category of tasks in categories
		this.tasks = this.categories[Object.keys(this.categories)[0]];
		this.selectedCategory = Object.keys(this.categories)[0];
	},
	methods: {
		setTasks(category) {
			this.tasks = this.categories[category];
			this.selectedCategory = category;
		},
		async createCategory() {
			await TaskHandler.insertCategory(this.text, this.authtoken);
			this.categories = await TaskHandler.getCategories(this.authtoken);

			this.isModalActive = false
			this.activeModal = 'task';
			this.text = '';
		},
		async deleteCategory() {
			await TaskHandler.deleteCategory(this.selectedCategory, this.authtoken);

			this.categories = await TaskHandler.getCategories(this.authtoken);
			this.tasks = this.categories[Object.keys(this.categories)[0]];
			this.selectedCategory = Object.keys(this.categories)[0];
		},
		async createTask() {

			if (this.editingTask) {
				await this.deleteTask(this.editingTask);
				this.editingTask = null;
			}
			await TaskHandler.insertTask(
				this.selectedCategory, this.text, this.dueDate, this.timeToComplete, this.authtoken);

			this.categories = await TaskHandler.getCategories(this.authtoken);
			this.tasks = this.categories[this.selectedCategory];
			this.text = '';
			this.dueDate = '';
			this.timeToComplete = '';
			this.isModalActive = false;
		},
		async deleteTask(task) {
			if (!this.editingTask) {
				task.isDeleted = true;
				await new Promise(r => setTimeout(r, 350));
			}

			await TaskHandler.deleteTask(this.selectedCategory, task._id, this.authtoken);
			this.categories = await TaskHandler.getCategories(this.authtoken);
			this.tasks = this.categories[this.selectedCategory];
		},
		async editTask(task) {
			this.editingTask = task;
			this.text = task.text;
			this.dueDate = task.dueDate;
			this.timeToComplete = task.timeToComplete;

			this.isModalActive = true;
		},
		isSelected(name) {
			return name == this.selectedCategory;
		},
		openCategoryModal() {
			this.isModalActive = true;
			this.activeModal = 'category';
		},
		closeModal() {
			this.isModalActive = false;
			this.activeModal = 'task';
			this.editingTask = null;
			this.text = '';
			this.dueDate = '';
			this.timeToComplete = '';
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

.task-tab div.category {
	padding: 0.225rem 0.5rem;
	border-radius: 50px;
	margin: 0 0.25rem;
	background-color: #6C6C6C;
}

.task-tab div.category h1 {
	display: inline-block;
	cursor: pointer;
}

.task-tab div.selected {
	color: #f8f8f8;
}

/* Add Task CSS */

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

/* Task CSS */

.task-list {
	width: 92.5%;
	height: 28.46rem;
	overflow: auto;
	margin: 0.25rem auto;
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
}

/* Modal CSS */
.modal-bg {
	position: fixed;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.45);
	display: flex;
	justify-content: center;
	align-items: center;
	visibility: hidden;
	opacity: 0;
	transition: visibility 0s, opacity 450ms;
}

.modal-bg.active {
	visibility: visible;
	opacity: 1;
}

.task-modal {
	position: relative;
	width: 20rem;
	height: 15rem;
	background-color: #ffffff;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
}

.category-modal {
	position: relative;
	width: 18rem;
	height: 10rem;
	background-color: #ffffff;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
}

.modal-close {
	position: absolute;
	top: 0.25rem;
	right: 0.25rem;
	cursor: pointer;
}

.modal button {
	padding: 0.25rem 0.4rem;
	background-color: #C4C4C4;
	border: none;
	border-radius: 25px;
	font-family: 'Rubik', sans-serif;
	cursor: pointer;
}
</style>