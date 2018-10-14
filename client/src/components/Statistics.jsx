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
    fetch("/statistics")
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
      <div>
        <p>
          Kõige populaarsem veebilehitseja, millega meie lehte vaadatakse on{" "}
          <span>{this.state.popularBrowser}</span>
        </p>
        <p>
          Kõige populaarsem ip, mis meie lehte külastab on{" "}
          <span>{this.state.popularVisitor}</span>
        </p>
        <p>
          Kõige populaarsem tund, mis ajal meie lehte külastatakse on{" "}
          <span>{this.state.popularTime}</span>
        </p>
        <p>
          Kõige populaarsem leht mida külastatakse on{" "}
          <span>{this.state.popularPage}</span>
        </p>
      </div>
    );
  }
}
