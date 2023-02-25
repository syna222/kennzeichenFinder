import { useEffect, useState } from 'react';

export default function QuizBl({allKFZ}){

    const [ randomKFZ, setRandomKFZ ] = useState({});
    const [ bundesland, setBundesland ] = useState();
    const [isSet, setIsSet ] = useState(false);     //for conditional rendering of randomKFZ
    const [ userInput, setUserInput ] = useState();     //für aktuellen User-Input, dieser wird erst bei Klick auf "prüfen" als Antwort gesetzt
    const [ userAntwort, setUserAntwort ] = useState();

    function chooseRandom(){
        //randomly choose kennzeichen from all KFZ
        const maxNum = allKFZ.length;
        const randInd = Math.floor(Math.random() * maxNum);
        setRandomKFZ(allKFZ[randInd]);
        setIsSet(true);
        //input-feld leeren?:
        
    }

    useEffect(() => {
        chooseRandom();
    },[]);

    useEffect(() =>  {
        //Lösung zur Frage setzen:
        setBundesland(randomKFZ.Bundesland);
    }, [randomKFZ])

    useEffect(() => {
        //userInput als definitive Antwort setzen:
        setUserAntwort(userInput);
    }, [userInput])


    function handleChange(e){
        setUserInput(e.target.value);
    }

    function prüfen(){
        if(userAntwort === bundesland){
            alert("Korrekte Antwort!");
        }
    }

    return(
    <>
        <h1>Quiz: Kennzeichen -{'>'} Bundesland</h1>
        {!isSet && <input type="button" onClick={chooseRandom} value="start"/>}
        {isSet && <div className="frage">{`Zu welchem Bundesland gehört das Kennzeichen ${randomKFZ.Kennzeichen} ?`}</div>}
        {isSet && <div className="antwort"><input type="text" onChange={handleChange}/></div>}
        {isSet && <input type="button" onClick={prüfen} value="prüfen"/>}
        {isSet && <input type="button" onClick={chooseRandom} value="weiter"/>}
    </>
    );
}