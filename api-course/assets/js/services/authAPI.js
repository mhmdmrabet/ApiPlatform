import axios from 'axios';
import jwtDecode from 'jwt-decode';

function logout() {
	window.localStorage.removeItem('authToken');
	delete axios.defaults.headers['Authorization'];
}

function authenticate(credentials) {
	return axios
		.post('https://127.0.0.1:8000/api/login_check', credentials)
		.then((response) => response.data.token)
		.then((token) => {
			//Stocker le token dans mon localStorage
			window.localStorage.setItem('authToken', token);

			//On prévient Axios qu'on a header par défaut sur toutes les futures requete HTTP
			setAxiosToken(token);
		});
}

function setAxiosToken(token) {
	axios.defaults.headers['Authorization'] = 'Bearer ' + token;
}

function setup() {
	const token = window.localStorage.getItem('authToken');
	if (token) {
		const { exp: expiration } = jwtDecode(token);
		console.log(jwtData);
		if (expiration * 1000 > new Date().getTime()) {
			setAxiosToken(token);
		}
	}
}

export default {
	authenticate,
	logout,
	setup
};
