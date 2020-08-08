import React from 'react';

const CustomersPage = (props) => {
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
                    <tr>
                        <td>19</td>
                        <td>
                            <a href="#">Mohamed M'rabet</a>
                        </td>
                        <td>mohamed@sym.fr</td>
                        <td>Mohamed Inc</td>
                        <td className="text-center">4</td>
                        <td className="text-center">2 487,00 €</td>
                        <td>
                            <button className="btn btn-sm btn-danger">
                                Supprimer
                            </button>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>
    );
};

export default CustomersPage;
