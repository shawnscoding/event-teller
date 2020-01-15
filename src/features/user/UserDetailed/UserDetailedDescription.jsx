import React from "react";
import { Grid, Header, List, Segment, Icon, Item } from "semantic-ui-react";
import format from "date-fns/format";

const UserDetailedDescription = ({ profile }) => {
  let createdAt;
  if (profile.createdAt) {
    createdAt = format(profile.createdAt.toDate(), "d MMM yyyy");
  }

  return (
    <React.Fragment>
      <Grid.Column width={12}>
        <Segment>
          <Grid columns={2}>
            <Grid.Column width={10}>
              <Header icon="smile" content={`About ${profile.displayName}`} />
              {profile.occupation ? (
                <p>
                  I am a: <strong> {profile.occupation}</strong>
                </p>
              ) : null}
              {profile.origin ? (
                <p>
                  Originally from <strong>{profile.origin}</strong>
                </p>
              ) : null}
              {createdAt ? (
                <p>
                  Member Since: <strong>{createdAt}</strong>
                </p>
              ) : null}

              <p>{profile.about}</p>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header icon="heart outline" content="Interests" />
              {profile.interests ? (
                <List>
                  {profile.interests &&
                    profile.interests.map((interest, index) => (
                      <Item key={index}>
                        <Icon name="heart" />
                        <Item.Content>{interest}</Item.Content>
                      </Item>
                    ))}
                </List>
              ) : (
                <p>No interests</p>
              )}
            </Grid.Column>
          </Grid>
        </Segment>
      </Grid.Column>
    </React.Fragment>
  );
};

export default UserDetailedDescription;
