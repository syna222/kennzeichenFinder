import './App.css';
import SearchPage from './Components/SearchPage';
import Listen from './Components/Listen';
import AZ from './Components/AZ';
import NaBu from './Components/NaBu';
import Karte from './Components/DKarte';
import Quiz from './Components/Quiz';
import QuizStLa from './Components/QuizStLa';
import QuizBl from './Components/QuizBl';
import InfoPage from './Components/InfoPage';
import { NavLink, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function App() {

  const [ chosenKFZ, setChosenKFZ ] = useState();     //das hier in SearchPage setzen und an InfoPage passen




  return (
    <div className="App">
        <nav>
        <NavLink className="nav-element" to="/suche">SUCHE</NavLink>
        <NavLink className="nav-element" to="/listen">LISTE(N)</NavLink>
        <NavLink className="nav-element" to="/karte">KARTE</NavLink>
        <NavLink className="nav-element" to="/quiz">QUIZ</NavLink>
      </nav>

    <Routes>
        <Route path="/suche" element={<SearchPage setChosenKFZ={setChosenKFZ} chosenKFZ={chosenKFZ}/>}/>
        <Route path="/aktuelles_kfz" element={<InfoPage chosenKFZ={chosenKFZ}/>}/>
        <Route path="/listen" element={<Listen/>}/>
        <Route path="/listen/a-z" element={<AZ/>}/>
        <Route path="/listen/nabu" element={<NaBu/>}/>
        <Route path="/karte" element={<Karte/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/quiz/kfz_stla" element={<QuizStLa/>}/>
        <Route path="/quiz/kfz_bl" element={<QuizBl/>}/>

    </Routes>



    </div>
  );
}

