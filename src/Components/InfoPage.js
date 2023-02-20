import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function InfoPage({chosenKFZ}){

    const longitude = chosenKFZ.Längengrad;        //state vars?
    const latitude = chosenKFZ.Breitengrad;



    return (
    <>
        <MapContainer id="map-container" center={[longitude, latitude]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[longitude, latitude]}>
          {/*<Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>*/}
        </Marker>
      </MapContainer>

    </>
    );
}