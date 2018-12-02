import React, { Component } from "react";
import "./Statistics.css";

export default class Statistics extends Component {
  constructor() {
    super();
    this.state = {
      popularBrowser: "",
      popularVisitor: "",
      popularTime: "",
      popularPage: ""
    };
  }
  componentDidMount = () => {
    fetch("/stats")
      .then(res => res.json())
      .then(res => {
        this.setState({
          popularBrowser: res.brauser,
          popularVisitor: res.külastaja,
          popularTime: res.kell,
          popularPage: res.lehekülg
        });
      });
  };
  state = {};
  render() {
    return (
      <div className="statistika">
        <p>
          Beliebteste Webbrowser: <span>{this.state.popularBrowser}</span>
        </p>
        <p>
          Meist genutzte IP-Adresse: <span>{this.state.popularVisitor}</span>
        </p>
        <p>
          Beliebteste Stunde für Web Besuch:{" "}
          <span>{this.state.popularTime}</span>
        </p>
        <p>
          Beliebteste Seite auf dieser Webseite{" "}
          <span>{this.state.popularPage}</span>
        </p>
      </div>
    );
  }
}
