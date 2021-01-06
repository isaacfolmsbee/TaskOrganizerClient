<template>
	<div class="modal-bg">

		<div class="modal-body">
			<h3 id="title">{{ localTitle }}</h3>
			<span id="modal-close"
				@click="$emit('closeModal')">X</span>

			<p id="notice" 
				v-if="notice">
				
				{{ notice }}
			</p>
			<template v-if="localModalTemplate === 'login' || localModalTemplate === 'register'">
				<input type="email" v-model="user.email" placeholder="Email...">
				<input type="password" v-model="user.password" placeholder="Password...">
				<input v-if="localModalTemplate === 'register'" 
					type="password" 
					v-model="user.confirmPassword" 
					placeholder="Confirm Password...">
				
				<button v-if="localModalTemplate === 'login'" 
					@click="loginUser()">Login</button>
				
				<button v-if="localModalTemplate === 'register'" 
					@click="registerUser()">Register</button>
			</template>
			<template v-else-if="localModalTemplate === 'task'">
				<input type="text" v-model="localTask.text" placeholder="Task Description...">
				<div class="dateField">
					<input type="text" v-model="date.year" placeholder="YYYY">
					<input type="text" v-model="date.month" placeholder="MM">
					<input type="text" v-model="date.day" placeholder="DD">
				</div>
				<div class="timeSelector">
					<input type="text" v-model="localTimeToComplete" placeholder="Time...">
					<select v-model="timeFormat">
						<option value="minutes">Minutes</option>
						<option value="hours">Hours</option>
					</select>
				</div>
				<button @click="$emit('createTask', localTask)">Submit Task</button>
			</template>
			<template v-else-if="localModalTemplate === 'category'">
				<input type="text" v-model="category" placeholder="Category Name...">
				<button @click="$emit('createCategory', category)">Submit Category</button>
			</template>
		</div>
	</div>
</template>
<script>
import UserHandler from '../UserHandler';

export default {
	name: "Modal",
	props: {
		title:{
			type: String,
			required: true,
		},
		modalTemplate: {
			type: String,
			required: true,
		},
		notice: {
			type: String,
			required: false,
		},
		task: {
			type: Object,
			required: false,
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
			}
		}
	},
	data() {
		return {
			localTitle: this.title,
			localNotice: this.notice,
			localModalTemplate: this.modalTemplate,
			user: {
				email: '',
				password: '',
				confirmPassword: '',
			},
			localTask: {
				text: this.task?.text,
				dueDate: '',
				timeToComplete: 0,
			},
			date: {
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				day: new Date().getDate(),
			},
			localTimeToComplete: null,
			timeFormat: 'hours',
			category: '',
		}
	},
	created() {
		this.localTask.dueDate = new Date(this.date.year, this.date.month - 1, this.date.day);

		if (this.task?.timeToComplete) {
			if (this.task.timeToComplete % 60 === 0) {
				this.localTimeToComplete = this.task.timeToComplete / 60;
			} else {
				this.localTimeToComplete = this.task.timeToComplete;
				this.timeFormat = 'minutes';
			}
		}
		if (this.task?.dueDate) {
			this.date = {
				year: new Date(this.task.dueDate).getFullYear(),
				month: new Date(this.task.dueDate).getMonth() + 1,
				day: new Date(this.task.dueDate).getDate(),
			};
		}
	},
	watch: {
		localTimeToComplete: function() {
			this.localTask.timeToComplete = this.timeFormat === 'hours' ?
				this.localTimeToComplete * 60:
				+this.localTimeToComplete;
		},
		timeFormat: function() {
			this.localTask.timeToComplete = this.timeFormat === 'hours' ?
				this.localTimeToComplete * 60:
				+this.localTimeToComplete;
		},
		date: {
			handler() {
				this.localTask.dueDate = new Date(this.date.year, this.date.month - 1, this.date.day);
			},
			deep: true,
		}
	},
	methods: {
		async loginUser() {
			const response = await UserHandler.loginUser(this.user.email, this.user.password);

			if (response.status == 202) {
				sessionStorage.setItem('authtoken', response.data);
				window.location.href = "/";
			}
			else {
				this.user.password = '';
				this.notice = response.data;
			}
		},
		async registerUser() {
			if (this.user.password == this.user.confirmPassword) {
				const response = await UserHandler.registerUser(this.user.email, this.user.password);

				if (response.status == 201) {
					this.notice = '';
					this.user.password = '';
					this.user.confirmPassword = '';
					this.localTitle = 'Login'
					this.localModalTemplate = 'login';
				} else {
					this.notice = response.data;
				}
			} else {
				this.notice = "passwords don't match";
			}
		},
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
	opacity: 0;
	animation: fadeAnimation 450ms ease 0s forwards;
}
@keyframes fadeAnimation {
	to {
		opacity: 1;
	}
}
@-webkit-keyframes fadeAnimation {
	to {
		opacity: 1;
	}
}

.modal-body {
	position: relative;
	width: fit-content;
	margin: 17.5vh auto 0 auto;
	padding: 0 1.5rem;
	height: fit-content;
	background-color: #ffffff;
	border-radius: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.modal-body #title {
	margin: 0.5rem;
}

#modal-close {
	position: absolute;
	top: 0.45rem;
	right: 0.55rem;
	cursor: pointer;
	transition: color 400ms;
}

#modal-close:hover {
	color: #992222;
}

.modal-body #notice {
	text-align: center;
	width: fit-content;
	max-width: 85%;
	font-size: 0.6rem;
	padding: 0.225rem 0.325rem;
	margin: -0.2rem 0;
	border-radius: 15px;
	background-color: #c33737;
}

.modal-body input {
	width: 10rem;
	height: 1.5rem;
	margin-top: 0.75rem;
}

.modal-body button {
	padding: 0.35rem 0.45rem;
	margin: 0.5rem 0;
	background-color: #C4C4C4;
	border: none;
	border-radius: 25px;
	font-family: 'Rubik', sans-serif;
	cursor: pointer;
}

.modal-body .timeSelector {
	display: inline;
}

.modal-body .timeSelector input {
	width: 6rem;
}

.modal-body .timeSelector select {
	height: 1.5rem;
	width: 4rem;
}

</style>