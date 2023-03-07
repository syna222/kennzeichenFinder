import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchPage({ user, setChosenKFZ, chosenKFZ }) {
  const checkboxRef = useRef();

  const [userKennzeichen, setUserKennzeichen] = useState([]);
  const [input, setInput] = useState("");
  const [match, setMatch] = useState(false);
  const [message, setMessage ] = useState("");

  //const user_id = "63ff6f9c858ac063472de5b7";
 const URL = `https://kennzeichenapi.onrender.com/users/${user._id}`;   //stattdessen hier dann user._id

  //////////1. bereits gesehene Kennzeichen des Users holen, auf initial Render//////////
  useEffect(() => {
    const checkKennzeichen = async (input) => {
      try {
        const res = await axios.get(URL);
        setUserKennzeichen(res.data.Gesehene_Kennzeichen);
      } catch (err) {
        console.log(err);
      }
    };
    checkKennzeichen();
    //hört auch auf match, damit wir bei Match-State Änderung den userKennzeichen state aktualisieren
  }, [match, user]);
  console.log("1. Users gesehene Kennzeichen sind:", userKennzeichen);

  //////////2. Wenn Userinput => Infos fetchen//////////könnte man auch mit handleChange zusammenführen, dann auf Async. achten
  useEffect(() => {
    if (input !== "") {
      const getInfo = async () => {
        try {
          const res = await axios.get(
            `https://kennzeichenapi.onrender.com/kennzeichen/${input}`
          );
          if(res.data.length){
            setChosenKFZ(res.data[0]);
            setMessage("");
          }
          else{
            //set message as state var:
            setChosenKFZ("");
            setMessage("no match!");
          }
        } catch (err) {
          console.log(err);
        }
      };
      getInfo();
    } else {
      //wenn wir keinen userInput haben, dann soll chosenKFZ auf null gesetzt werden
      setChosenKFZ(null);
      setMatch(false);
    }
  }, [input]);

  console.log("input", input);
  console.log("chosenkfz", chosenKFZ);

  //////////4. Checken ob KFZ bereits in user besteht und match state anpassen//////////
  useEffect(() => {
    const checkKennzeichen = (value) => {
      const doesExist = (k) => k._id === value._id;
      const isInList = userKennzeichen.some(doesExist);
      if (isInList) {
        setMatch(true);
      }
    };
    if (input) checkKennzeichen(chosenKFZ);
  }, [chosenKFZ]);

  match && console.log("////////////////MATCH????", match);

  const handleCheck = async () => {
    //1. checken ob KFZ bereits in userKennzeichen ist => match State checken
    //3. wenn match false && click => KFZ in userKennzeichen hinzufügen
    //4. userKennzeichen in DB updaten
    //5. userKennzeichen in state setzen
    //6. match state setzen

    //wenn match true && click => KFZ aus DB löschen
    if (match) {
      try {
        const res = await axios.put(`${URL}/removekennzeichen`, {
          kennzeichenId: chosenKFZ._id, //id des KFZs das entfernt werden soll
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
      setMatch(false);
      //wenn match false && click => KFZ zu DB hinzufügen
    } else {
      console.log("no match");
      try {
        const res = await axios.put(`${URL}/addkennzeichen`, {
          kennzeichenId: chosenKFZ._id, //id des KFZs das entfernt werden soll
        });
        setMatch(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div id="searchpage-div">
      <div id="suchfeld-container">
          <div className="outer-div">
          </div>
          <div className="inner-div">
              <input id="kennzeichen-suchfeld" type="text" onChange={(e) => { setInput(e.target.value); }} value={input} />
          </div>
          <div className="outer-div">
              <input id="kennzeichen-checkbox" ref={checkboxRef} type="checkbox" onChange={handleCheck} checked={match} />
          </div>
      </div>



      <div id="searchpage-info">
        <div id="Ort_Stadt"> Stadt/Ort:{" "} {chosenKFZ && <Link to="/aktuelles_kfz">{chosenKFZ.Stadt_Ort}</Link>} </div>
        <div id="Landkreis">Landkreis: {chosenKFZ && chosenKFZ.Landkreis}</div>
        <div id="bundesland">Bundesland: {chosenKFZ && chosenKFZ.Bundesland}</div>
        {message && <div>{message}</div>}
      </div>
    </div>
  );
}
