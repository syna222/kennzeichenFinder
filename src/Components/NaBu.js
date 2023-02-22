import { useEffect, useState } from 'react';
import axios from 'axios';


export default function NaBu({allKFZ}){

    let listeBundesländer = [{name:"Baden-Württemberg", kfzs:[]}, {name:"Bayern", kfzs:[]}, {name:"Berlin", kfzs:[]}, {name: "Brandenburg", kfzs:[]}, {name:"Bremen", kfzs:[]}, {name:"Hamburg", kfzs:[]}, {name:"Hessen", kfzs:[]}, {name:"Mecklenburg-Vorpommern", kfzs:[]}, {name:"Niedersachsen", kfzs:[]}, {name:"Nordrhein-Westfalen", kfzs:[]}, {name:"Rheinland-Pfalz", kfzs:[]}, {name:"Saarland", kfzs:[]}, {name:"Sachsen", kfzs:[]}, {name:"Sachsen-Anhalt", kfzs:[]}, {name:"Schleswig-Holstein", kfzs:[]}, {name:"Thüringen", kfzs:[]}];
    const [ bundesländer, setBundesländer ] = useState([]);
    const [ isSet, setIsSet ] = useState(false);


    useEffect(() => {
        //fetch for every bundesland from "https://kennzeichenapi.onrender.com/bundesland/X":
        listeBundesländer.forEach((bu) => {
            //console.log("Liste des Bundeslandes: ", Object.kfzs);
            const URL = `https://kennzeichenapi.onrender.com/bundesland/${bu.name}`;
            axios.get(URL)
            .then(res => {
                console.log(URL); 
                console.log(bu, res.data);      //hiernach res.data-Array abgreifen und in kfzs:[] des jew. Bu 
                listeBundesländer.find((obj, i) => {
                    if(obj.name === bu.name){ 
                        listeBundesländer[i].kfzs = res.data; 
                       console.log(listeBundesländer[i])
                        return true;
                    }
                    return false;
                })
            })       
            .catch(err => console.log(err))
            .then(function (json) {
             // always executed
            })
        });
        setBundesländer(listeBundesländer);
        setIsSet(true);
    },[]);

    console.log("test nach useEffect, listeBundesländer ist: ", listeBundesländer)

    return(
    <>
        <h1>Kennzeichen nach Bundesland:</h1>
        {isSet && bundesländer.length && bundesländer.map((bu,i) => <div key={i}><h2>{bu.name}</h2><ul>{bu.kfzs.length && bu.kfzs.map((kfz, j) => <li key={j}>{`${kfz.Kennzeichen}, ${kfz.Stadt_Ort}`}</li>)}</ul></div>)}
    </>
    );
}