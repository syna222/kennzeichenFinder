

export default function Logout({loggedIn, setLoggedIn, setToken}){


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
        }


    }



    return(
    <>
        <button onClick={handleClick}>Ausloggen</button>
    </>
    );
}