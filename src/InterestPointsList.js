import React from "react";
import { List } from "semantic-ui-react";

const InterestPointsList = ({ markers, centerMap }) => {
  return (
    <List divided selection>
      {markers.map((point) => {
        return (
          <List.Item
            key={point.id}
            onClick={() => centerMap(point.latitude, point.longitude)}
          >
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
