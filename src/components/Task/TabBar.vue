<template>
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
.task-tab {
	width: 87.5%;
	height: 2.5rem;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 0.65em;
	transition: 450ms;
}

.task-tab .category {
	padding: 0.225rem 0.5rem;
	border-radius: 15px;
	margin: 0 0.25rem;
	background-color: var(--background-secondary-offset);
}

.task-tab .category h1 {
	display: inline-block;
	cursor: pointer;
	color: var(--text-secondary);
}

.task-tab .category.selected h1 {
	color: var(--text);
}
</style>