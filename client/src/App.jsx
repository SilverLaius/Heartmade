import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Startseite from "./components/Startseite";
import Über from "./components/Über";
import Buch from "./components/Buch";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Epood from "./components/Epood1";
import Piltpais from "./components/Piltpais";
import Blog from "./components/Blog";
import Shop from "./components/Shop";
import Gratis from "./components/Gratis";
import Häkelkurs from "./components/Häkelkurs";
import Anmelden from "./components/Anmelden";
import Register from "./components/Register";
import Statistics from "./components/Statistics";
import { routeApplicationPart } from "./RouteWrapper";
import { onAuthenticateUser } from "./event-bus";

class App extends Component {
  state = {
    isAuthenticated: false
  };

  componentDidMount() {
    this.subscription = onAuthenticateUser(() =>
      this.setState({ isAuthenticated: true })
    );
  }

  authenticate = () => {
    this.setState({
      isAuthenticated: true
    });
  };

  signOut = () => {
    this.setState({
      isAuthenticated: false
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Searchbar
            onLogin={this.authenticate}
            onLogOut={this.signOut}
            auth={this.state.isAuthenticated}
          />
          <Anmelden />
          <Register />
          <Piltpais />
          <Navbar />
          <Route
            exact
            path="/"
            component={routeApplicationPart(Startseite, "Startseite")}
          />
          <Route
            path="/statistics"
            component={routeApplicationPart(Statistics, "Statistics")}
          />
          <Route path="/über" component={routeApplicationPart(Über, "Über")} />
          <Route path="/buch" component={routeApplicationPart(Buch, "Buch")} />
          <Route
            path="/blog"
            component={routeApplicationPart(
              Blog,
              "Blog",
              this.state.isAuthenticated,
              "/"
            )}
          />
          <Route path="/shop" component={routeApplicationPart(Shop, "Shop")} />
          <Route
            path="/gratis"
            component={routeApplicationPart(Gratis, "Gratis")}
          />
          <Route
            path="/häkelkurs"
            component={routeApplicationPart(Häkelkurs, "Häkelkurs")}
          />
        </div>
      </Router>
      /*<div className="App">
        <Toolbar />
        <div className="App__content">
          <Main />
        </div>
      </div>*/
    );
  }
}

export default App;
