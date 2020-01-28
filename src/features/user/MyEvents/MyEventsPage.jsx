import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import { compose } from "redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import { userDetailedQuery } from "./../userQueries";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { getUserEvents } from "./../userActions";
import UserDetailedEvents from "./../UserDetailed/UserDetailedEvents";

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
    requesting: state.firestore.status.requesting,
    eventsLoading: state.async.loading,
    events: state.events.userEvents
  };
};

class MyEventsPage extends Component {
  async componentDidMount() {
    await this.props.getUserEvents(this.props.userUid);
  }

  changeTab = (e, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex);
  };

  render() {
    const { requesting, eventsLoading, events } = this.props;
    const loading = Object.values(requesting).some(a => a === true);
    if (loading) return <LoadingComponent />;
    return (
      <Grid>
        <UserDetailedEvents
          events={events}
          eventsLoading={eventsLoading}
          changeTab={this.changeTab}
        />
      </Grid>
    );
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(MyEventsPage);
