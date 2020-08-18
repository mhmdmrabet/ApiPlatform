import React, { useState } from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const CustomerPage = (props) => {
	const [customer, setCustomer] = useState({
		firstName: '',
		lastName: '',
		email: '',
		company: ''
	});

	const [errors, setErrors] = useState({
		firstName: '',
		lastName: '',
		email: '',
		company: ''
	});

	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setCustomer({ ...customer, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await Axios.post(
				'https://127.0.0.1:8000/api/customers',
				customer
			);
			setErrors({});
		} catch (error) {
			if (error.response.data.violations) {
				const apiErrors = {};
				error.response.data.violations.forEach((violation) => {
					apiErrors[violation.propertyPath] = violation.message;
				});

				setErrors(apiErrors);
			}
		}
	};

	return (
		<>
			<h1>Création d'un client</h1>

			<form onSubmit={handleSubmit}>
				<Field
					name="lastName"
					label="Nom de famille"
					placeholder="Nom de famille du client"
					value={customer.lastName}
					onChange={handleChange}
					error={errors.lastName}
				/>
				<Field
					name="firstName"
					label="Prénom"
					placeholder="Prénom du client"
					value={customer.firstName}
					onChange={handleChange}
					error={errors.firstName}
				/>
				<Field
					name="email"
					label="Email"
					placeholder="Adresse email du client"
					type="email"
					value={customer.email}
					onChange={handleChange}
					error={errors.email}
				/>
				<Field
					name="company"
					label="Entreprise"
					placeholder="Entreprise du client"
					value={customer.company}
					onChange={handleChange}
					error={errors.company}
				/>

				<div className="form-group">
					<button type="submit" className="btn btn-success">
						Enregistrer
					</button>
					<Link to="/customers" className="btn btn-link">
						Retour à la liste
					</Link>
				</div>
			</form>
		</>
	);
};

export default CustomerPage;
