import './Map.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet';
import firebaseService from '../../services/firebase/firebase-service';
import { useEffect, useState } from 'react';
const icon = L.icon({ iconUrl: iconMarker });
function Map() {
  const center = [14.487058, 121.045028];
  const [data, setData] = useState([]);
  useEffect(() => {
    firebaseService.getAll().on('value', (snapshot) => {
      snapshot &&
        snapshot.forEach((data) => {
          const dataVal = data.val();
          setData((prev) => {
            return [
              ...prev,
              {
                id: data.key,
                plateNumber: dataVal.plateNumber,
                description: dataVal.description,
                eventType: dataVal.eventType,
                location: dataVal.location,
              },
            ];
          });
        });
    });
  }, []);
  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {data.map((value, index) => {
          return (
            <Marker key={index} position={value.location} icon={icon}>
              <Popup>
                <div>
                  <span>
                    <b>PLATE NUMBER: </b>
                  </span>
                  {value.plateNumber}
                </div>
                <div>
                  <span>
                    <b>EVENT TYPE: </b>
                  </span>
                  {value.eventType}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;
