import React, { Component } from "react";
import { connect } from "react-redux";
import { decrementAsync, incrementAsync } from "./testActions";
import { Button, Header } from "semantic-ui-react";
import TestPlaceInput from "./TestPlaceInput";
import { openModal } from "./../modals/modalActions";
import firebase from "../../app/config/firebase";
import { toastr } from "react-redux-toastr";

const mapState = state => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName
});

const actions = {
  decrementAsync,
  incrementAsync,
  openModal
};

class TestComponent extends Component {
  handleTestUpdateProfile = async () => {
    const firestore = firebase.firestore();
    // doc = diana's userUid
    let userDocRef = await firestore
      .collection("users")
      .doc("LnZlS5BJRtNg4peRVZs8Nu6gIhb2");
    try {
      await userDocRef.update({ displayName: "testing" });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  handleCreateTestEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection("events").doc("DELETEME");
    try {
      await eventDocRef.set({
        title: "DELETEME"
      });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  handleTestJoinEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection("events").doc("DELETEME");
    const attendee = {
      photoURL: "/assets/user.png",
      displayName: "Testing"
    };
    try {
      await eventDocRef.update({
        [`attendees.LnZlS5BJRtNg4peRVZs8Nu6gIhb2`]: attendee
      });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  handleTestCancelGoingToEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection("events").doc("DELETEME");
    try {
      await eventDocRef.update({
        [`attendees.LnZlS5BJRtNg4peRVZs8Nu6gIhb2`]: firebase.firestore.FieldValue.delete()
      });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  handleTestChangeAttendeePhotoInEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection("events").doc("DELETEME");
    try {
      await eventDocRef.update({
        [`attendees.LnZlS5BJRtNg4peRVZs8Nu6gIhb2.photoURL`]: "testing123.jpg"
      });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  render() {
    const {
      data,
      decrementAsync,
      loading,
      incrementAsync,
      openModal,
      buttonName
    } = this.props;
    return (
      <div>
        <h1>Test Component</h1>
        <h3>The answer is: {data} </h3>
        <Button
          name="increment"
          loading={buttonName === "increment" && loading}
          onClick={e => incrementAsync(e.target.name)}
          positive
          content="Increment"
        />
        <Button
          name="decrement"
          loading={buttonName === "decrement" && loading}
          onClick={e => decrementAsync(e.target.name)}
          negative
          content="Decrement"
        />
        <Button
          onClick={() => openModal("TestModal", { data: 42 })}
          color="teal"
          content="Open Modal"
        />
        <br />
        <br />

        <Header as="h2" content="Permissions tests" />
        <Button
          onClick={this.handleCreateTestEvent}
          color="blue"
          fluid
          content="Test create event - should fail if anon"
        />
        <Button
          onClick={this.handleTestUpdateProfile}
          color="orange"
          fluid
          content="Test update dianas profile - should fail if anon/not diana - should succeed if diana"
        />
        <Button
          onClick={this.handleTestJoinEvent}
          color="olive"
          fluid
          content="Test joining an event - should fail if anon/not diana - should succeed if diana"
        />
        <Button
          onClick={this.handleTestCancelGoingToEvent}
          color="purple"
          fluid
          content="Test cancelling attendance to an event - should fail if anon/not diana - should succeed if diana"
        />
        <Button
          onClick={this.handleTestChangeAttendeePhotoInEvent}
          color="violet"
          fluid
          content="Test changing photo for event attendee - should fail if anon/not diana - should succeed if diana"
        />
        <br />
        <br />
        <TestPlaceInput />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
