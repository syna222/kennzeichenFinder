
export default function NaBu({ bundesländer }) {

  //console.log("bundesländer", bundesländer);

  return (
    <>
      <h1>Kennzeichen nach Bundesland:</h1>
      {bundesländer && bundesländer.map((bu, i) => <div key={i}><h2>{bu.name}</h2><ul>{bu.kfzs.length && bu.kfzs.map((kfz, j) => <li key={j}>{`${kfz.Kennzeichen}, ${kfz.Stadt_Ort}`}</li>)}</ul></div>)}
    </>
  );
}
