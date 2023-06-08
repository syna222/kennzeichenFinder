import "./App.css";
import axios from "axios";
import AZ from "./Components/AZ";
import DKarte from "./Components/DKarte";
import Home from "./Components/Home";
import InfoPage from "./Components/InfoPage";
import Listen from "./Components/Listen";
import Login from "./Components/Login";
import NaBu from "./Components/NaBu";
import SchoGe from "./Components/SchoGe";
import SearchPage from "./Components/SearchPageNew";
import SignUp from "./Components/SignUp";
import Quiz from "./Components/Quiz";
import QuizStLa from "./Components/QuizStLa";
import QuizBl from "./Components/QuizBl";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function App() {

  const navigate = useNavigate();
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("user")));
  const [chosenKFZ, setChosenKFZ] = useState(""); // passed to SearchPage + InfoPage
  const [allKFZ, setAllKFZ] = useState([]); //passed down to AZ component
  const [KFZSortedBL, setKFZSortedBL] = useState([]); //sorting by Bundesland to pass down to NaBu component
  const [bundesländer, setBundesländer] = useState([]);
  const [ geseheneKFZ, setGeseheneKFZ ] = useState([]); //passed down to SchoGe component
  const [ loggedIn, setLoggedIn ] = useState(false); //passed down to Login component
  const [ token, setToken ] = useState(localStorage.getItem("authtoken")); //passed down to Login component

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
    if (token) {
      setLoggedIn(true);
    }
  }, [token]);

  useEffect(() => {
    //alle Kennzeichen alphabetisch fetchen + als state variable speichern :
    axios
      .get(`https://kennzeichenapi.onrender.com/kennzeichen/?sortkfz=true`)
      .then((res) => {
        setAllKFZ(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    //alle Kennzeichen nach Bundesland (u. innerhalb alphabetisch) fetchen + als state variable speichern:
    axios
      .get(`https://kennzeichenapi.onrender.com/kennzeichen/?sortkfz=true&sortbu=true`)
      .then((res) => {
        setKFZSortedBL(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    //läuft erst, wenn KFZSortedBL in useEffect() davor gesetzt ist.
    //listeBundesländer durchlaufen, für jedes die jeweiligen aus KFZSortedBL rausziehen und in kfzs-feld speichern:
    listeBundesländer.forEach((bu, i) => {
      const bundesland = bu.name;
      const results = KFZSortedBL.filter(
        (obj) => obj.Bundesland === bundesland
      );
      //bu.kfzs = results; das funktioniert nicht, weil bu.kfzs nicht der tatsächliche Objekt-Teil ist!!
      listeBundesländer[i].kfzs = results;
    });
    //listeBundesländer als state-var setzen:
    setBundesländer(listeBundesländer);
  }, [KFZSortedBL]);

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
        if(user){
          const user_id = user._id;
          const URL = `https://kennzeichenapi.onrender.com/users/${user_id}`;
          axios.get(URL)
              .then(res => {
                let gesehene = res.data.Gesehene_Kennzeichen;
                gesehene.sort(compareKFZAlphab);
                setGeseheneKFZ(gesehene);
              })
              .catch(err => console.log(err))
        }
    }, [user]);

  function handleClick(e){
      e.preventDefault();
      if(loggedIn){
          //token aus LocalStorage nehmen:
          localStorage.removeItem("authtoken"); 
          localStorage.removeItem("user");
          //login auf false:
          setLoggedIn(false);
          setToken();
          navigate("/");
      }
  }

  return (
    <div className="App">
      <nav id="navbar">
        <NavLink className="nav-element" to="/">
          HOME
        </NavLink>
    {!loggedIn && <><NavLink className="nav-element" to="/signup">
          SIGN UP
        </NavLink>
       <NavLink className="nav-element" to="/login">
          LOGIN 
        </NavLink></>}
        {loggedIn && 
        <>
        <NavLink className="nav-element" to="/suche">
          SUCHE
        </NavLink>
        <NavLink className="nav-element" to="/listen">
          LISTE(N)
        </NavLink>
        <NavLink className="nav-element" to="/karte">
          KARTE
        </NavLink>
        <NavLink className="nav-element" to="/quiz">
          QUIZ
        </NavLink>
        <button id="logout" className="nav-element" onClick={handleClick}>
          LOGOUT 
        </button>
        </>}
      </nav>

      <Routes>
        <Route path="/" element={<Home />}/>
        {!loggedIn && <><Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setToken={setToken}/>} /></>}
        {loggedIn && <><Route path="/suche" element={ <SearchPage user={user} setChosenKFZ={setChosenKFZ} chosenKFZ={chosenKFZ} /> } />
        <Route path="/aktuelles_kfz" element={<InfoPage chosenKFZ={chosenKFZ} />} />
        <Route path="/listen" element={<Listen />} />
        <Route path="/listen/a-z" element={<AZ allKFZ={allKFZ} />} />
        <Route path="/listen/nabu" element={<NaBu bundesländer={bundesländer} />}/>
        <Route path="/listen/schoge" element={<SchoGe geseheneKFZ={geseheneKFZ} geseheneCount={geseheneKFZ.length} gesamtCount={allKFZ.length}/>} />
        <Route path="/karte" element={<DKarte geseheneKFZ={geseheneKFZ}/>} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/kfz_stla" element={<QuizStLa allKFZ={allKFZ} />} />
        <Route path="/quiz/kfz_bl" element={<QuizBl allKFZ={allKFZ} />} /></>}
      </Routes>
    </div>
  );
}
