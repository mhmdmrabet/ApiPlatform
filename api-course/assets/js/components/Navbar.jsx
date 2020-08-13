import React from 'react';
import authAPI from '../services/authAPI';
import { NavLink } from "react-router-dom" ;

const Navbar = (props) => {

    const handleLogout = () => {
        authAPI.logout();
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink className="navbar-brand" to="/">
                    SymReact
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customers">
                                Clients
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/invoices">
                                Factures
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-link">
                                Inscription
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/login" className="btn btn-secondary mr-2">
                                Connexion
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <button href="" className="btn btn-danger" onClick={handleLogout}>
                                Déconnexion
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;

