import React, { Component } from "react";
import { onAuthenticateUser } from "../event-bus.js";

class Auth extends Component {
  state = { isAuthenticated: false };

  componentDidMount() {
    this.logIn = onAuthenticateUser(() => authenticate());
  }

  authenticate() {
    this.setState({
      isAuthenticated: true
    });
  }
  signOut() {
    this.setState({
      isAuthenticated: false
    });
  }
}
export default Auth;
