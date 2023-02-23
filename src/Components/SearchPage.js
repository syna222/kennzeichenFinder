import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SearchPage({setChosenKFZ, chosenKFZ}){

    const [ changed, setChanged ] = useState(false);     //for conditional rendering

    function handleChange(e){
        //fetch from API:
        const input = e.target.value;
        axios.get(`https://kennzeichenapi.onrender.com/${input}`)
        .then(res => {console.log(res.data[0]); 
            setChosenKFZ(res.data[0]); 
            setChanged(true);})
        .catch(err => console.log(err))
        .then(function (json) {
         // always executed
        });
    }




    return(
    <>
        <input id="kennzeichen-suchfeld" type="text" onChange={handleChange}/>
        <input type="checkbox" />
        {/*link to InfoPage...*/}
        <div id="Ort_Stadt">{changed && chosenKFZ && <Link to="/aktuelles_kfz">{chosenKFZ.Stadt_Ort}</Link>}</div>
        <div id="Landkreis">{changed &&  chosenKFZ && chosenKFZ.Landkreis}</div>
        <div id="bundesland">{changed &&  chosenKFZ && chosenKFZ.Bundesland}</div>
    </>
    );

}