import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { getInterestPoints, createInterestPoint } from "./api/interest-points";

function App() {
  const [isLoadingInterestPoints, setIsLoadingInterestPoints] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [newPointName, setNewPointName] = useState("");
  const [newInterestPoint, setNewInterestPoint] = useState();

  const addNewInterestPoint = () => {
    createInterestPoint(
      newPointName,
      newInterestPoint.latitude,
      newInterestPoint.longitude
    ).then((interestPoint) => {
      setNewInterestPoint(undefined);
      setMarkers((prevMarkers) => [...prevMarkers, interestPoint]);
    });
  };

  const removePoint = (id) => {
    setMarkers((prevMarkers) => prevMarkers.filter((point) => point.id !== id));
  };

  const openNewInterestPointPopup = (event) => {
    setNewInterestPoint({ latitude: event.latlng.lat, longitude: event.latlng.lng });
  };

  const handleNewPointNameChange = (event) => {
    setNewPointName(event.target.value);
  };

  useEffect(() => {
    setIsLoadingInterestPoints(true);
    getInterestPoints().then((interestPoints) => {
      setMarkers(interestPoints);
      setIsLoadingInterestPoints(false);
    });
  }, []);

  if (isLoadingInterestPoints) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <div style={{ width: "50%" }}>
        <ul>
          {markers.map((point) => {
            return (
              <li key={point.id}>
                {point.title}
                <button onClick={() => removePoint(point.id)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
      <Map
        style={{ height: "50vh", width: "50%" }}
        center={[41.1579, -8.6291]}
        zoom={13}
        maxZoom={18}
        minZoom={5}
        onclick={openNewInterestPointPopup}
      >
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
        {newInterestPoint && (
          <Popup
            key={`${newInterestPoint.latitude}-${newInterestPoint.longitude}`}
            position={[newInterestPoint.latitude, newInterestPoint.longitude]}
          >
            <input placeholder="Insert name..." onChange={handleNewPointNameChange} />
            <button onClick={addNewInterestPoint}>Add</button>
          </Popup>
        )}
      </Map>
    </div>
  );
}

export default App;
