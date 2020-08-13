import React , {useEffect , useState} from 'react';
import Pagination from "../components/Pagination";
import CustomersApi from "../services/customersAPI" ;

const CustomersPage = (props) => {

    const [customers , setCustomers] = useState([]) ;

    const [currentPage , setCurrentPage] = useState(1) ;

    const [search ,setSearch] = useState("");

    /**
     * Permet d'aller récupérer les customers
     * @returns {Promise<void>}
     */
    const fetchCustomers = async () => {
        try {
            const data = await CustomersApi.findAll()
            setCustomers(data);
        } catch (e) {
            console.log(e.response) ;
        }
    }

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

        setCustomers(customers.filter(customer => customer.id !== id));

        try {

            await CustomersApi.delete(id);

        } catch (error) {

            // Si la requête n'a pas fonctionné on ré affiche la copie du tableau des customers
            setCustomers(originalCustomers);
            console.log(error.response);

        }

    }


    /**
     * Gestion du changement de page
     * @param page
     */
    const handlePageChange = (page) => setCurrentPage(page) ;

    /**
     * Gestion de la recherche d'un customer
     * @param event
     */
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value) ;
    };

    const itemsPerPage = 10 ;

    /**
     * Filtrage des customers en fonction de la recherche
     * @type {*[]}
     */
    const filteredCustomers = customers.filter(c =>
        c.firstName.toLowerCase().includes(search.toLowerCase())
        ||
        c.lastName.toLowerCase().includes(search.toLowerCase())
        ||
        (
            c.company
            &&
            c.company.toLowerCase().includes(search.toLowerCase())
        )
    );

    /**
     * Pagination des données
     * @type {*|*[]}
     */
    const paginatedCustomers = filteredCustomers.length > itemsPerPage
        ? Pagination.getData(
                filteredCustomers ,
                currentPage ,
                itemsPerPage
            )
        : filteredCustomers ;

    return (
        <div>

            <h1 className="text-center">Liste des clients</h1>

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


            {itemsPerPage <filteredCustomers.length &&
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredCustomers.length}
                onPageChanged={handlePageChange}
            />}

        </div>
    );
};



export default CustomersPage;
