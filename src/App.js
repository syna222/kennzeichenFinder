import './App.css';
import SearchPage from './Components/SearchPage';
import Listen from './Components/Listen';
import Karte from './Components/Karte';
import Quiz from './Components/Quiz';
import InfoPage from './Components/InfoPage';
import { NavLink, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function App() {

  const [ chosenKFZ, setChosenKFZ ] = useState();     //das hier in SearchPage setzen und an InfoPage passen




  return (
    <div className="App">
        <nav>
        <NavLink className="nav-elem" to="/suche">SUCHE</NavLink>
        <NavLink className="nav-elem" to="/listen">LISTE(N)</NavLink>
        <NavLink className="nav-elem" to="/karte">KARTE</NavLink>
        <NavLink className="nav-elem" to="/quiz">QUIZ</NavLink>
      </nav>

    <Routes>
        <Route path="/suche" element={<SearchPage setChosenKFZ={setChosenKFZ} chosenKFZ={chosenKFZ}/>}/>
        <Route path="/info/:kfz" element={<InfoPage chosenKFZ={chosenKFZ}/>}/>
        <Route path="/listen" element={<Listen/>}/>
        <Route path="/karte" element={<Karte/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
    </Routes>



    </div>
  );
}

