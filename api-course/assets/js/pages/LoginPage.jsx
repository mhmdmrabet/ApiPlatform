import React, { useState, useContext } from 'react';
import AuthAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';
import { toast } from 'react-toastify';

const LoginPage = ({ history }) => {
	const { setIsAuthenticated } = useContext(AuthContext);
	const [credentials, setCredentials] = useState({
		username: '',
		password: ''
	});

	const [error, setError] = useState('');

	/**
	 * Gestion des champs
	 * @param {*} param0
	 */
	const handleChange = ({ currentTarget }) => {
		const { value, name } = currentTarget;

		setCredentials({ ...credentials, [name]: value });
	};

	/**
	 * Gestion du submit
	 * @param {*} event
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await AuthAPI.authenticate(credentials);
			setError('');
			setIsAuthenticated(true);
			toast.success('Vous êtes désormais connecté');
			history.replace('/customers');
		} catch (error) {
			setError('Les informations ne correspondent pas');
			toast.error('Une erreur est survenue');
		}
	};

	return (
		<div>
			<h1>Connexion à l'application</h1>

			<form onSubmit={handleSubmit}>
				<Field
					label="Adresse email"
					name="username"
					value={credentials.username}
					onChange={handleChange}
					placeholder="Adresse email"
					error={error}
				/>

				<Field
					label="Mot de passe"
					name="password"
					value={credentials.password}
					onChange={handleChange}
					type="password"
				/>

				<div className="form-group">
					<button type="submit" className="btn btn-success">
						Je me connecte
					</button>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
