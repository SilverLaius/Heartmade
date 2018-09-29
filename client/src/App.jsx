import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Startseite from "./components/Startseite";
import Über from "./components/Über";
import Buch from "./components/Buch";
import Navbar from "./components/CustomNavbar";
import Searchbar from "./components/Searchbar";
import epood from "./components/Epood1";
import Piltpais from "./components/Piltpais";
import Blog from "./components/Blog";
import Shop from "./components/Shop";
import Gratis from "./components/Gratis";
import Häkelkurs from "./components/Häkelkurs";
import Anmelden from "./components/Anmelden";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Searchbar />
          <Anmelden />
          <Piltpais />
          <Navbar />
          <Route exact path="/" component={Startseite} />
          <Route path="/über" component={Über} />
          <Route path="/buch" component={Buch} />
          <Route path="/blog" component={Blog} />
          <Route path="/shop" component={Shop} />
          <Route path="/gratis" component={Gratis} />
          <Route path="/häkelkurs" component={Häkelkurs} />
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
