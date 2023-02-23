import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NaBu({allKFZ}){

    const [ sortedKFZ, setSortedKFZ ] = useState();

    function compareBL(a, b){
        if(a.Bundesland < b.Bundesland){
          return -1;
        }
        if(a.Bundesland > b.Bundesland){
          return 1;
        }
        return 0;
      }

    useEffect(() => {
        const sortCopyKFZ = [...allKFZ];
        sortCopyKFZ.sort(compareBL);
        setSortedKFZ(sortCopyKFZ);

    }, []);




    return(
    <>
        <h1>Kennzeichen nach Bundesland:</h1>
        <ul>{sortedKFZ && sortedKFZ.map((kfz, i) => <li key={i}>{`${kfz.Kennzeichen}, ${kfz.Stadt_Ort}, ${kfz.Landkreis}, ${kfz.Bundesland.toUpperCase()}`}</li>)}</ul>

    </>
    );
}