import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({setUser, loggedIn, setLoggedIn, setToken}){

    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();
    const inputEmailRef = useRef();
    const inputPasswortRef = useRef();

    const [ email, setEmail ] = useState("");
    const [ passwort, setPasswort ] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        //console.log("userdaten:", email, passwort)
        //an backend senden:
        const URL = `${baseURL}/login`;
        axios.post(URL, {
            Email: email,
            Passwort: passwort
          })
          .then(function (response) {
            //token in LocalStorage setzen:
            localStorage.setItem("authtoken", response.data.token);  //wenn das Posten nicht funktioniert (also kein token zurückkommt), dann springt er in den catch block und setLoggedin findet nicht statt!
            //userdata als String in LocalStorage setzen:
            localStorage.setItem("user", JSON.stringify(response.data.user))
            //state vars setzen:
            setToken(response.data.token);
            setLoggedIn(true);
            //setUser:
            setUser(response.data.user);
            navigate("/");
          })
          .catch(function (error) {
            console.log(error.response.data);
            alert(error.response.data);
          });
          inputEmailRef.current.value = "";
          inputPasswortRef.current.value = "";
    }

    return(
    <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
            <section>
                <label htmlFor="email">Email: </label>
                <input className="form-input" ref={inputEmailRef} type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
            </section>
            <section>
                <label htmlFor="passwort">Passwort: </label>
                <input className="form-input" ref={inputPasswortRef} type="password" id="passwort" name="passwort" onChange={(e) => setPasswort(e.target.value)}/>
            </section>
            <section>
                <input className="app-button" type="submit" value="Einloggen"/>
            </section>

        </form>
    </div>
    );
}