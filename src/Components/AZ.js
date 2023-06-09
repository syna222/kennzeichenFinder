
export default function AZ({allKFZ}){

    return(
    <>
        <h1>Kennzeichen A-Z:</h1>
        <ul>
            {allKFZ && allKFZ.map((kfz, i) => <li key={i}>{`${kfz.Kennzeichen}, ${kfz.Stadt_Ort}, ${kfz.Landkreis}, ${kfz.Bundesland}`}</li>)}
        </ul>
    </>
    );
}