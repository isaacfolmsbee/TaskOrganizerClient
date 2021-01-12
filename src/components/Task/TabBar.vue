<template>
	<div class="task-tab-wrapper">
		<div class="task-tab">
			<div class="category"
				v-for="(category, name) in categories"
				:key="name"
				:class="{ selected: isSelected(name) }">

				<h1 @click="$emit('setTasks', name)">
					{{ name }}
				</h1>
				<h1 
					v-if="name == selectedCategory"
					@click="$emit('deleteCategory')"
					style="margin-left: 0.4rem; color: var(--light-red)">
					-
				</h1>
			</div>
		</div>
		<div class="category">
			<h1 v-if="selectedCategory" @click="$emit('openCategoryModal')">+</h1>
			<h1 v-else @click="$emit('openCategoryModal')">+ Add Category</h1>
		</div>
	</div>
</template>

<script>
export default {
	name: "TabBar",
	props: {
		categories: {
			type: Object,
			required: true,
		},
		selectedCategory: {
			type: String,
			required: true,
		}
	},
	methods: {
		isSelected(name) {
			return name == this.selectedCategory;
		},
	},
}
</script>

<style scoped>
.task-tab-wrapper {
	width: fit-content;
	max-width: 92%;
	height: 3rem;
	display: flex;
	align-items: center;
	margin: 0 auto;
	flex-wrap: nowrap;
}

.task-tab {
	display: flex;
	overflow: auto;
	white-space: nowrap;
	transition: 450ms;
}

/* Firefox scroll-bar */
.task-tab {
	scrollbar-color: var(--background) var(--background-secondary-offset);
	scrollbar-width: thin;
}

/* Chrome, Edge, and Safari scroll-bar */
.task-tab::-webkit-scrollbar {
	height: 0.35rem;
}

.task-tab::-webkit-scrollbar-track {
	background: var(--background-secondary-offset);
	border-radius: 5px;
}

.task-tab::-webkit-scrollbar-thumb {
	background-color: var(--background);
	border-radius: 5px;
}

.category {
	/* width: fit-content; */
	font-size: 0.65em;
	padding: 0.225rem 0.5rem;
	border-radius: 15px;
	margin: 0 0.25rem;
	margin-bottom: 0.15rem;
	background-color: var(--background-secondary-offset);
}

.category h1 {
	display: inline-block;
	cursor: pointer;
	color: var(--text-secondary);
}

.task-tab .category.selected h1 {
	color: var(--text);
}

@media screen and (max-width: 740px) {
	.task-tab-wrapper {
		height: 1.7rem;
		font-size: 0.3rem;
	}

	.category {
		padding: 0.15rem 0.3rem;
		border-radius: 8px;
		margin: 0 0.1rem;
		margin-bottom: 0.15rem;
	}

	.task-tab::-webkit-scrollbar {
		height: 0.2rem;
	}
}
</style>