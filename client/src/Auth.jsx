import React, { Component } from "react";

class Auth extends Component {
  state = { isAuthenticated: false };

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
