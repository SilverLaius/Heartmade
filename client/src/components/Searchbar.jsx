import React, { Component } from "react";
import {
  Badge,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  Button,
  Form,
  FormGroup,
  FormControl
} from "react-bootstrap";
import { openLoginPopup, openRegisterPopup } from "../event-bus.js";
import "./Searchbar.css";

//import { Link } from "react-router-dom";

export default class Searchbar extends Component {
  render() {
    return (
      <Navbar className="Searchbar">
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Suche" />
            </FormGroup>{" "}
            <Button type="submit">Suchen</Button>
          </Navbar.Form>
          <Nav pullRight>
            <NavItem eventKey={1} href="#" onClick={openLoginPopup}>
              Anmelden
            </NavItem>
            <NavItem eventKey={2} href="#" onClick={openRegisterPopup}>
              Register
            </NavItem>
            <NavItem eventKey={3} href="#">
              Einkaufen <Badge class="badge badge-light">0</Badge>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}