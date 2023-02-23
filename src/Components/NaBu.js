import { useState, useEffect } from 'react';

export default function NaBu({KFZSortedBL}){

    let listeBundesländer = [{name:"Baden-Württemberg", kfzs:[]}, {name:"Bayern", kfzs:[]}, {name:"Berlin", kfzs:[]}, {name: "Brandenburg", kfzs:[]}, {name:"Bremen", kfzs:[]}, {name:"Hamburg", kfzs:[]}, {name:"Hessen", kfzs:[]}, {name:"Mecklenburg-Vorpommern", kfzs:[]}, {name:"Niedersachsen", kfzs:[]}, {name:"Nordrhein-Westfalen", kfzs:[]}, {name:"Rheinland-Pfalz", kfzs:[]}, {name:"Saarland", kfzs:[]}, {name:"Sachsen", kfzs:[]}, {name:"Sachsen-Anhalt", kfzs:[]}, {name:"Schleswig-Holstein", kfzs:[]}, {name:"Thüringen", kfzs:[]}];
    const [ bundesländer, setBundesländer ] = useState();

    useEffect(() => {
        //listeBundesländer durchlaufen, für jedes die jeweiligen aus KFZSortedBL rausziehen und in kfzs-feld speichern:
        listeBundesländer.forEach((bu) => {
            const bundesland = bu.name;
            const results = KFZSortedBL.filter((obj) => obj.name === bundesland);
            bu.kfzs = results;
        });
        //listeBundesländer als state-var setzen:
        setBundesländer(listeBundesländer);
    },[]);






    return(
    <>
        <h1>Kennzeichen nach Bundesland:</h1>

        {KFZSortedBL && bundesländer && bundesländer.map((bu, i) => <h2 key={i}>{bu.name}</h2>)}



        {/*listeBundesländer.map((bu, i) => <h2 key={i}>{bu.name}</h2>)*/}
        {/*<ul>{KFZSortedBL && KFZSortedBL.map((kfz, i) => <li key={i}>{`${kfz.Kennzeichen}, ${kfz.Stadt_Ort}, ${kfz.Landkreis}, ${kfz.Bundesland.toUpperCase()}`}</li>)}</ul>*/}

    </>
    );
}