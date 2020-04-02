import React, { useEffect, useState } from "react";
import { getInterestPoints } from "./api/interestPoints";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "./App.css";

function App() {
  const [markers, setMarkers] = useState([]);
  const [viewport, setViewport] = useState({ center: null, zoom: 13 });
  const [isLoadingInterestPoints, setIsLoadingInterestPoints] = useState(false);

  useEffect(() => {
    setIsLoadingInterestPoints(true);
    getInterestPoints().then((interestPoints) => {
      setMarkers(interestPoints);
      setIsLoadingInterestPoints(false);

      if (interestPoints.length > 0) {
        const { latitude, longitude } = interestPoints[0];
        setViewport({ center: [latitude, longitude] });
      }
    });
  }, []);

  return (
    <div>
      <h1>Interest Points</h1>
      {isLoadingInterestPoints ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {markers.map((point) => {
            return (
              <li>
                {point.title}: [{point.latitude}, {point.longitude}]
              </li>
            );
          })}
        </ul>
      )}
      <Map className="map" viewport={viewport} maxZoom={18} minZoom={5}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          id="mapbox/streets-v11"
          tileSize={512}
          zoomOffset={-1}
          maxZoom={18}
          accessToken="pk.eyJ1IjoicnVpLWZvbnNlY2EiLCJhIjoiY2s4YTJpN3R2MDBscDNtbXhqeGM3emdndiJ9.3LJzQcbcLzQP1evTVWItOQ"
        />
        {markers.map(({ latitude, longitude, title, id }) => {
          return (
            <Marker key={id} position={[latitude, longitude]}>
              <Popup>{title}</Popup>
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}

export default App;
