import React from "react";
import { List, Button } from "semantic-ui-react";

const InterestPointsList = ({ markers, centerMap, removePoint }) => {
  return (
    <List divided selection>
      {markers.map((point) => {
        return (
          <List.Item
            key={point.id}
            onClick={() => centerMap(point.latitude, point.longitude)}
          >
            <List.Content floated="right">
              <Button
                inverted
                icon="trash"
                color="red"
                onClick={(event) => {
                  event.stopPropagation();
                  removePoint(point.id);
                }}
              ></Button>
            </List.Content>
            <List.Content>
              <List.Header>{point.title}</List.Header>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default InterestPointsList;
