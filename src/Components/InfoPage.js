////DOC: https://react-leaflet.js.org/docs/start-installation/ + MapContainer has to have predefined height (vh or px)!
//Don't forget to add (to index.html): <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"  integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="  crossorigin=""/> 

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function InfoPage({chosenKFZ}){

    const longitude = chosenKFZ.Längengrad;        //state vars?
    const latitude = chosenKFZ.Breitengrad;
    const [ fläche, setFläche ] = useState();
    const [ einwohner, setEinwohner ] = useState();

    useEffect(() => { 
      //console.log(chosenKFZ.Stadt_Ort);
      //const ortsname = "Wolfratshausen";
      axios
      .get(`https://de.wikipedia.org/w/api.php?action=parse&page=${chosenKFZ.Stadt_Ort}&format=json&origin=*`)
      .then((res) => {
        const baseText = res.data.parse.text["*"];
        const regexFläche = /Fläche<\/a>:\s*<\/td>\s*<td>([0-9]{0,5}\.*[0-9]{1,5}\,[0-9]{0,5})/;
        const regexEinwohner = /Einwohner(?:<\/a>)?:\\*n*\s*<\/td>\s?\\*n*<td(?: style="line-height: 1.2em;")?>(\d{0,4}(?:\.\d{0,3})?(?:\.\d{0,3})?)/;
        //console.log("regexFläche is:", regexFläche); 
        //console.log("regexEinwohner is:", regexEinwohner);  
        const matchFläche = regexFläche.exec(baseText);
        const matchEinwohner = regexEinwohner.exec(baseText);
        if(matchFläche){
          const matchTextFl= matchFläche[1];
          //console.log(matchTextFl);
          setFläche(matchTextFl);
        }
        if(matchEinwohner){
          const matchTextEi = matchEinwohner[1];
          //console.log(matchTextEi);
          setEinwohner(matchTextEi);
        }
      })
      .catch((err) => console.log(err))
    }, [chosenKFZ])



    return (
    <>
        <h1>{chosenKFZ.Stadt_Ort}</h1>
        <MapContainer id="map-container" center={[longitude, latitude]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[longitude, latitude]}/>
      </MapContainer>
      <h2>Infos:</h2>
      {fläche && <div>Fläche: {fläche} km^2</div>}
      {einwohner && <div>Einwohner: {einwohner}</div>}
      <div><a href={chosenKFZ.Wikipedia_URL} target="_blank" rel="noopener noreferrer">Wikipedia</a></div>


    </>
    );
}