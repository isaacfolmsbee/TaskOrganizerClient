import axios from 'axios';

const url = 'api/user/';

class UserHandler {
	// Register User
	static async registerUser(email, password) {
		try {
			const response = await axios.post(url + 'register', {
				email,
				password,
			});

			return response;
		} catch (error) {
			return error.response;
		}
	}

	static async loginUser(email, password) {
		try {
			const response = await axios.post(url + 'login', {
				email,
				password,
			});

			return response;
		} catch (error) {
			return error.response;
		}
	}

	static async getTheme(jwt) {
		return await axios.get(url + 'theme', {
			headers: {
				authtoken: jwt,
			},
		});
	}

	static async setTheme(lightTheme, jwt) {
		return await axios.post(
			url + 'theme',
			{
				lightTheme,
			},
			{
				headers: {
					authtoken: jwt,
				},
			}
		);
	}
}

export default UserHandler;
