import React, { useState } from 'react';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import { Link } from 'react-router-dom';

const InvoicePage = (props) => {
	const [invoice, setInvoice] = useState({
		amount: '',
		customer: '',
		status: ''
	});

	const [errors, setErrors] = useState({
		amount: '',
		customer: '',
		status: ''
	});

	/**
	 * Gestion des changements des inputs dans le form
	 * @param {*} param0
	 */
	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setInvoice({ ...invoice, [name]: value });
	};

	return (
		<>
			<h1>Création d'une facture</h1>
			<form action="">
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
					<option value="1">Mymy</option>
					<option value="2">Momo</option>
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
		</>
	);
};

export default InvoicePage;
