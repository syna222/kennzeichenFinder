import { useEffect, useState, useRef } from 'react';

export default function QuizBl({allKFZ}){

    const inputRef = useRef();

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
        //input-field bei Klick auf "weiter" leeren:
        if(inputRef.current){
            inputRef.current.value = "";
        }

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
        else{
            alert("Versuche es noch einmal!");
            if(inputRef.current){
                inputRef.current.value = "";
            }
        }
    }

    return(
    <div className="quizpage-bl">
        <h1>Quiz: Kennzeichen -{'>'} Bundesland</h1>
        {isSet && <div className="frage">{`Zu welchem Bundesland gehört das Kennzeichen ${randomKFZ.Kennzeichen} ?`}</div>}
        {isSet && <div className="antwort"><input ref={inputRef} type="text" onChange={handleChange}/></div>}
        {isSet && <input className="app-button" type="button" onClick={prüfen} value="prüfen"/>}
        {isSet && <input className="app-button" type="button" onClick={chooseRandom} value="weiter"/>}
    </div>
    );
}