import axios from 'axios';
import jwtDecode from 'jwt-decode';

/**
 * Déconnexion en supprimant le token du localstorage et sur axios
 */
function logout() {
	window.localStorage.removeItem('authToken');
	delete axios.defaults.headers['Authorization'];
}

/**
 * Requete HTTP d'authentification et stockage du token dans le storage et dans axios
 * @param {object} credentials
 */
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

/**
 * Positionne le JWT sur Axios
 * @param {string} token
 */
function setAxiosToken(token) {
	axios.defaults.headers['Authorization'] = 'Bearer ' + token;
}

/**
 * Mise en place lors du chargement de l'app
 */
function setup() {
	const token = window.localStorage.getItem('authToken');
	if (token) {
		const { exp: expiration } = jwtDecode(token);
		if (expiration * 1000 > new Date().getTime()) {
			setAxiosToken(token);
		}
	}
}

/**
 * Permet de savoir si on est authentifier
 * @param {boolean} params
 */
function isAuthenticated(params) {
	const token = window.localStorage.getItem('authToken');
	if (token) {
		const { exp: expiration } = jwtDecode(token);
		if (expiration * 1000 > new Date().getTime()) {
			return true;
		}
		return false;
	}

	return false;
}

export default {
	authenticate,
	logout,
	setup,
	isAuthenticated
};
