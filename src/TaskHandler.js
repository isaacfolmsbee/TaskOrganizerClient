import axios from 'axios';

const url = 'api/tasks/';

class TaskHandler {
	// Get Tasks Organized by date than time to complete
	static getCategories(jwt) {
		return new Promise((resolve, reject) => {
			axios
				.get(url, {
					headers: {
						authtoken: jwt,
					},
				})
				.then((res) => {
					const data = res.data;

					const keys = Object.keys(data.categories);
					for (let i in keys) {
						for (
							let index = 0;
							index < data.categories[keys[i]].length;
							index++
						) {
							data.categories[keys[i]][index].isDeleted = false;
						}
					}
					resolve(data.categories);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	static insertCategory(category, jwt) {
		return axios.post(
			`${url}category`,
			{
				category,
			},
			{
				headers: {
					authtoken: jwt,
				},
			}
		);
	}

	static deleteCategory(category, jwt) {
		return axios.delete(`${url}category`, {
			headers: {
				authtoken: jwt,
			},
			data: {
				category,
			},
		});
	}

	// Create Tasks
	static async insertTask(category, text, dueDate, timeToComplete, jwt) {
		return await axios.post(
			url,
			{
				category,
				text,
				dueDate,
				timeToComplete,
			},
			{
				headers: {
					authtoken: jwt,
				},
			}
		);
	}

	// Delete Tasks
	static deleteTask(category, id, jwt) {
		return axios.delete(`${url}${category}/${id}`, {
			headers: {
				authtoken: jwt,
			},
		});
	}
}

export default TaskHandler;
