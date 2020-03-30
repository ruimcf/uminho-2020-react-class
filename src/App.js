import React, { useState, useEffect } from "react";
import {
  getInterestPoints,
  createInterestPoint,
  removeInterestPoint,
} from "./api/interest-points";
import { Header, Container, Segment, Placeholder } from "semantic-ui-react";
import InterestPointsMap from "./InterestPointsMap";
import InterestPointsList from "./InteresPointsList";

function App() {
  const [isLoadingInterestPoints, setIsLoadingInterestPoints] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [viewport, setViewport] = useState({ center: null, zoom: 13 });

  const submitNewInterestPoint = (title, latitude, longitude) => {
    return createInterestPoint(title, latitude, longitude).then((interestPoint) => {
      setMarkers((prevMarkers) => [...prevMarkers, interestPoint]);
    });
  };

  const removePoint = (id) => {
    return removeInterestPoint(id).then(() => {
      setMarkers((prevMarkers) => prevMarkers.filter((point) => point.id !== id));
    });
  };

  const centerMap = (latitude, longitude) => {
    setViewport({ center: [latitude, longitude] });
  };

  useEffect(() => {
    setIsLoadingInterestPoints(true);
    getInterestPoints().then((interestPoints) => {
      setMarkers(interestPoints);

      if (interestPoints.length > 0) {
        const { latitude, longitude } = interestPoints[0];
        setViewport({ center: [latitude, longitude] });
      }

      setIsLoadingInterestPoints(false);
    });
  }, []);

  return (
    <React.Fragment>
      <Header as="h1" textAlign="center">
        Interest Points
      </Header>
      <Container>
        <Segment.Group>
          <Segment loading={isLoadingInterestPoints}>
            {isLoadingInterestPoints ? (
              <Placeholder>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            ) : (
              <InterestPointsList
                markers={markers}
                removePoint={removePoint}
                centerMap={centerMap}
              />
            )}
          </Segment>
          <Segment>
            <InterestPointsMap
              viewport={viewport}
              markers={markers}
              submitNewInterestPoint={submitNewInterestPoint}
            />
          </Segment>
        </Segment.Group>
      </Container>
    </React.Fragment>
  );
}

export default App;
