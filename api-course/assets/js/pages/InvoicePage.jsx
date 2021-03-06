import React, { useState, useEffect } from 'react';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import { Link } from 'react-router-dom';
import InvoiceAPI from '../services/invoicesApi';
import CustomersApi from '../services/customersAPI';
import { toast } from 'react-toastify';
import FormLoader from '../components/loaders/FormLoader';

const InvoicePage = ({ history, match }) => {
	const { id = 'new' } = match.params;
	const [editing, setEditing] = useState(false);
	const [invoice, setInvoice] = useState({
		amount: '',
		customer: '',
		status: 'SENT'
	});

	const [customers, setCustomers] = useState([]);

	const [errors, setErrors] = useState({
		amount: '',
		customer: '',
		status: ''
	});

	const [loading, setLoading] = useState(true);

	/**
	 * Récupération des clients
	 */
	const fetchCustomers = async () => {
		try {
			const data = await CustomersApi.findAll();
			setCustomers(data);
			setLoading(false);

			if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
		} catch (error) {
			toast.error('Impossible de charger les clients');
			history.replace('/invoices');
		}
	};

	/**
	 * Récurépation d'une facture
	 * @param {*} id
	 */
	const fetchInvoice = async (id) => {
		try {
			const { amount, status, customer } = await InvoiceAPI.find(id);
			setInvoice({ amount, status, customer: customer.id });
			setLoading(false);
		} catch (error) {
			toast.error('Impossible de charger la facture');
			history.replace('/invoices');
		}
	};

	/**
	 * Récupération des clients au chargement du composants
	 */
	useEffect(() => {
		fetchCustomers();
	}, []);

	/**
	 * Récupération de la bonne facture quand l'url change
	 */
	useEffect(() => {
		if (id != 'new') {
			setEditing(true);
			fetchInvoice(id);
		}
	}, [id]);

	/**
	 * Gestion des changements des inputs dans le form
	 * @param {*} param0
	 */
	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setInvoice({ ...invoice, [name]: value });
	};

	/**
	 * Gestion soumission formulaire
	 * @param {*} event
	 */
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			if (editing) {
				await InvoiceAPI.update(id, invoice);
				toast.success('La facture à bien été mdofiée');
			} else {
				await InvoiceAPI.create(invoice);
				toast.success('La facture à bien été crée');
			}

			history.replace('/invoices');
		} catch ({ response }) {
			const { violations } = response.data;
			if (violations) {
				const apiErrors = {};
				violations.forEach(({ propertyPath, message }) => {
					apiErrors[propertyPath] = message;
				});

				setErrors(apiErrors);
				toast.error('Il y a des erreurs dans le formulaire');
			}
		}
	};

	return (
		<>
			{(editing && <h1>Modification d'une facture</h1>) || (
				<h1>Creation d'une facture</h1>
			)}

			{loading && <FormLoader />}
			{!loading && (
				<form onSubmit={handleSubmit}>
					<Field
						name="amount"
						type="number"
						placeholder="Montant de la facture"
						label="Montant"
						onChange={handleChange}
						value={invoice.amount}
						error={errors.amount}
					/>

					<Select
						name="customer"
						label="client"
						value={invoice.customer}
						error={errors.customer}
						onChange={handleChange}
					>
						{customers.map((customer) => (
							<option key={customer.id} value={customer.id}>
								{customer.firstName} {customer.lastName}
							</option>
						))}
					</Select>
					<Select
						name="status"
						label="Statut"
						value={invoice.status}
						error={errors.status}
						onChange={handleChange}
					>
						<option value="SENT">Envoyer</option>
						<option value="PAID">Payer</option>
						<option value="CANCELLED">Annuler</option>
					</Select>

					<div className="form-group">
						<button type="submit" className="btn btn-success">
							Enregister
						</button>
						<Link to="/invoices" className="btn btn-link">
							Retour aux factures
						</Link>
					</div>
				</form>
			)}
		</>
	);
};

export default InvoicePage;
