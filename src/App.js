import React, { useEffect, useState } from "react";
import { getInterestPoints, createInterestPoint } from "./api/interestPoints";
import InterestPointsMaps from "./InterestPointsMap";
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

  const submitNewInterestPoint = (title, latitude, longitude) => {
    return createInterestPoint(title, latitude, longitude).then((interestPoint) => {
      setMarkers((prevMarkers) => [...prevMarkers, interestPoint]);
    });
  };

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
      <InterestPointsMaps
        viewport={viewport}
        markers={markers}
        submitNewInterestPoint={submitNewInterestPoint}
      />
    </div>
  );
}

export default App;
