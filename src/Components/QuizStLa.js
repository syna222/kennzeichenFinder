import { useEffect, useState } from 'react';

export default function QuizStLa({allKFZ}){

    const [ randomKFZ, setRandomKFZ ] = useState();
    const [ ort, setOrt ] = useState();
    const [isSet, setIsSet ] = useState(false);     //for conditional rendering of randomKFZ
    const [ userInput, setUserInput ] = useState();     //für aktuellen User-Input, dieser wird erst bei Klick auf "prüfen" als Antwort gesetzt
    const [ userAntwort, setUserAntwort ] = useState();


    function chooseRandom(){
        //randomly choose kennzeichen from all KFZ
        const maxNum = allKFZ.length;
        const randInd = Math.floor(Math.random() * maxNum);
        setRandomKFZ(allKFZ[randInd]);
        setIsSet(true);
    }

    function handleChange(e){
        setUserInput(e.target.value);
    }

    function prüfen_zwei(){
        if(userAntwort === ort){
            alert("Korrekte Antwort!");
        }
    }

    function prüfen(){
        //userInput als Antwort setzen:
        setUserAntwort(userInput);
        //richtige Antwort setzen:
        const ort = randomKFZ.Stadt_Ort;
        setOrt(ort);
        //hier abgleich mit user-antwort! auslagern in eigene funktion, weil userAntwort noch nicht neu gesetzt (zu lahm)
        prüfen_zwei();

    }

    return(
    <>
        <h1>Quiz: Kennzeichen -{'>'} Stadt/Landkreis</h1>
        {!isSet && <input type="button" onClick={chooseRandom} value="start"/>}
        {isSet && <div className="frage">{`Zu welchem Ort gehört das Kennzeichen ${randomKFZ.Kennzeichen} ?`}</div>}
        {isSet && <div className="antwort"><input type="text" onChange={handleChange}/></div>}
        {isSet && <input type="button" onClick={prüfen} value="prüfen"/>}
        {isSet && <input type="button" onClick={chooseRandom} value="weiter"/>}
    </>
    );
}