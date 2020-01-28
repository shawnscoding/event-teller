import React from "react";
import PeopleProfile from "./PeopleProfile";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getUsersForPeoplePage,
  syncUsersWithReducer
} from "./../../users/usersActions";

const mapState = state => ({
  users: state.users.users,
  loading: state.async.loading
});

const actions = {
  syncUsersWithReducer
};

class PeopleDashboard extends React.Component {
  async componentDidMount() {
    const { syncUsersWithReducer } = this.props;
    const users = await getUsersForPeoplePage();
    syncUsersWithReducer(users);
  }

  render() {
    const { users, loading } = this.props;
    return (
      <React.Fragment>
        <Grid>
          {users &&
            users.map((user, index) => (
              <Grid.Column key={index} width={4}>
                <PeopleProfile user={user} loading={loading} />
              </Grid.Column>
            ))}
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(mapState, actions)(PeopleDashboard);
