import picture from "../images/yellowcar.png"

export default function Home(){




    return(
    <div id="home-container">
        <h1 id="welcome">Willkommen bei der Kennzeichen-Suche!</h1>
        <img id="home-image" src={picture} alt="yellow_car"/>
    </div>
    );
}