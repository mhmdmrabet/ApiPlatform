import React from 'react';
import authAPI from '../services/authAPI';

const Navbar = (props) => {

    const handleLogout = () => {
        authAPI.logout();
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand" href="#">SymReact</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Clients</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Factures</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a href="" className="nav-link">
                                Inscription
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="" className="btn btn-secondary mr-2">
                                Connexion
                            </a>
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

