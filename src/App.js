import "./App.css";
import axios from "axios";
import SearchPage from "./Components/SearchPageSarah";
import Listen from "./Components/Listen";
import AZ from "./Components/AZ";
import NaBu from "./Components/NaBu";
import SchoGe from "./Components/SchoGe";
import Karte from "./Components/DKarte";
import Quiz from "./Components/Quiz";
import QuizStLa from "./Components/QuizStLa";
import QuizBl from "./Components/QuizBl";
import InfoPage from "./Components/InfoPage";
import { NavLink, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

export default function App() {
  const [ chosenKFZ, setChosenKFZ ] = useState(); //das hier in SearchPage setzen und an InfoPage passen  //mit [] initialisieren rausgenommen?
  const [ allKFZ, setAllKFZ ] = useState([]); //passed down to AZ component
  const [ KFZSortedBL, setKFZSortedBL ] = useState([]); //sorting by Bundesland to pass down to NaBu component
  const [ bundesländer, setBundesländer ] = useState([]);
  const [ geseheneKFZ, setGeseheneKFZ ] = useState(); //passed down to SchoGe component

  let listeBundesländer = [
    { name: "Baden-Württemberg", kfzs: [] },
    { name: "Bayern", kfzs: [] },
    { name: "Berlin", kfzs: [] },
    { name: "Brandenburg", kfzs: [] },
    { name: "Bremen", kfzs: [] },
    { name: "Hamburg", kfzs: [] },
    { name: "Hessen", kfzs: [] },
    { name: "Mecklenburg-Vorpommern", kfzs: [] },
    { name: "Niedersachsen", kfzs: [] },
    { name: "Nordrhein-Westfalen", kfzs: [] },
    { name: "Rheinland-Pfalz", kfzs: [] },
    { name: "Saarland", kfzs: [] },
    { name: "Sachsen", kfzs: [] },
    { name: "Sachsen-Anhalt", kfzs: [] },
    { name: "Schleswig-Holstein", kfzs: [] },
    { name: "Thüringen", kfzs: [] },
  ];

  useEffect(() => {
    //alle Kennzeichen alphabetisch fetchen + als state variable speichern :
    axios
      .get(`https://kennzeichenapi.onrender.com/kennzeichen/?sortkfz=true`)
      .then((res) => {
        setAllKFZ(res.data);
      }) //console.log(res.data);
      .catch((err) => console.log(err))
      .then(function (json) {
        // always executed
      });
  }, []);

  useEffect(() => {
    //alle Kennzeichen nach Bundesland (u. innerhalb alphabetisch) fetchen + als state variable speichern:
    axios
      .get(`https://kennzeichenapi.onrender.com/kennzeichen/?sortkfz=true&sortbu=true`)
      .then((res) => {
        setKFZSortedBL(res.data);
      }) //console.log(res.data);
      .catch((err) => console.log(err))
      .then(function (json) {
        // always executed
      });
  }, []);

  useEffect(() => {   //läuft erst, wenn KFZSortedBL in useEffect() davor gesetzt ist.
    //listeBundesländer durchlaufen, für jedes die jeweiligen aus KFZSortedBL rausziehen und in kfzs-feld speichern:
    listeBundesländer.forEach((bu, i) => {
      const bundesland = bu.name;
      //console.log("bundesland ist:", bundesland);
      //console.log("KFZSortedBL ist:", KFZSortedBL)
      const results = KFZSortedBL.filter((obj) => obj.Bundesland === bundesland);
      //console.log(results);
      //bu.kfzs = results; das funktioniert nicht, weil bu.kfzs nicht der tatsächliche Objekt-Teil ist!!
      listeBundesländer[i].kfzs = results;
    });
    //listeBundesländer als state-var setzen:
    //console.log("listeBundesländer: ", listeBundesländer);
    setBundesländer(listeBundesländer);
  }, [KFZSortedBL]);

  //console.log("TEST aus App.js/ KFZSortedBL is: ", KFZSortedBL);

  function compareKFZAlphab(a, b){
    if(a.Kennzeichen < b.Kennzeichen){
      return -1;
    }
    if(a.Kennzeichen > b.Kennzeichen){
      return 1;
    }
    return 0;
  }

    useEffect(() => {
        //zieht für userID die schon gesehenen KFZs raus + übergibt als prop an SchoGe-Komponente:
        //ACHTUNG! userid wird hier hardgecodet auf Viola! später ändern!
        const user_id = "63ff6f9c858ac063472de5b7"
        const URL = `https://kennzeichenapi.onrender.com/users/${user_id}`;
        axios.get(URL)
            .then(res => {
              let gesehene = res.data.Gesehene_Kennzeichen;
              gesehene.sort(compareKFZAlphab);
              setGeseheneKFZ(gesehene);
            })
            .catch(err => console.log(err))
    }, []);



  return (
    <div className="App">
      <nav>
        <NavLink className="nav-element" to="/suche">SUCHE</NavLink>
        <NavLink className="nav-element" to="/listen">LISTE(N)</NavLink>
        <NavLink className="nav-element" to="/karte">KARTE</NavLink>
        <NavLink className="nav-element" to="/quiz">QUIZ</NavLink>
      </nav>

      <Routes>
        <Route path="/suche" element={<SearchPage setChosenKFZ={setChosenKFZ} chosenKFZ={chosenKFZ} />}/>
        <Route path="/aktuelles_kfz"element={<InfoPage chosenKFZ={chosenKFZ} />}/>
        <Route path="/listen" element={<Listen />} />
        <Route path="/listen/a-z" element={<AZ allKFZ={allKFZ} />} />
        <Route path="/listen/nabu" element={<NaBu bundesländer={bundesländer} />}/>
        <Route path="/listen/schoge" element={<SchoGe geseheneKFZ={geseheneKFZ} geseheneCount={geseheneKFZ.length} gesamtCount={allKFZ.length}/>} />
        <Route path="/karte" element={<Karte />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/kfz_stla" element={<QuizStLa allKFZ={allKFZ} />} />
        <Route path="/quiz/kfz_bl" element={<QuizBl allKFZ={allKFZ} />} />
      </Routes>
    </div>
  );
}
