import React, { useState } from "react" ;
import axios from "axios" ;

const LoginPage = (props) => {

    const [credentials , setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error , setError] = useState("");

    const handleChange = (event) => {
        const value = event.currentTarget.value ;
        const name = event.currentTarget.name ;

        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const token = await axios
                .post("https://127.0.0.1:8000/api/login_check", credentials)
                .then(response => response.data.token);
            setError("");

            //Stocker le token dans mon localStorage
            window.localStorage.setItem("authToken" , token);

            //On prévient Axios qu'on a header par défaut sur toutes les futures requete HTTP
            axios.defaults.headers["Authorization"] = "Bearer " + token ; 

        
        } catch (error) {
          setError("Les informations ne correspondent pas");
        }

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
                        className={"form-control" + (error && " is-invalid")} 
                    />
                    {error && <p className="invalid-feedback">
                        {error}
                    </p>}
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