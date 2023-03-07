import { useNavigate } from "react-router-dom";

export default function Logout({loggedIn, setLoggedIn, setToken}){

    const navigate = useNavigate();

    function handleClick(e){
        e.preventDefault();
        if(loggedIn){           //überflüssig?
            //token aus LocalStorage nehmen:
            localStorage.removeItem("authtoken"); 
            localStorage.removeItem("user");
            //login auf false:
            setLoggedIn(false);
            //muss setToken auf undefined?
            setToken();
            navigate("/");
        }
    }



    return(
    <>
        <button onClick={handleClick}>Ausloggen</button>
    </>
    );
}