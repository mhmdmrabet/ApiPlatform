import React, { useState } from "react" ;

const LoginPage = (props) => {

    const [credentials , setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event) => {
        const value = event.currentTarget.value ;
        const name = event.currentTarget.name ;

        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        console.log(credentials);
    }

    return ( 
        <div>

            <h1>Connexion à l'application</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">
                        Adresse email
                    </label>
                    <input 
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Adresse email" 
                        name="username" 
                        type="email" 
                        id="username"
                        className="form-control" 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        Mot de passe
                    </label>
                    <input 
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Mot de passe" 
                        name="password" 
                        id="password" 
                        type="password"
                        className="form-control" 
                    />
                </div>  

                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Je me connecte
                    </button>
                </div>

            </form>



        </div>
     );
}
 
export default LoginPage;