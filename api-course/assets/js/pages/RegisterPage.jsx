import React, { useState } from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import UserAPI from '../services/usersAPI';

const RegisterPage = ({ match, history }) => {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirm: ''
	});

	const [errors, setErrors] = useState({
		fristName: '',
		lastName: '',
		email: '',
		password: '',
		passwordConfirm: ''
	});

	/**
	 * Gestion des changements des inputs dans le form
	 * @param {*} param0
	 */
	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setUser({ ...user, [name]: value });
	};

	/**
	 * Gestion soumission du formulaire
	 * @param {*} event
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();
		const apiErrors = {};
		if (user.password !== user.passwordConfirm) {
			apiErrors.passwordConfirm = 'Les mots de passe ne sont pas identiquent';
			setErrors(apiErrors);
			return;
		}
		try {
			await UserAPI.register(user);
			// TODO flash success
			setErrors({});
			history.replace('/login');
		} catch ({ response }) {
			const { violations } = response.data;
			if (violations) {
				violations.forEach(({ propertyPath, message }) => {
					apiErrors[propertyPath] = message;
				});

				setErrors(apiErrors);
			}
		}
	};

	return (
		<>
			<h1>Inscription</h1>
			<form onSubmit={handleSubmit}>
				<Field
					name="firstName"
					label="Prénom"
					placeholder="Votre prénom"
					error={errors.firstName}
					value={user.firstName}
					onChange={handleChange}
				/>
				<Field
					name="lastName"
					label="Nom"
					placeholder="Votre nom"
					error={errors.lastName}
					value={user.lastName}
					onChange={handleChange}
				/>
				<Field
					name="email"
					label="Adresse email"
					placeholder="Votre adresse email"
					type="email"
					error={errors.email}
					value={user.email}
					onChange={handleChange}
				/>
				<Field
					name="password"
					label="Mot de passe"
					type="password"
					placeholder="Votre Mot de passe"
					error={errors.password}
					value={user.password}
					onChange={handleChange}
				/>
				<Field
					name="passwordConfirm"
					label="Confirmation de votre Mot de passe"
					type="password"
					placeholder="Confirmer votre Mot de passe"
					error={errors.passwordConfirm}
					value={user.passwordConfirm}
					onChange={handleChange}
				/>
				<div className="form-group">
					<button type="submit" className="btn btn-success">
						Je m'inscris
					</button>
					<Link to="/login" className="btn btn-link">
						J'ai déjà un compte
					</Link>
				</div>
			</form>
		</>
	);
};

export default RegisterPage;
