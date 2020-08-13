import axios from 'axios' ;


function authenticate(credentials) {

    return axios
        .post("https://127.0.0.1:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            //Stocker le token dans mon localStorage
            window.localStorage.setItem("authToken" , token);
        
            //On prévient Axios qu'on a header par défaut sur toutes les futures requete HTTP
            axios.defaults.headers["Authorization"] = "Bearer " + token ; 

            return true ; 
        });
     
}

export default {
    authenticate 
};