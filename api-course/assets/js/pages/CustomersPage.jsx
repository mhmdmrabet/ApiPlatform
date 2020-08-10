import React , {useEffect , useState} from 'react';
import axios from "axios" ;

const CustomersPage = (props) => {

    const [customers , setCustomers] = useState([]) ;

    const [currentPage , setCurrentPage] = useState(1) ;

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
            .delete("https://127.0.0.1:8000/api/customers/" + id)
            .then(response => console.log("ok"))
            .catch(error => {
                // Si la requête n'a pas fonctionné on ré affiche la copie du tableau des customers
                setCustomers(originalCustomers);
                console.log(error.response);
            });
    }


    const handlePageChange = (page) => {
        setCurrentPage(page) ;
    }

    const itemsPerPage = 10 ;
    const pagesCount = Math.ceil(customers.length / itemsPerPage) ;

    const pages = [];

    for(let i =1 ; i <= pagesCount ; i++)
    {
        pages.push(i) ;
    }

    // D'où on part (start) et pendant combien (itemsPerPage)
    const start = currentPage * itemsPerPage - itemsPerPage ;
    //exemple:          3     *      10      -      10      =   20
    const paginatedCustomers = customers.slice(start, start + itemsPerPage) ;

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
                {paginatedCustomers.map(customer => (
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


            <div>
                <ul className="pagination pagination-sm">
                    <li className={"page-item" + (currentPage === 1 && " disabled")}>
                        <button className="page-link" onClick={()=> handlePageChange(currentPage -1)}>
                            &laquo;
                        </button>
                    </li>
                    {pages.map( page =>
                        <li key={page} className={"page-item" + (currentPage === page && " active")}>
                            <button className="page-link" onClick={() => handlePageChange(page)}>
                                {page}
                            </button>
                        </li>
                    )}

                    <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                            &raquo;
                        </button>
                    </li>
                </ul>
            </div>

        </div>
    );
};



export default CustomersPage;
