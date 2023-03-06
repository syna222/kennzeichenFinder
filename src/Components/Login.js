import { useEffect, useState, useRef } from 'react';
import axios from 'axios';


export default function Login({setUser, loggedIn, setLoggedIn, setToken}){

    const inputEmailRef = useRef();
    const inputPasswortRef = useRef();

    const [ email, setEmail ] = useState("");
    const [ passwort, setPasswort ] = useState("");


    function handleSubmit(e){
        e.preventDefault();
        //console.log("userdaten:", email, passwort)
        //an backend senden:
        const URL = `https://kennzeichenapi.onrender.com/login`;    //beste Route??
        axios.post(URL, {
            Email: email,
            Passwort: passwort
          })
          .then(function (response) {
            console.log('responseeeeee',response.data);      //this is the token
            //token in LocalStorage setzen:
            localStorage.setItem("authtoken", response.data.token);
            //userdata als String in LocalStorage setzen:
            localStorage.setItem("user", JSON.stringify(response.data.user))
            //state vars setzen:
            setToken(response.data.token);
            setLoggedIn(true);
            //setUser:
            setUser(response.data.user);
          })
          .catch(function (error) {
            console.log(error.response.data);
            alert(error.response.data);
          });
          inputEmailRef.current.value = "";
          inputPasswortRef.current.value = "";
    }




    return(
    <>
        <form onSubmit={handleSubmit}>
        <section>
                <label htmlFor="email">Email: </label>
                <input ref={inputEmailRef} type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
            </section>
            <section>
                <label htmlFor="passwort">Passwort: </label>
                <input ref={inputPasswortRef} type="password" id="passwort" name="passwort" onChange={(e) => setPasswort(e.target.value)}/>
            </section>
            <input type="submit" value="Einloggen"/>
        </form>
    </>
    );
}