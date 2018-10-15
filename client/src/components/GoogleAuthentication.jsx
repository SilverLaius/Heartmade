import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import "./GoogleAuthenticator.css";

class GoogleAuthentication extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    firstName: "",
    lastName: "",
    email: ""
  };

  responseGoogle = response => {
    if (response.hasOwnProperty("error")) {
      console.log("error: " + response.error);
      return;
    }
    const userID = response.profileObj.googleId;
    const firstName = response.profileObj.givenName;
    const lastName = response.profileObj.familyName;
    const email = response.profileObj.email;
    this.setState({
      isLoggedIn: true,
      userID,
      firstName,
      lastName,
      email
    });
    this.props.onUserLoggedIn(response);
  };

  render() {
    return (
      <GoogleLogin
        className="login-button"
        clientId="448651075955-j4oos6j3hrsnuqq20ggejhmhj2pd86in.apps.googleusercontent.com"
        buttonText=""
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }
}

export default GoogleAuthentication;
