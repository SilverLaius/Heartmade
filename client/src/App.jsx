import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Über from "./components/Über";
import Buch from "./components/Buch";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Footer from "./components/Footer";
import Startseite from "./components/Startseite";
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
import { LocalizeProvider } from "react-localize-redux";
import globalTranslations from "./language/translations.json";
import ReactDOMServer from "react-dom/server";

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
      <LocalizeProvider
        initialize={{
          languages: [
            { name: "German", code: "de" },
            { name: "English", code: "en" }
          ],
          translation: globalTranslations,
          options: {
            defaultLanguage: "en",
            renderToStaticMarkup: ReactDOMServer.renderToStaticMarkup
          }
        }}
      >
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
            <Route
              path="/über"
              component={routeApplicationPart(Über, "Über")}
            />
            <Route
              path="/buch"
              component={routeApplicationPart(Buch, "Buch")}
            />
            <Route
              path="/blog"
              component={routeApplicationPart(
                Blog,
                "Blog",
                this.state.isAuthenticated,
                "/"
              )}
            />
            <Route
              path="/shop"
              component={routeApplicationPart(Shop, "Shop")}
            />
            <Route
              path="/gratis"
              component={routeApplicationPart(Gratis, "Gratis")}
            />
            <Route
              path="/häkelkurs"
              component={routeApplicationPart(Häkelkurs, "Häkelkurs")}
            />
            <Footer />
          </div>
        </Router>
      </LocalizeProvider>
    );
  }
}

export default App;
