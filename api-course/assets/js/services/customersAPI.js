import axios from 'axios';
import Cache from './cache';
import { CUSTOMERS_API } from '../config';

/* function findAll2() {
	return axios
		.get('https://127.0.0.1:8000/api/customers')
		.then((response) => response.data['hydra:member']);
} */

async function findAll() {
	const cachedCustomers = await Cache.get('customers');

	if (cachedCustomers) return cachedCustomers;

	return axios.get(CUSTOMERS_API).then((response) => {
		const customers = response.data['hydra:member'];
		Cache.set('customers', customers);
		return customers;
	});
}

function deleteCustomer(id) {
	return axios
		.delete(CUSTOMERS_API + '/' + id)
		.then(async (response) => {
			const cachedCustomers = await Cache.get('customers');
			if (cachedCustomers) {
				Cache.set(
					'customers',
					cachedCustomers.filter((c) => c.id !== id)
				);
			}
			return response;
		});
}

function find(id) {
	return axios
		.get(CUSTOMERS_API + '/' + id)
		.then((response) => response.data);
}

function update(id, customer) {
	return axios
		.put(CUSTOMERS_API + '/' + id, customer)
		.then(async (response) => {
			const cachedCustomers = await Cache.get('customers');
			if (cachedCustomers) {
				const index = cachedCustomers.findIndex((c) => c.id === +id);

				cachedCustomers[index] = response.data;
			}
			return response;
		});
}

function create(customer) {
	return axios
		.post(CUSTOMERS_API, customer)
		.then(async (response) => {
			const cachedCustomers = await Cache.get('customers');

			if (cachedCustomers) {
				Cache.set('customers', [...cachedCustomers, response.data]);
			}
		});
}

export default {
	findAll,
	find,
	update,
	create,
	delete: deleteCustomer
};
