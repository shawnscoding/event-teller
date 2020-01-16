import React from "react";
import { Segment, Item, Button, List, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import LoadingComponent from "./../../../app/layout/LoadingComponent";

const PeopleProfile = ({ user, loading }) => {
  if (loading) return <LoadingComponent />;
  return (
    <Segment.Group>
      <Segment>
        <Item.Image
          size="medium"
          circular
          src={`${user.photoURL || `/assets/user.png`}`}
        />
      </Segment>
      <Segment>
        <Item>
          <Item.Content style={{ marginBottom: "8vh" }}>
            <Item.Header style={{ fontSize: "20px", padding: "0 0 1vh" }}>
              {user.displayName && user.displayName}
            </Item.Header>
            <div
              style={{ height: "2vh", padding: "0 0 3vh", textAlign: "right" }}
            >
              {user.city ? `in ${user.city}` : "unknown location"}
            </div>
            {user.interests && user.interests.length >= 2 ? (
              <Item.Description>
                <List style={{ height: "8vh" }}>
                  {user.interests &&
                    user.interests.slice(0, 2).map((interest, index) => (
                      <List.Item style={{ fontSize: "1.1rem" }} key={index}>
                        <Icon size="large" name="heart" />
                        {interest}
                      </List.Item>
                    ))}
                </List>
              </Item.Description>
            ) : (
              <Item.Description>
                <List style={{ height: "8vh" }}>
                  {user.interests &&
                    user.interests.map((interest, index) => (
                      <List.Item style={{ fontSize: "1.1rem" }} key={index}>
                        {" "}
                        <Icon size="large" name="heart" />
                        {interest}
                      </List.Item>
                    ))}
                </List>
              </Item.Description>
            )}
            <Item.Description>
              <Button
                as={Link}
                to={`/profile/${user.uid}`}
                color="teal"
                floated="right"
                content="View"
              />
            </Item.Description>
          </Item.Content>
        </Item>
      </Segment>
    </Segment.Group>
  );
};

export default PeopleProfile;
