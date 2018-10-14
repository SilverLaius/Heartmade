import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Startseite from "./components/Startseite";
import Über from "./components/Über";
import Buch from "./components/Buch";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import epood from "./components/Epood1";
import Piltpais from "./components/Piltpais";
import Blog from "./components/Blog";
import Shop from "./components/Shop";
import Gratis from "./components/Gratis";
import Häkelkurs from "./components/Häkelkurs";
import Anmelden from "./components/Anmelden";
import Register from "./components/Register";
import { routeApplicationPart } from "./RouteWrapper";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Searchbar />
          <Anmelden />
          <Register />
          <Piltpais />
          <Navbar />

          <Route
            exact
            path="/"
            component={routeApplicationPart(Startseite, "Startseite")}
          />
          <Route path="/über" component={routeApplicationPart(Über, "Über")} />
          <Route path="/buch" component={routeApplicationPart(Buch, "Buch")} />
          <Route path="/blog" component={routeApplicationPart(Blog, "Blog")} />
          <Route path="/shop" component={routeApplicationPart(Shop, "Shop")} />
          <Route
            path="/gratis"
            component={routeApplicationPart(Gratis, "Gratis")}
          />
          <Route
            path="/häkelkurs"
            component={routeApplicationPart(Häkelkurs, "Häkelkurs")}
          />
          <epood />
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
