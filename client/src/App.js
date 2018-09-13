import React, { Component } from "react";
import Main from "./components/Main";
import Toolbar from "./components/Toolbar/Toolbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <div className="App__content">
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
