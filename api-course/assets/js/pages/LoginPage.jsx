import React, { useState } from 'react';
import AuthAPI from '../services/authAPI';

const LoginPage = ({ onLogin, history }) => {
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
			onLogin(true);
			history.replace('/customers');
		} catch (error) {
			setError('Les informations ne correspondent pas');
		}
	};

	return (
		<div>
			<h1>Connexion à l'application</h1>

			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Adresse email</label>
					<input
						value={credentials.username}
						onChange={handleChange}
						placeholder="Adresse email"
						name="username"
						type="email"
						id="username"
						className={'form-control' + (error && ' is-invalid')}
					/>
					{error && <p className="invalid-feedback">{error}</p>}
				</div>

				<div className="form-group">
					<label htmlFor="password">Mot de passe</label>
					<input
						value={credentials.password}
						onChange={handleChange}
						placeholder="Mot de passe"
						name="password"
						id="password"
						type="password"
						className="form-control"
					/>
				</div>

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
