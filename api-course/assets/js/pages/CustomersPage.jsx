import React , {useEffect , useState} from 'react';
import axios from "axios" ;

const CustomersPage = (props) => {

    const [customers , setCustomers] = useState([]) ;

    useEffect(() => {
        axios
            .get("https://127.0.0.1:8000/api/customers")
            .then(response => response.data["hydra:member"])
            .then(data => setCustomers(data))
            .catch(error => console.log(error.response));
    } , []);

    const handleDelete = (id) => {
        console.log(id) ;

        //Copie du tableau des customers
        const originalCustomers = [...customers] ;

        //
        setCustomers(customers.filter(customer => customer.id !== id)) ;
        axios
            .delete("https://127.0.0.1:8000/api/customedrs/" + id)
            .then(response => console.log("ok"))
            .catch(error => {
                // Si la requête n'a pas fonctionné on ré affiche la copie du tableau des customers
                setCustomers(originalCustomers);
                console.log(error.response);
            });
    }

    return (
        <div>

            <h1 className="text-center">Liste des clients</h1>

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

                <tbody>
                {customers.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>
                            <a href="#">{customer.firstName} {customer.lastName}</a>
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center">{customer.invoices.length}</td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                        <td>
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

            </table>

        </div>
    );
};

export default CustomersPage;
