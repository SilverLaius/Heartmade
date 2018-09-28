import React, { Component } from "react";
import { Nav, NavItem } from "react-bootstrap";

export default class Tabs extends Component {
  render() {
    return (
      <Nav bsStyle="tabs" activeKey="1" onSelect={k => this.handleSelect(k)}>
        <NavItem eventKey="1" href="/home">
          Materialien
        </NavItem>
        <NavItem eventKey="2" title="Item">
          Pflegehinweis
        </NavItem>
        <NavItem eventKey="3" disabled>
          Kommentare
        </NavItem>
        <NavItem eventKey="4" disabled>
          Kommentieren
        </NavItem>
        <NavItem eventKey="3" disabled>
          Versand
        </NavItem>
        <NavItem eventKey="3" disabled>
          Wiederruf
        </NavItem>
      </Nav>
    );
  }
}
