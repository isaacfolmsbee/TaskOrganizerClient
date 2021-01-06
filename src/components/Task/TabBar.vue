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
				style="margin-left: 0.4rem; color: #c33737">
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
			type: Array,
			required: true,
		},
		selectedCategory: {
			type: String,
			required: true,
		}
	},
	data() {
		return {
			
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
</style>