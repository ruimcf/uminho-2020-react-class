import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import {
  getInterestPoints,
  createInterestPoint,
  removeInterestPoint,
} from "./api/interest-points";
import {
  List,
  Button,
  Header,
  Container,
  Segment,
  Placeholder,
  Form,
} from "semantic-ui-react";

function App() {
  const [isLoadingInterestPoints, setIsLoadingInterestPoints] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [newInterestPoint, setNewInterestPoint] = useState();

  const handleNewPointSubmit = (event) => {
    event.preventDefault();

    createInterestPoint(
      newInterestPoint.title,
      newInterestPoint.latitude,
      newInterestPoint.longitude
    ).then((interestPoint) => {
      setNewInterestPoint(undefined);
      setMarkers((prevMarkers) => [...prevMarkers, interestPoint]);
    });
  };

  const removePoint = (id) => {
    removeInterestPoint(id).then(() => {
      setMarkers((prevMarkers) => prevMarkers.filter((point) => point.id !== id));
    });
  };

  const openNewInterestPointPopup = (event) => {
    setNewInterestPoint({
      title: "",
      latitude: event.latlng.lat,
      longitude: event.latlng.lng,
    });
  };

  const handleNewPointTitleChange = (event) => {
    setNewInterestPoint({ ...newInterestPoint, title: event.target.value });
  };

  useEffect(() => {
    setIsLoadingInterestPoints(true);
    getInterestPoints().then((interestPoints) => {
      setMarkers(interestPoints);
      setIsLoadingInterestPoints(false);
    });
  }, []);

  return (
    <div>
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
              <List verticalAlign="middle">
                {markers.map((point) => {
                  return (
                    <List.Item key={point.id}>
                      <List.Content floated="right">
                        <Button
                          icon="trash"
                          color="red"
                          onClick={() => removePoint(point.id)}
                        ></Button>
                      </List.Content>
                      <List.Icon name="marker" />
                      <List.Content>{point.title}</List.Content>
                    </List.Item>
                  );
                })}
              </List>
            )}
          </Segment>
          <Segment>
            <Map
              style={{ height: "50vh", width: "100%" }}
              center={markers.length && [markers[0].latitude, markers[0].longitude]}
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
                  <Form onSubmit={handleNewPointSubmit}>
                    <Form.Input
                      autoFocus
                      type="text"
                      placeholder="Insert name..."
                      value={newInterestPoint.title}
                      onChange={handleNewPointTitleChange}
                      action="Add"
                    />
                  </Form>
                </Popup>
              )}
            </Map>
          </Segment>
        </Segment.Group>
      </Container>
    </div>
  );
}

export default App;
