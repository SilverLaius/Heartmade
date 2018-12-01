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
import LanguageButton from "./LanguageButton";
import { Translate } from "react-localize-redux";
//import { Link } from "react-router-dom";

export default class Searchbar extends Component {
  logInLogOutButton = () => {
    const button = this.props.auth ? (
      <NavItem onClick={this.props.onLogOut}>Logout</NavItem>
    ) : (
      <NavItem eventKey={1} href="#" onClick={openLoginPopup}>
        <Translate id="searchbar.login.button" />
      </NavItem>
    );
    return button;
  };

  render() {
    const button = this.logInLogOutButton();
    return (
      <Navbar className="searchbar">
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <FormGroup>
              <Translate>
                {({ translate }) => (
                  <FormControl
                    type="text"
                    placeholder={translate("searchbar.search.placeholder")}
                  />
                )}
              </Translate>
            </FormGroup>{" "}
            <Button type="submit">
              <Translate id="searchbar.search.button" />
            </Button>
          </Navbar.Form>
          <Nav className="searchbarbutton" pullRight>
            {button}
            <NavItem eventKey={2} href="#" onClick={openRegisterPopup}>
              <Translate id="searchbar.register.button" />
            </NavItem>
            <NavItem eventKey={3} href="#">
              <Translate id="searchbar.cart" />{" "}
              <Badge class="badge badge-light">0</Badge>
            </NavItem>
            <NavItem eventKey={4} href="#">
              <LanguageButton />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
