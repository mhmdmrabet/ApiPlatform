import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import CustomersApi from '../services/customersAPI';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';

const CustomersPage = (props) => {
	const [customers, setCustomers] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);

	const [search, setSearch] = useState('');

	const [loading, setLoading] = useState(true);

	/**
	 * Permet d'aller récupérer les customers
	 * @returns {Promise<void>}
	 */
	const fetchCustomers = async () => {
		try {
			const data = await CustomersApi.findAll();
			setCustomers(data);
			setLoading(false);
		} catch (e) {
			toast.error('Impossible de charger les clients');
		}
	};

	/**
	 * Au chargement du composant on va chercher les customers
	 */
	useEffect(() => {
		fetchCustomers();
	}, []);

	/**
	 * Gestion de la suppression d'un customer
	 * @param id
	 * @returns {Promise<void>}
	 */
	const handleDelete = async (id) => {
		//Copie du tableau des customers
		const originalCustomers = [...customers];

		setCustomers(customers.filter((customer) => customer.id !== id));

		try {
			await CustomersApi.delete(id);
			toast.success('Le client à bien été supprimée');
		} catch (error) {
			// Si la requête n'a pas fonctionné on ré affiche la copie du tableau des customers
			setCustomers(originalCustomers);
			toast.error('La suppresion a échouée');
		}
	};

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

	const itemsPerPage = 10;

	/**
	 * Filtrage des customers en fonction de la recherche
	 * @type {*[]}
	 */
	const filteredCustomers = customers.filter(
		(c) =>
			c.firstName.toLowerCase().includes(search.toLowerCase()) ||
			c.lastName.toLowerCase().includes(search.toLowerCase()) ||
			(c.company && c.company.toLowerCase().includes(search.toLowerCase()))
	);

	/**
	 * Pagination des données
	 * @type {*|*[]}
	 */
	const paginatedCustomers =
		filteredCustomers.length > itemsPerPage
			? Pagination.getData(filteredCustomers, currentPage, itemsPerPage)
			: filteredCustomers;

	return (
		<div>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h1 className="text-center">Liste des clients</h1>
				<Link to="/customers/new" className="btn btn-primary">
					Créer un client
				</Link>
			</div>

			<div className="form-group">
				<input
					type="text"
					onChange={handleSearch}
					value={search}
					className="form-control"
					placeholder="Rechercher ..."
				/>
			</div>

			<table className="table table-hover">
				<thead>
					<tr>
						<th>ID.</th>
						<th>Client</th>
						<th>Email</th>
						<th>Entreprise</th>
						<th className="text-center">Factures</th>
						<th className="text-center">Montant total</th>
						<th></th>
					</tr>
				</thead>

				{!loading && (
					<tbody>
						{paginatedCustomers.map((customer) => (
							<tr key={customer.id}>
								<td>{customer.id}</td>
								<td>
									<Link to={'/customers/' + customer.id}>
										{customer.firstName} {customer.lastName}
									</Link>
								</td>
								<td>{customer.email}</td>
								<td>{customer.company}</td>
								<td className="text-center">{customer.invoices.length}</td>
								<td className="text-center">
									{customer.totalAmount.toLocaleString()} €
								</td>
								<td>
									<Link
										to={'/customers/' + customer.id}
										className="btn btn-sm btn-success m-2"
									>
										Editer
									</Link>
									<button
										onClick={() => handleDelete(customer.id)}
										disabled={customer.invoices.length > 0}
										className="btn btn-sm btn-danger"
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

			{itemsPerPage < filteredCustomers.length && (
				<Pagination
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					length={filteredCustomers.length}
					onPageChanged={handlePageChange}
				/>
			)}
		</div>
	);
};

export default CustomersPage;
