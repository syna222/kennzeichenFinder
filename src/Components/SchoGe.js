
export default function SchoGe({geseheneKFZ, geseheneCount, gesamtCount}){

    return(
    <>
        <h1>Schon gesehene Kennzeichen: </h1>
        <h2>({geseheneCount}/{gesamtCount})</h2>
        <ul>
            {geseheneKFZ && geseheneKFZ.map((kfz, i) => <li key={i}>{`${kfz.Kennzeichen}, ${kfz.Stadt_Ort}, ${kfz.Landkreis}, ${kfz.Bundesland}`}</li>)}
        </ul>
    </>);
}