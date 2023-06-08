import { useRef, useState } from 'react';
import axios from 'axios';

export default function SignUp(){

    const inputUsernameRef = useRef();
    const inputEmailRef = useRef();
    const inputPasswortRef = useRef();

    const [ userName, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ passwort, setPasswort ] = useState("");

    function handleSubmit (e){
        e.preventDefault();
        //console.log("userdaten:", userName, email, passwort)
        //an backend senden:
        const URL = `https://kennzeichenapi.onrender.com/users`;
        axios.post(URL, {
            Username: userName,
            Email: email,
            Passwort: passwort
          })
          .then()
          .catch(function (error) {
            console.log(error.response.data);
            alert(error.response.data);
          });
          inputUsernameRef.current.value = "";
          inputEmailRef.current.value = "";
          inputPasswortRef.current.value = "";
    }

    return(
    <>
        <form onSubmit={handleSubmit}>
            <section className="form-section">
                <label htmlFor="username">Username: </label>
                <input ref={inputUsernameRef} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/>
            </section>
            <section className="form-section">
                <label htmlFor="email">Email: </label>
                <input ref={inputEmailRef} type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
            </section>
            <section className="form-section">
                <label htmlFor="passwort">Passwort: </label>
                <input ref={inputPasswortRef} type="password" id="passwort" name="passwort" onChange={(e) => setPasswort(e.target.value)}/>
            </section>
            <input className="app-button" type="submit" value="Account erstellen"/>
        </form>
    </>
    );
}