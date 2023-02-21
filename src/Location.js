import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";

const Location = ({ location }) => {
  return (
    <>
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={13}
        scrollWheelZoom={false}
        id="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            <span className="fw-bold">{location.city} </span>
            <br /> {location.country}
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default Location;
