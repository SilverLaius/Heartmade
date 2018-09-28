import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import "./CustomNavbar.css";

export default class CustomNavbar extends Component {
  render() {
    return (
      <Navbar className="peamenüü" default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">kertupertu.de</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav className="peamenüü-lingid">
            <NavItem eventKey={1} componentClass={Link} href="/" to="/">
              Startseite
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/über" to="/über">
              Über
            </NavItem>
            <NavItem eventKey={3} componentClass={Link} href="buch" to="/buch">
              Buch
            </NavItem>
            <NavItem eventKey={4} componentClass={Link} href="blog" to="/blog">
              Blog
            </NavItem>
            <NavItem eventKey={5} componentClass={Link} href="shop" to="/">
              Shop
            </NavItem>
            <NavItem
              eventKey={6}
              componentClass={Link}
              href="gratis"
              to="/gratis"
            >
              Gratis
            </NavItem>
            <NavItem
              eventKey={7}
              componentClass={Link}
              href="häkelkurs"
              to="/häkelkurs"
            >
              Häkelkurs
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
