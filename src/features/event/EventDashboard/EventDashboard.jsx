import React, { Component } from "react";
import { Grid, Loader } from "semantic-ui-react";
import EventList from "./../EventList/EventList";
import { connect } from "react-redux";
import { getEventForDashboard } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "./../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  getEventForDashboard
};

class EventDashboard extends Component {
  state = {
    moreEvents: false,
    loadingInitial: true,
    loadedEvents: []
  };

  async componentDidMount() {
    let next = await this.props.getEventForDashboard();
    // console.log("componentdidmounnt");
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInitial: false
      });
    }
  }

  componentDidUpdate = prevProps => {
    // console.log(this.state.loadedEvents);
    if (this.props.events !== prevProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...this.props.events]
      });
    }
  };

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    // console.log(lastEvent);
    let next = await this.props.getEventForDashboard(lastEvent);
    // console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  render() {
    const { loading } = this.props;
    const { moreEvents, loadedEvents } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent />;
    else {
      return (
        <Grid>
          <Grid.Column width={10}>
            <EventList
              loading={loading}
              moreEvents={moreEvents}
              getNextEvents={this.getNextEvents}
              events={loadedEvents}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <EventActivity />
          </Grid.Column>
          <Grid.Column>
            <Loader active={loading} />
          </Grid.Column>
        </Grid>
      );
    }
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
