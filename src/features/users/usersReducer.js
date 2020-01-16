import { createReducer } from "./../../app/common/util/reducerUtils";
import { FETCH_ALL_USERS } from "./usersConstants";

const initialState = {
  users: []
};

const fetchAllUsers = (state, payload) => {
  return {
    ...state,
    users: [...payload.users]
  };
};

export default createReducer(initialState, {
  [FETCH_ALL_USERS]: fetchAllUsers
});
