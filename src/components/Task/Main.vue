<template>
	<div v-if="authtoken">
		<Modal v-if="activeModal == 'task' && isModalActive" 
			:modalTemplate="activeModal"
			:title="`Task - ${selectedCategory}`"
			:notice="modalNotice"
			:task="task"
			@createTask="createTask($event)"
			@closeModal="closeModal()" />

		<Modal v-if="activeModal == 'category' && isModalActive" 
			:modalTemplate="activeModal" 
			:title="'Add Cateogry'"
			:notice="modalNotice"
			:category="task"
			@createCategory="createCategory($event)"
			@closeModal="closeModal()" />
		
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
			<Task 
				v-for="task in tasks"
				:key="task._id"
				:task="task" 
				@editTask="editTask($event)"
				@deleteTask="deleteTask($event)" />
		</div>
	</div>
	<div v-else>
		<h1 class="notice">Please login to use website</h1>
	</div>
</template>

<script>
import TaskHandler from '../../TaskHandler'
import Modal from '../Modal'
import Task from './Task'

export default {
	name: 'Tasks',
	components: {
		Modal,
		Task,
	},
	data() {
		return {
			categories: {},
			selectedCategory: '',
			tasks: [],
			task: {
				text: '',
				dueDate: '',
				timeToComplete: '',
			},
			authtoken: '',
			isModalActive: false,
			activeModal: 'task',
			modalNotice: '',
			editingTask: null,
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
		async createCategory(text) {
			await TaskHandler.insertCategory(text, this.authtoken);
			this.categories = await TaskHandler.getCategories(this.authtoken);

			this.isModalActive = false
			this.activeModal = 'task';
			this.task.text = '';
		},
		async deleteCategory() {
			await TaskHandler.deleteCategory(this.selectedCategory, this.authtoken);

			this.categories = await TaskHandler.getCategories(this.authtoken);
			this.tasks = this.categories[Object.keys(this.categories)[0]];
			this.selectedCategory = Object.keys(this.categories)[0];
		},
		async createTask(task) {

			if (this.editingTask) {
				await this.deleteTask(this.editingTask);
				this.editingTask = null;
			}
			const response = await TaskHandler.insertTask(
				this.selectedCategory, task.text, task.dueDate, task.timeToComplete, this.authtoken);

			if (response.data) {
				this.modalNotice = response.data;
			} else {
				this.categories = await TaskHandler.getCategories(this.authtoken);
				this.tasks = this.categories[this.selectedCategory];
				this.task.text = '';
				this.task.dueDate = '';
				this.task.timeToComplete = '';
				this.isModalActive = false;
			}
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
			this.task.text = task.text;
			this.task.dueDate = task.dueDate;
			this.task.timeToComplete = task.timeToComplete;

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
			this.task = {
				text: '',
				dueDate: '',
				timeToComplete: '',
			};
			this.modalNotice = null;
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
</style>