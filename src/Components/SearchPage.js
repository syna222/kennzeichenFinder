import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchPage({ setChosenKFZ, chosenKFZ }) {
  console.log("chosenkfz", chosenKFZ);

  const checkboxRef = useRef();

  const [changed, setChanged] = useState(false); //for conditional rendering
  const [checked, setChecked] = useState(false);
  const [userKennzeichen, setUserKennzeichen] = useState([]);
  const [insideUserKennzeichen, setInsideUserKennzeichen] = useState(false);

  //1. access chosenKFZ based on user input (from props)
  //2. fetch user's Gesehene_Kennzeichen
  //3. check if chosenKFZ._id is in Gesehene_Kennzeichen
  //4. if yes, set checkbox to checked
  //5. if no, set checkbox to unchecked

  //   const user_id = "63ff6f9c858ac063472de5b7";
  //   const URL = `https://kennzeichenapi.onrender.com/users/${user_id}`;

  //   useEffect(() => {
  //     const checkKennzeichenForUser = async () => {
  //       try {
  //         const data = await axios.get(URL);
  //         console.log("data", data.data.Gesehene_Kennzeichen);
  //         setUserKennzeichen(data.data.Gesehene_Kennzeichen);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     checkKennzeichenForUser();
  //   }, []);

  //   if (chosenKFZ && userKennzeichen.length) {
  //     console.log("yes");
  //   }

  // function checkKennzeichenForUser(){
  //     //get alle Gesehene_Kennzeichen from User, dann res.data.Gesehene_Kennzeichen durchlaufen + checken ob chosenKFZ._id drin ist
  //     let gesehene_kfz = [];
  //     let isInList = false;
  //     //ACHTUNG! userid wird hier hardgecodet auf Viola! später ändern!
  //     const user_id = "63ff6f9c858ac063472de5b7"
  //     const URL = `https://kennzeichenapi.onrender.com/users/${user_id}`;
  //     axios.get(URL)
  //         .then(res => {
  //             gesehene_kfz = res.data.Gesehene_Kennzeichen;
  //             console.log(gesehene_kfz);
  //         })
  //         .catch(err => console.log(err))
  //     //check if chosenKFZ._id in res.data.Gesehene_Kennzeichen (only if chosenKFZ is set yet!):
  //     if(chosenKFZ){      //HÄNGT ES HIER??!
  //         // console.log('id',chosenKFZ._id);
  //         const doesExist = (kfz) => kfz._id === chosenKFZ._id;
  //         isInList = gesehene_kfz.some(doesExist);
  //         console.log("isInList from checkKennzeichenForUser(): ", isInList);
  //     }
  //     return isInList;

  // }

  async function checkKennzeichenForUser() {
    let gesehene_kfz = [];
    let isInList = false;
    const user_id = "63ff6f9c858ac063472de5b7";
    const URL = `https://kennzeichenapi.onrender.com/users/${user_id}`;

    try {
      const res = await axios.get(URL);
      gesehene_kfz = res.data.Gesehene_Kennzeichen;
      //   console.log("gesehene_kfz: ", gesehene_kfz);

      //   console.log("chosenKFZ: ", chosenKFZ);
      if (chosenKFZ) {
        const doesExist = (kfz) => kfz._id === chosenKFZ._id;
        isInList = gesehene_kfz.some(doesExist);
        // console.log("isInList from checkKennzeichenForUser(): ", isInList);
        setInsideUserKennzeichen(isInList);
      }
    } catch (err) {
      console.log(err);
    }

    return isInList;
  }
  console.log("id", chosenKFZ._id);
  console.log("yes or nooooo", insideUserKennzeichen);

  async function handleChange(e) {
    const input = e.target.value;
    const URL = `https://kennzeichenapi.onrender.com/kennzeichen/${input}`;

    if (input) {
      try {
        const res = await axios.get(URL);
        setChosenKFZ(res.data[0]);
        setChanged(true);

        // Check if the chosenKFZ._id is already in the user's Gesehene_Kennzeichen:
        const isInList = await checkKennzeichenForUser();
        console.log("ist schon in Gesehene_Kennzeichen des Users:", isInList);
      } catch (err) {
        console.log(err);
      }
    } else {
      setChanged(false);
      checkboxRef.current.checked = false;
    }
  }

  //   function handleChange(e) {
  //     //fetch from API:
  //     const input = e.target.value;
  //     const URL = `https://kennzeichenapi.onrender.com/kennzeichen/${input}`;
  //     if (input) {
  //       axios
  //         .get(URL)
  //         .then((res) => {
  //           //console.log(res.data[0]);
  //           setChosenKFZ(res.data[0]);
  //           setChanged(true);
  //           //hier muss checkbox gesetzt werden, falls chosenKFZ._id schon in user's Gesehene_Kennzeichen:
  //           const isInList = checkKennzeichenForUser();
  //           console.log("ist schon in Gesehene_Kennzeichen des Users:", isInList);
  //         })
  //         .catch((err) => console.log(err));
  //     } else {
  //       setChanged(false);
  //       //checkbox unchecken:
  //       setChecked(false);
  //       checkboxRef.current.checked = false;
  //     }
  //   }

  function handleCheck() {
    //wird zu seinem Gegenteil, damit bei setChecked(true) und input defined das Kfz gespeichert wird...
    if (checked === false) {
      setChecked(true);
      console.log("checked is true");
      //KfZ wird gespeichert via put-request:
      const kfz_id = chosenKFZ._id;
      //ACHTUNG! userid wird hier hardgecodet auf Viola! später ändern!
      const user_id = "63ff6f9c858ac063472de5b7";
      const URL = `https://kennzeichenapi.onrender.com/users/${user_id}/addkennzeichen`;
      //console.log(URL);
      //post to new url:
      axios
        .put(URL, {
          kennzeichenId: kfz_id, //muss kennzeichenId heißen, weil in backend so destrukturiert angegeben
        })
        .then(function (response) {
          //console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setChecked(false);
      console.log("checked is false");
      //KfZ wird aus Speicher gelöscht via put-request:
      const kfz_id = chosenKFZ._id;
      //ACHTUNG! userid wird hier hardgecodet auf Viola! später ändern!
      const user_id = "63ff6f9c858ac063472de5b7";
      const URL = `https://kennzeichenapi.onrender.com/users/${user_id}/removekennzeichen`;
      //console.log(URL);
      //post to new url:
      axios
        .put(URL, {
          kennzeichenId: kfz_id, //muss kennzeichenId heißen, weil in backend so destrukturiert angegeben
        })
        .then(function (response) {
          //console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
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
