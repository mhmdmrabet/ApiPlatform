/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React, { useState } from 'react';

import ReactDom from 'react-dom';

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import CustomersPageWithPagination from './pages/CustomersPageWithPagination';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import AuthAPI from './services/authAPI';
import authAPI from './services/authAPI';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

AuthAPI.setup();

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		authAPI.isAuthenticated()
	);

	const NavbarWithRouter = withRouter(Navbar);

	console.log(isAuthenticated);

	return (
		<HashRouter>
			<NavbarWithRouter
				isAuthenticated={isAuthenticated}
				onLogout={setIsAuthenticated}
			/>

			<main className="container pt-5">
				<Switch>
					<Route path="/customers" component={CustomersPage} />
					<Route path="/invoices" component={InvoicesPage} />
					<Route
						path="/login"
						render={(props) => (
							<LoginPage onLogin={setIsAuthenticated} {...props} />
						)}
					/>
					<Route path="/" component={HomePage} />
				</Switch>
			</main>
		</HashRouter>
	);
};

const rootElement = document.querySelector('#app');
ReactDom.render(<App />, rootElement);
