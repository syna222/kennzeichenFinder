import { useRef, useState } from 'react';
import axios from 'axios';

export default function SignUp(){

    const baseURL = process.env.REACT_APP_API_BASE_URL;
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
        const URL = `${baseURL}/users`;
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
    <div className="signup-page">
        <form className="signup-form" onSubmit={handleSubmit}>
            <section>
                <label htmlFor="username">Username: </label>
                <input className="form-input" ref={inputUsernameRef} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/>
            </section>
            <section>
                <label htmlFor="email">Email: </label>
                <input className="form-input" ref={inputEmailRef} type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
            </section>
            <section>
                <label htmlFor="passwort">Passwort: </label>
                <input className="form-input" ref={inputPasswortRef} type="password" id="passwort" name="passwort" onChange={(e) => setPasswort(e.target.value)}/>
            </section>
            <section>
                <input className="app-button" type="submit" value="Account erstellen"/>
            </section>

        </form>
    </div>
    );
}