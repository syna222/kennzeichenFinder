import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import euLogo from "../images/euflag.jpg";
import starFilled from "../images/star_icon_yellow.png";
import starEmpty from "../images/star_icon_empty.png";

export default function SearchPage({ user, token, setChosenKFZ, chosenKFZ }) {

    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const [userKennzeichen, setUserKennzeichen] = useState([]);
    const [input, setInput] = useState("");
    const [match, setMatch] = useState(false);
    const [message, setMessage ] = useState("");

    //1. alle gesehenen Kfzs des Users fetchen:
    useEffect(() => {
        axios.get(`${baseURL}/users/${user._id}`)
        .then(res => setUserKennzeichen(res.data.Gesehene_Kennzeichen))
        .catch(err => console.log(err));
    }, [match, user]);  //hört auch auf match, damit bei match-state-Änderung userKennzeichen neu gefetcht werden

    //2. wenn user -> input, --> Infos fetchen
    useEffect(() => {
        if(input !== ""){
            setMatch(false); //set back
            axios.get(`${baseURL}/kennzeichen/${input}`)
            .then(res => {
                if(res.data.length){
                    setChosenKFZ(res.data[0]);
                    setMessage("");  //set back
                }
                else{
                    setChosenKFZ("");
                    setMessage("no match!");
                }
            })
            .catch(err => console.log(err));
        }
        else{ //kein userinput
            setChosenKFZ(null);
            setMatch(false);
        }
    }, [input]);

    //3. checken, ob kfz bereits in user schon besteht + match state anpassen:
    useEffect(() => {
        if(input){
            const isInList = userKennzeichen.some(uk => uk._id === chosenKFZ._id);
            if (isInList) {
                setMatch(true);
              }
        }
    }, [chosenKFZ]);


    function handleCheck(){
        //wenn match true && click => KFZ aus user db löschen:
        if(match){
            axios.put(`${baseURL}/users/${user._id}/removekennzeichen`, { kennzeichenId: chosenKFZ._id }, 
            { headers: { "authtoken": token } })
            .then(setMatch(false))  //als setback //hier oder nach catch?
            .catch(err => console.log(err));
        }
        else{ //wenn match false && click => KFZ zu user db hinzufügen
            axios.put(`${baseURL}/users/${user._id}/addkennzeichen`, { kennzeichenId: chosenKFZ._id }, 
            { headers: { "authtoken": token } })
            .then(setMatch(true))  //als setback // hier oder nach catch?
            .catch(err => console.log(err));
        }
    }

    return (
        <div className="searchpage">
            <div className="suchfeld-leiste">
                <div className="outer-div"></div>
                <div className="inner-div">
                    <div className="laengsstreifen">
                        <img className="logo-image" src={euLogo} width="100px" alt="eulogo by vecteezy/Adam Lapunik"/>
                        <div className="logo-d">D</div>
                    </div>
                    <input className="search-input" type="text" maxlength="4" onChange={(e) => { setInput(e.target.value.toUpperCase()); }} value={input}/>
                </div>
                <div className="outer-div"></div>
            </div>
            <div className="sternkasten">
                <img src={match ? starFilled : starEmpty} alt="star-check" onClick={handleCheck}/>
            </div>
            <div className="infokasten">
                <section className="info-section">
                    <label>Stadt/Ort: </label>
                    <div className="info-answer">{chosenKFZ && <Link to="/aktuelles_kfz">{chosenKFZ.Stadt_Ort}</Link>}</div>
                </section>
                <section className="info-section">
                    <label>Landkreis: </label>
                    <div className="info-answer">{chosenKFZ && chosenKFZ.Landkreis}</div>
                </section>
                <section className="info-section">
                    <label>Bundesland: </label>
                    <div className="info-answer">{chosenKFZ && chosenKFZ.Bundesland}</div>
                </section>
            </div>
            {message && <div>{message}</div>}
        </div>
      );
}