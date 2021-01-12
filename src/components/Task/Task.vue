<template>
	<div class="task-wrapper"
		:class="{ deleted: task.isDeleted }">

		<div class="task-datetime">
			<p>Due: {{ refinedDate }}</p>
			<p>{{ refinedTime }}</p>
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
	},
	computed: {
		refinedTime() {
			//determine hours or minutes
			if (this.task.timeToComplete % 60 === 0) {
				return this.task.timeToComplete / 60 === 1 ?
					"1 hour":
					`${this.task.timeToComplete / 60} hours`;
			}
			return this.task.timeToComplete === 1 ?
				"1 minute":
				`${this.task.timeToComplete} minutes`;
		},
		refinedDate() {
			var passedDate = new Date(this.task.dueDate),
				month = '' + (passedDate.getMonth() + 1),
				day = '' + passedDate.getDate(),
				year = passedDate.getFullYear();

			if (month.length < 2) 
				month = '0' + month;
			if (day.length < 2) 
				day = '0' + day;

			return [year, month, day].join('-');
		}
	}
}
</script>
<style scoped>
.task-wrapper {
	width: 87.5%;
	height: 4rem;
	border-radius: 18px;
	margin: 0.35rem auto 0 auto;
	display: grid;
	grid-template-columns: 9fr 1fr;
	grid-template-rows: 1fr 3fr;
	background-color: var(--background-secondary-offset);
	cursor: default;
	
}

.task-wrapper:last-child {
	margin-bottom: 0.35rem;
}

.task-wrapper.deleted {
	background-color: var(--light-red);
	transition: 350ms;
}

.task-datetime {
	grid-column: 1/3;
	display: flex;
}

.task-datetime p {
	display: inline;
	width: 50%;
	color: var(--text-secondary);
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
	grid-column: 2/3;
	grid-row: 2/3;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: -1.155rem;
	margin-right: 0.5rem;
}

.task-buttons h4 {
	margin: auto 0;
	cursor: pointer;
	color: var(--text-secondary);
	transition: color 400ms;
}

.task-buttons h4:hover {
	color: var(--text-secondary-offset);
}

@media screen and (max-width: 850px) {
	.task-wrapper {
		width: 93%;
		height: 3.25rem;
		border-radius: 15px;
		margin: 0.3rem auto 0 auto;
	}

	.task-wrapper:last-child {
		margin-bottom: 0.3rem;
	}

	.task-datetime p {
		font-size: 0.55rem;
	}

	.task-datetime p:first-child {
		text-align: right;
		margin-right: 0.2rem;
	}

	.task-datetime p:last-child {
		margin-left: 0.2rem;
	}

	.task-desc h1 {
		font-size: 0.65rem;
	}

	.task-buttons {
		font-size: 0.55rem;
		margin-top: -0.6rem;
	}

	.task-buttons h4 {
		margin: 0.35rem 0;
	}
}
</style>