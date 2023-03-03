import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function SearchPage({setChosenKFZ, chosenKFZ}){

    const checkboxRef = useRef();

    const [ changed, setChanged ] = useState(false);     //for conditional rendering
    const [ checked, setChecked ] = useState(false); 
    const [ geseheneKFZ, setGeseheneKFZ ] = useState();     //mit [] initialisieren?

    //direkt am Anfang alle gesehenen Kfzs des Users fetchen + in state var packen:
    useEffect(() => {
        //ACHTUNG! userid wird hier hardgecodet auf Viola! später ändern!
        const user_id = "63ff6f9c858ac063472de5b7"
        const URL = `https://kennzeichenapi.onrender.com/users/${user_id}`;
        axios.get(URL)
            .then(res => {
                setGeseheneKFZ(res.data.Gesehene_Kennzeichen);
            })
            .catch(err => console.log(err))
    }, []);



    function checkKennzeichenForUser(){
        let isInList = false;
        //check if chosenKFZ._id in res.data.Gesehene_Kennzeichen/geseheneKFZ (only if chosenKFZ is set yet!):
        if(chosenKFZ && geseheneKFZ){
            console.log("test aus checkKennzeichenForUser");
            const doesExist = (kfz) => kfz._id === chosenKFZ._id;
            console.log("chosenKFZ ist:", chosenKFZ);       //undefined obwohl in Komponente hier nicht undefined (in return wird auf chosenKFZ zugegriffen und korrekt ausgegeben)
            console.log("chosenKFZ._id ist:", chosenKFZ._id);   //undefined
            console.log("test, checkedKFZ ist:", geseheneKFZ);      //geht rein, aber erkennt nicht.
            isInList = geseheneKFZ.some(doesExist);
            console.log("isInList ist gerade:", isInList);
        }
        return isInList;
    }

    function handleChange(e){
        //fetch from API:
        const input = e.target.value;
        const URL = `https://kennzeichenapi.onrender.com/kennzeichen/${input}`;
        if(input){
            axios.get(URL)
            .then(res => {
                //console.log(res.data[0]); 
                setChosenKFZ(res.data[0]); 
                setChanged(true);
            })
            .catch(err => console.log(err))
            //hier muss checkbox gesetzt werden, falls chosenKFZ._id schon in user's Gesehene_Kennzeichen:

            //DAS FOLGENDE LÄUFT ZU FRÜH - BEVOR FETCH OBEN DRÜBER ABGESCHLOSSEN IST.
            const isInList = checkKennzeichenForUser();
            console.log("ist schon in Gesehene_Kennzeichen des Users:", isInList);

        }
        else{
            setChanged(false);
            //checkbox unchecken:
            setChecked(false);
            checkboxRef.current.checked = false;
        }
    }




    function handleCheck(){
        //wird zu seinem Gegenteil, damit bei setChecked(true) und input defined das Kfz gespeichert wird...
        if(checked === false){
            setChecked(true);
            console.log("checked is true");
            //KfZ wird gespeichert via put-request:
            const kfz_id = chosenKFZ._id;
            //ACHTUNG! userid wird hier hardgecodet auf Viola! später ändern!
            const user_id = "63ff6f9c858ac063472de5b7"
            const URL = `https://kennzeichenapi.onrender.com/users/${user_id}/addkennzeichen`;
            //console.log(URL);
            //post to new url:
            axios.put(URL, {
                kennzeichenId: kfz_id       //muss kennzeichenId heißen, weil in backend so destrukturiert angegeben
            })
              .then(function (response) {
                //console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });

        }
        else{
            setChecked(false);
            console.log("checked is false");
            //KfZ wird aus Speicher gelöscht via put-request:
            const kfz_id = chosenKFZ._id;
            //ACHTUNG! userid wird hier hardgecodet auf Viola! später ändern!
            const user_id = "63ff6f9c858ac063472de5b7"
            const URL = `https://kennzeichenapi.onrender.com/users/${user_id}/removekennzeichen`;
            //console.log(URL);
            //post to new url:
            axios.put(URL, {
                kennzeichenId: kfz_id       //muss kennzeichenId heißen, weil in backend so destrukturiert angegeben
            })
              .then(function (response) {
                //console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }


    }
  }

  return (
    <>
      <input id="kennzeichen-suchfeld" type="text" onChange={handleChange} />
      <input ref={checkboxRef} type="checkbox" onChange={handleCheck} />
      <div id="Ort_Stadt">
        Stadt/Ort:{" "}
        {changed && chosenKFZ && (
          <Link to="/aktuelles_kfz">{chosenKFZ.Stadt_Ort}</Link>
        )}
      </div>
      <div id="Landkreis">
        Landkreis: {changed && chosenKFZ && chosenKFZ.Landkreis}
      </div>
      <div id="bundesland">
        Bundesland: {changed && chosenKFZ && chosenKFZ.Bundesland}
      </div>
    </>
  );
}
