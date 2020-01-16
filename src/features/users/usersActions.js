import firebase from "./../../app/config/firebase";
import { toastr } from "react-redux-toastr";
import { FETCH_ALL_USERS } from "./usersConstants";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish
} from "./../async/asyncActions";

export const getUsersForPeoplePage = async () => {
  const firestore = firebase.firestore();
  try {
    const usersRef = await firestore.collection("users");
    const snapShot = await usersRef.get();
    const userIds = snapShot.docs.map(doc => doc.id);
    const users = await snapShot.docs.map((doc, index) => {
      const docWithUid = Object.assign(doc.data(), { uid: userIds[index] });
      return docWithUid;
    });

    return users;
  } catch (err) {
    console.log(err);
    toastr.error("Oops", "Something went wrong");
  }
};

export const syncUsersWithReducer = users => async dispatch => {
  try {
    dispatch(asyncActionStart());
    dispatch({ type: FETCH_ALL_USERS, payload: { users } });
    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError());
  }
};
