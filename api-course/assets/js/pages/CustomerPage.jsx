import React, { useState, useEffect } from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import customersAPI from '../services/customersAPI';
import { toast } from 'react-toastify';
import FormLoader from '../components/loaders/FormLoader';

const CustomerPage = ({ match, history }) => {
	const { id = 'new' } = match.params;

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

	const [editing, setEditing] = useState(false);

	const [loading, setLoading] = useState(false);

	/**
	 * Récupération du customer en fonction de l'id
	 * @param {*} id
	 */
	const fetchCustomer = async (id) => {
		try {
			const { firstName, lastName, email, company } = await customersAPI.find(
				id
			);
			setCustomer({ firstName, lastName, email, company });
			setLoading(false);
		} catch (error) {
			console.log(error.response);
			toast.error("Le client n'a pas pu être chargé");
			history.replace('/customers');
		}
	};

	/**
	 * Chargement du customer afin de le modifier
	 */
	useEffect(() => {
		if (id !== 'new') {
			setLoading(true);
			setEditing(true);
			fetchCustomer(id);
		}
	}, [id]);

	/**
	 * Gestion des changements des inputs dans le form
	 * @param {*} param0
	 */
	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setCustomer({ ...customer, [name]: value });
	};

	/**
	 * Gestion de la soumission du form
	 * @param {*} event
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			if (editing) {
				await customersAPI.update(id, customer);
				toast.success('Le client à bien été modifié');
			} else {
				await customersAPI.create(customer);
				toast.success('Le client à bien été créé');
			}
			setErrors({});
			history.replace('/customers');
		} catch ({ response }) {
			const { violations } = response.data;
			if (violations) {
				const apiErrors = {};
				violations.forEach(({ propertyPath, message }) => {
					apiErrors[propertyPath] = message;
				});

				setErrors(apiErrors);
				toast.error("Le formulaire n'est pas correctement rempli");
			}
		}
	};

	return (
		<>
			{(!editing && <h1>Création d'un client</h1>) || (
				<h1>Modification du client</h1>
			)}

			{loading && <FormLoader />}

			{!loading && (
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
			)}
		</>
	);
};

export default CustomerPage;
