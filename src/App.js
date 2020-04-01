import React, { useEffect, useState } from "react";
import { getInterestPoints } from "./api/interestPoints";

function App() {
  const [markers, setMarkers] = useState([]);
  const [isLoadingInterestPoints, setIsLoadingInterestPoints] = useState(false);

  useEffect(() => {
    setIsLoadingInterestPoints(true);
    getInterestPoints().then((interestPoints) => {
      setMarkers(interestPoints);
      setIsLoadingInterestPoints(false);
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
    </div>
  );
}

export default App;
