import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { compose } from "redux";
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase";
import UserDetailedSideBar from "./UserDetailedSiderbar";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedEvents from "./UserDetailedEvents";
import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedDescription from "./UserDetailedDescription";
import { userDetailedQuery } from "./../userQueries";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { getUserEvents } from "./../userActions";

const actions = {
  getUserEvents
};

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};
  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting
  };
};

class UserDetailedPage extends Component {
  async componentDidMount() {
    let events = await this.props.getUserEvents(this.props.userUid);
    console.log(events);
    console.log(this.props.userUid);
  }

  render() {
    const { photos, profile, auth, match, requesting } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) return <LoadingComponent />;
    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedDescription profile={profile} />
        <UserDetailedSideBar isCurrentUser={isCurrentUser} />
        {photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
        <UserDetailedEvents />
      </Grid>
    );
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);
