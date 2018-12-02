import React, { Component } from "react";
import { Tab } from "react-bootstrap";

export default class Tabs extends Component {
  render() {
    return (
      <Tabs defaultActiveKey={1} animation={false}>
        <Tab eventKey={1} title="Kommentieren">
          Tab 1 content
        </Tab>
        <Tab eventKey={2} title="Kommentare">
          Tab 2 content
        </Tab>
      </Tabs>
    );
  }
}
