import { useState, useEffect } from "react";

export default function NaBu({ KFZSortedBL }) {
  let listeBundesländer = [
    { name: "Baden-Württemberg", kfzs: [] },
    { name: "Bayern", kfzs: [] },
    { name: "Berlin", kfzs: [] },
    { name: "Brandenburg", kfzs: [] },
    { name: "Bremen", kfzs: [] },
    { name: "Hamburg", kfzs: [] },
    { name: "Hessen", kfzs: [] },
    { name: "Mecklenburg-Vorpommern", kfzs: [] },
    { name: "Niedersachsen", kfzs: [] },
    { name: "Nordrhein-Westfalen", kfzs: [] },
    { name: "Rheinland-Pfalz", kfzs: [] },
    { name: "Saarland", kfzs: [] },
    { name: "Sachsen", kfzs: [] },
    { name: "Sachsen-Anhalt", kfzs: [] },
    { name: "Schleswig-Holstein", kfzs: [] },
    { name: "Thüringen", kfzs: [] },
  ];
  const [bundesländer, setBundesländer] = useState([]);

  useEffect(() => {
    //listeBundesländer durchlaufen, für jedes die jeweiligen aus KFZSortedBL rausziehen und in kfzs-feld speichern:
    listeBundesländer.forEach((bu, i) => {
      const bundesland = bu.name;
      const results = KFZSortedBL.filter((obj) => obj.Bundesland === bundesland);
      //bu.kfzs = results; das funktioniert nicht, weil bu.kfzs nicht der tatsächliche Objekt-Teil ist!!
      listeBundesländer[i].kfzs = results;
    });
    //listeBundesländer als state-var setzen:
    //console.log("listeBundesländer: ", listeBundesländer);        //stimmt!
    setBundesländer(listeBundesländer);
  }, []);

  console.log("bundesländer", bundesländer);
  //console.log("kfzsorted", KFZSortedBL);

  return (
    <>
      <h1>Kennzeichen nach Bundesland:</h1>
      {KFZSortedBL && bundesländer && bundesländer.map((bu, i) => <div key={i}><h2>{bu.name}</h2><ul>{bu.kfzs.length && bu.kfzs.map((kfz, j) => <li key={j}>{`${kfz.Kennzeichen}, ${kfz.Stadt_Ort}`}</li>)}</ul></div>)}
    </>
  );
}
