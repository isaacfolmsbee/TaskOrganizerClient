<template>
	<div v-if="authtoken">
		<Modal v-if="modal.activeModal == 'task' && modal.isActive" 
			:modalTemplate="modal.activeModal"
			:title="`Task - ${selectedCategory}`"
			:notice="modal.notice"
			:task="task"
			@createTask="createTask($event)"
			@closeModal="closeModal()" />

		<Modal v-if="modal.activeModal == 'category' && modal.isActive" 
			:modalTemplate="modal.activeModal" 
			:title="'Add Cateogry'"
			:notice="modal.notice"
			:category="task"
			@createCategory="createCategory($event)"
			@closeModal="closeModal()" />
		
		<TabBar 
			:categories="categories"
			:selectedCategory="selectedCategory"
			@setTasks="setTasks($event)"
			@deleteCategory="deleteCategory()"
			@openCategoryModal="openCategoryModal()" />

		<AddTask v-if="selectedCategory"
			@addTask="openTaskModal()"/>

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
import TaskHandler from '../../TaskHandler';
import Modal from '../Modal';
import TabBar from './TabBar';
import AddTask from './AddTask';
import Task from './Task';

export default {
	name: 'Tasks',
	components: {
		Modal,
		TabBar,
		AddTask,
		Task,
	},
	data() {
		return {
			categories: {},
			selectedCategory: '',
			tasks: [],
			editingTask: null,
			task: {
				text: '',
				dueDate: '',
				timeToComplete: '',
			},
			modal: {
				isActive: false,
				activeModal: '',
				notice: '',
			},
			authtoken: '',
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

			if (!this.selectedCategory) {
				this.selectedCategory = Object.keys(this.categories)[0];
			}

			this.modal.isActive = false
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
				this.modal.notice = response.data;
			} else {
				this.categories = await TaskHandler.getCategories(this.authtoken);
				this.tasks = this.categories[this.selectedCategory];
				this.task = {
					text: '',
					dueDate: '',
					timeToComplete: '',
				};
				this.modal.isActive = false;
			}
		},
		async deleteTask(task) {
			await TaskHandler.deleteTask(this.selectedCategory, task._id, this.authtoken);

			if (!this.editingTask) {
				task.isDeleted = true;
				await new Promise(r => setTimeout(r, 350));
			}
			
			this.categories = await TaskHandler.getCategories(this.authtoken);
			this.tasks = this.categories[this.selectedCategory];
		},
		async editTask(task) {
			this.editingTask = task;
			this.task = task;

			this.modal.isActive = true;
		},
		openTaskModal() {
			this.modal.activeModal = 'task';
			this.modal.isActive = true;
		},
		openCategoryModal() {
			this.modal.activeModal = 'category';
			this.modal.isActive = true;
		},
		closeModal() {
			this.modal.isActive = false;
			this.editingTask = null;
			this.task = {
				text: '',
				dueDate: '',
				timeToComplete: '',
			};
			this.modal.notice = null;
		}
	},
}
</script>

<style scoped>
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