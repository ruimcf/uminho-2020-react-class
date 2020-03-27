import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet'
import { getInterestPoints, createInterestPoint } from './api/interest-points';


function App() {
  const [markers, setMarkers] = useState([]);
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")

  const addNewPoint = () => {
    createInterestPoint("new interest", latitude, longitude).then(interestPoint => {
      setMarkers(prevMarkers => [...prevMarkers, interestPoint])
    })
  }

  const removePoint = id => {
    setMarkers(prevMarkers => prevMarkers.filter(point => point.id !== id))
  }
  
  const handleClick = event => {
    createInterestPoint("new interest", event.latlng.lat, event.latlng.lng)
      .then(interestPoint => {
        setMarkers(prevMarkers => [...prevMarkers, interestPoint])
      })
  } 

  useEffect(() => {
    getInterestPoints().then(interestPoints => {
      setMarkers(interestPoints);
    })
  }, [])

    return (
      <div style={{height:"100vh", display: "flex", alignItems:"center"}}>

      <div style={{ width: "50%"}}>
        <input placeholder="latitude" value={latitude} onChange={evt => console.log("called onChange") || setLatitude(evt.target.value)}/>
        <input  placeholder="longitude" value={longitude} onChange={evt => setLongitude(evt.target.value)}/>
        <button onClick={addNewPoint} disabled={latitude === null || longitude === null}>Add Point</button>
        <ul>
          {markers.map(point => {
            return <li>latitude: {point.latitude}; longitude: {point.longitude} <button onClick={() => removePoint(point.id)}>Remove</button></li>
          })}
        </ul>
      </div>
      <Map style={{ height: "50vh", width:"50%"}} center={[41.1579, -8.6291]} zoom={13} maxZoom={18} minZoom={5} onclick={handleClick}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          id='mapbox/streets-v11'
          tileSize={512}
          zoomOffset={-1}
          maxZoom={18}
          accessToken='pk.eyJ1IjoicnVpLWZvbnNlY2EiLCJhIjoiY2s4YTJpN3R2MDBscDNtbXhqeGM3emdndiJ9.3LJzQcbcLzQP1evTVWItOQ'
          />
          {markers.map(({latitude, longitude, title, id}) => {
            return (<Marker key={id} position={[latitude, longitude]}>
            <Popup>
              {title}
            </Popup>
          </Marker>);
          })}
      </Map>
          </div>
    )
}

export default App;
