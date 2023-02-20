import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, Link, Routes, Route } from 'react-router-dom';
import InfoPage from './InfoPage';

export default function SearchPage({setChosenKFZ, chosenKFZ}){

    const [ changed, setChanged ] = useState(false);     //for conditional rendering

    function handleChange(e){
        //fetch from API:
        const input = e.target.value;
        axios.get(`https://kennzeichenapi.onrender.com/${input}`)
        .then(res => {console.log(res.data[0]); setChosenKFZ(res.data[0]); setChanged(true);})
        .catch(err => console.log(err))
        .then(function (json) {
         // always executed
        });
    }




    return(
    <>
        <input type="text" onChange={handleChange}/>
        <input type="checkbox" />
        {/*make to-Path conditional?? */}
        {/*link to InfoPage...*/}
        {/*<div id="Ort_Stadt">{changed && <Link className="nav-elem" to="/:kfz">{chosenKFZ.Stadt_Ort}</Link>}</div>     {/*this has to become a link to the info page} */}
        <div id="Ort_Stadt">{changed && chosenKFZ.Stadt_Ort}</div>
        <div id="Landkreis">{changed && chosenKFZ.Landkreis}</div>
        <div id="bundesland">{changed && chosenKFZ.Bundesland}</div>
    </>
    );

}