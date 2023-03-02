////DOC: https://react-leaflet.js.org/docs/start-installation/ + MapContainer has to have predefined height (vh or px)!
//Don't forget to add (to index.html): <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"  integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="  crossorigin=""/> 

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

export default function DKarte({geseheneKFZ}){




    return(
    <>
        <h1>Deutschlandkarte (gesehene Kennzeichen)</h1>
        <MapContainer id="map-container" center={[51.1586258,10.445921]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/*<Marker position={[]}/>*/}
        {geseheneKFZ.map((kfz, i) => 
          <Marker key={i} position={[kfz.Längengrad, kfz.Breitengrad]} >
            <Tooltip>{kfz.Stadt_Ort}</Tooltip>
          </Marker>
          )}
      </MapContainer>
    </>
    );
}


