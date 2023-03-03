import { useEffect, useState } from 'react';


export default function Login(){

    const [ email, setEmail ] = useState("");
    const [ passwort, setPasswort ] = useState("");


    function handleSubmit(e){
        
    }


    return(
    <>
        <form onSubmit={handleSubmit}>
            <section>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
            </section>
            <section>
                <label htmlFor="passwort">Passwort: </label>
                <input type="text" id="passwort" name="passwort" onChange={(e) => setPasswort(e.target.value)}/>
            </section>
            <input type="submit" value="Login"/>
        </form>
    </>
    );
}