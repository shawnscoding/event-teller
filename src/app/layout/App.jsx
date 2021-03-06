import React, { Component, Fragment } from "react";
import EventDashboard from "./../../features/event/EventDashboard/EventDashboard";
import NavBar from "../../features/Nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";
import HomePage from "./../../features/home/HomePage";
import EventDetailedPage from "./../../features/event/EventDetailed/EventDetailedPage";
import PeopleDashboard from "./../../features/user/PeopleDashboard/PeopleDashboard";
import SettingsDashboard from "./../../features/user/Settings/SettingsDashboard";
import UserDetailedPage from "./../../features/user/UserDetailed/UserDetailedPage";
import EventForm from "../../features/event/EventForm/EventForm";
import ModalManager from "../../features/modals/ModalManager";
import { UserIsAuthenticated } from "../../features/auth/authWrapper";
import MyEventsPage from "./../../features/user/MyEvents/MyEventsPage";
import NotFound from "./NotFound";

class App extends Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <Route path="/" exact component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <NavBar />
              <Container className="main">
                <Switch key={this.props.location.key}>
                  <Route exact path="/events" component={EventDashboard} />
                  <Route path="/event/:id" component={EventDetailedPage} />
                  <Route
                    path={["/createEvent", "/manage/:id"]}
                    component={UserIsAuthenticated(EventForm)}
                  />

                  <Route
                    path="/people"
                    component={UserIsAuthenticated(PeopleDashboard)}
                  />
                  <Route
                    path="/profile/:id"
                    component={UserIsAuthenticated(UserDetailedPage)}
                  />
                  <Route
                    path="/settings"
                    component={UserIsAuthenticated(SettingsDashboard)}
                  />
                  <Route
                    path="/myEvents/:id"
                    component={UserIsAuthenticated(MyEventsPage)}
                  />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);
