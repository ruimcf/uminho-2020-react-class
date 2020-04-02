import React, { useEffect, useState } from "react";
import { getInterestPoints, createInterestPoint } from "./api/interestPoints";
import InterestPointsMaps from "./InterestPointsMap";
import {
  List,
  Header,
  Container,
  Segment,
  Placeholder,
  SegmentGroup,
} from "semantic-ui-react";
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
      <Header as="h1" textAlign="center">
        Interest Points
      </Header>
      <Container>
        <SegmentGroup>
          <Segment loading={isLoadingInterestPoints}>
            {isLoadingInterestPoints ? (
              <Placeholder>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder>
            ) : (
              <List divided>
                {markers.map((point) => {
                  return (
                    <List.Item key={point.id}>
                      <List.Content>{point.title}</List.Content>
                    </List.Item>
                  );
                })}
              </List>
            )}
          </Segment>
          <Segment>
            <InterestPointsMaps
              viewport={viewport}
              markers={markers}
              submitNewInterestPoint={submitNewInterestPoint}
            />
          </Segment>
        </SegmentGroup>
      </Container>
    </div>
  );
}

export default App;
