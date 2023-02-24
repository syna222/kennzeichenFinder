////DOC: https://react-leaflet.js.org/docs/start-installation/ + MapContainer has to have predefined height (vh or px)!
//Don't forget to add (to index.html): <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"  integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="  crossorigin=""/> 

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function InfoPage({chosenKFZ}){

    const longitude = chosenKFZ.Längengrad;        //state vars?
    const latitude = chosenKFZ.Breitengrad;



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
      <div><a href={chosenKFZ.Wikipedia_URL} target="_blank" rel="noopener noreferrer">Wikipedia</a></div>

    </>
    );
}