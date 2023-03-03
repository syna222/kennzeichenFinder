import { useRef, useState } from 'react';
import axios from 'axios';

export default function SignUp(){

    const inputUsernameRef = useRef();
    const inputEmailRef = useRef();
    const inputPasswortRef = useRef();

    const [ userName, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ passwort, setPasswort ] = useState("");

    function handleClick (e){
        e.preventDefault();
        //console.log("userdaten:", userName, email, passwort)
        //console.log("handleClick funktioniert")
        //scheiße an backend senden:
        const URL = `http://localhost:8080/users`;  //http://localhost:8080/users  //https://kennzeichenapi.onrender.com/users
        axios.post(URL, {
            Username: userName,
            Email: email,
            Passwort: passwort
          })
          .then(function (response) {
            console.log(response);
            //console.log("userdaten aus handleClick():", userName, email, passwort)
          })
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
        <form>
            <section>
                <label htmlFor="username">Username: </label>
                <input ref={inputUsernameRef} type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)}/>
            </section>
            <section>
                <label htmlFor="email">Email: </label>
                <input ref={inputEmailRef} type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
            </section>
            <section>
                <label htmlFor="passwort">Passwort: </label>
                <input ref={inputPasswortRef} type="text" id="passwort" name="passwort" onChange={(e) => setPasswort(e.target.value)}/>
            </section>
            <input type="submit" value="Account erstellen" onClick={handleClick}/>
        </form>
    </>
    );
}