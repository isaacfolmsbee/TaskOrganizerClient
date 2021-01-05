<template>
	<div class="modal-bg"
		:class="{ active: isActive }">

		<div class="modal-body">
			<div v-if="activeModal == 'task'">
				<span class="modal-close"
					@click="$emit('closeModal')">X</span>
				<h3>Add Task - {{ category }}</h3>
				<input type="text" v-model="task.text" placeholder="Task Name...">
				<input type="text" v-model="task.dueDate" placeholder="Date...">
				<input type="text" v-model="task.timeToComplete" placeholder="Time...">
				<button @click="$emit('createTask', task)">Submit Task</button>
			</div>
			<div v-else-if="activeModal == 'category'">
				<span class="modal-close"
					@click="$emit('closeModal')">X</span>
				<h3>Add Category</h3>
				<input type="text" v-model="task.text" placeholder="Category Name...">
				<button @click="$emit('createCategory', task.text)">Submit Category</button>
			</div>
			<div v-else-if="activeModal == 'login'">
				<span class="modal-close"
				@click="$emit('closeModal')">X</span>
				<h3>Login</h3>
				<input type="email" v-model="user.email" placeholder="Email...">
				<input type="password" v-model="user.password" placeholder="Password...">
				<button @click="$emit('loginUser', user)">Login</button>
			</div>
			<div v-else-if="activeModal == 'register'">
				<span class="modal-close"
				@click="$emit('closeModal')">X</span>
				<h3>Register</h3>
				<input type="email" v-model="user.email" placeholder="Email...">
				<input type="password" v-model="user.password" placeholder="Password...">
				<input type="password" v-model="user.confirmpassword" placeholder="Confirm Password...">
				<button @click="$emit('registerUser', user)">Register</button>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Modal",
	props: {
		isActive: {
			type: Boolean,
			required: true,
		},
		activeModal: {
			type: String,
			required: true,
		},
		task: {
			type: Object,
			required: false,
		},
		category: {
			type: String,
			required: false,
		},
		user: {
			type: Object,
			required: false,
		}
	}
}
</script>
<style scoped>
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

.modal-body div {
	position: relative;
	width: 18rem;
	height: 14rem;
	background-color: #ffffff;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: column;
}

.modal-close {
	position: absolute;
	top: 0.35rem;
	right: 0.35rem;
	cursor: pointer;
}

button {
	padding: 0.35rem 0.45rem;
	background-color: #C4C4C4;
	border: none;
	border-radius: 25px;
	font-family: 'Rubik', sans-serif;
	cursor: pointer;
}
</style>