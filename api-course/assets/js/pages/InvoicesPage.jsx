import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import InvoicesAPI from '../services/invoicesApi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';

const STATUS_CLASSES = {
	PAID: 'success',
	SENT: 'primary',
	CANCELLED: 'danger'
};

const STATUS_LABELS = {
	PAID: 'Payer',
	SENT: 'Envoyer',
	CANCELLED: 'Annuler'
};

const InvoicesPage = (props) => {
	const [invoices, setInvoices] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');

	const [loading, setLoading] = useState(true);

	const itemsPerPage = 20;

	/**
	 * Recuperation des invoices aupres de l'API
	 */
	const fetchInvoices = async () => {
		try {
			const data = await InvoicesAPI.findAll();
			setInvoices(data);
			setLoading(false);
		} catch (error) {
			toast.error('Erreur lors du chargement des factures');
		}
	};

	/**
	 * Charger les invoices au chargement du composants
	 */
	useEffect(() => {
		fetchInvoices();
	}, []);

	/**
	 * Gestion du changement de page
	 * @param page
	 */
	const handlePageChange = (page) => setCurrentPage(page);

	/**
	 * Gestion de la recherche d'un customer
	 * @param event
	 */
	const handleSearch = ({ currentTarget }) => {
		setSearch(currentTarget.value);
	};

	/**
	 * Gestion de la suppression
	 *
	 * @param {*} id
	 */
	const handleDelete = async (id) => {
		const originalInvoices = [...invoices];

		setInvoices(invoices.filter((invoice) => invoice.id != id));

		try {
			await InvoicesAPI.delete(id);
			toast.success('La facture a bien été supprimée');
		} catch (error) {
			toast.error('Une erreur est survenue');
			setInvoices(originalInvoices);
		}
	};

	/**
	 * Gestion du format de date
	 *
	 * @param {*} str
	 */
	const formatDate = (str) => moment(str).format('DD/MM/YYYY');

	/**
	 * Filtrage des invoices en fonction de la recherche
	 */
	const filteredInvoices = invoices.filter(
		(i) =>
			i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
			i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
			i.amount.toString().startsWith(search.toLowerCase()) ||
			STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
	);

	/**
	 * Pagination des données
	 * @type {*|*[]}
	 */
	const paginatedInvoices =
		filteredInvoices.length > itemsPerPage
			? Pagination.getData(filteredInvoices, currentPage, itemsPerPage)
			: filteredInvoices;

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1 className="text-center">Liste des factures</h1>
				<Link to="/invoices/new" className="btn btn-primary">
					Créer une facture
				</Link>
			</div>

			<div className="form-group">
				<input
					type="text"
					onChange={handleSearch}
					value={search}
					className="form-control"
					placeholder="Rechercher"
				/>
			</div>

			<table className="table table-hover">
				<thead>
					<tr>
						<th>Numéro</th>
						<th>Client</th>
						<th className="text-center">Date d'envoi</th>
						<th className="text-center">Statut</th>
						<th className="text-center">Montant</th>
						<th></th>
					</tr>
				</thead>
				{!loading && (
					<tbody>
						{paginatedInvoices.map((invoice) => (
							<tr key={invoice.id}>
								<td>{invoice.chrono}</td>
								<td>
									<a href="#">
										{invoice.customer.firstName} {invoice.customer.lastName}
									</a>
								</td>
								<td className="text-center">{formatDate(invoice.sentAt)}</td>
								<td className="text-center">
									<span
										className={'badge badge-' + STATUS_CLASSES[invoice.status]}
									>
										{STATUS_LABELS[invoice.status]}
									</span>
								</td>
								<td className="text-center">
									{invoice.amount.toLocaleString()} €
								</td>
								<td>
									<Link
										to={'/invoices/' + invoice.id}
										className="btn btn-sm btn-success mr-1"
									>
										Editer
									</Link>
									<button
										className="btn btn-sm btn-danger"
										onClick={() => handleDelete(invoice.id)}
									>
										Supprimer
									</button>
								</td>
							</tr>
						))}
					</tbody>
				)}
			</table>

			{loading && <TableLoader />}

			<Pagination
				currentPage={currentPage}
				itemsPerPage={itemsPerPage}
				onPageChanged={handlePageChange}
				length={filteredInvoices.length}
			/>
		</div>
	);
};

export default InvoicesPage;
