import axios from 'axios';
import Cache from './cache';

/* function findAll2() {
	return axios
		.get('https://127.0.0.1:8000/api/customers')
		.then((response) => response.data['hydra:member']);
} */

async function findAll() {
	const cachedCustomers = await Cache.get('customers');

	if (cachedCustomers) return cachedCustomers;

	return axios.get('https://127.0.0.1:8000/api/customers').then((response) => {
		const customers = response.data['hydra:member'];
		Cache.set('customers', customers);
		return customers;
	});
}

function deleteCustomer(id) {
	return axios
		.delete('https://127.0.0.1:8000/api/customers/' + id)
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
		.get('https://127.0.0.1:8000/api/customers/' + id)
		.then((response) => response.data);
}

function update(id, customer) {
	return axios
		.put('https://127.0.0.1:8000/api/customers/' + id, customer)
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
		.post('https://127.0.0.1:8000/api/customers', customer)
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
