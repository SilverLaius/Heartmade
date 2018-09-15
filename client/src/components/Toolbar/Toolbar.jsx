import React from "react";
import "./Toolbar.css";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "react-bootstrap";

const toolbar = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Kertupertu</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/products">
          Products
        </NavItem>
        <NavItem eventKey={2} href="/upload">
          Upload Product
        </NavItem>
        <NavItem eventKey={3} href="/map">
          Location
        </NavItem>
        <NavDropdown eventKey={4} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={4.1}>Action</MenuItem>
          <MenuItem eventKey={4.2}>Another action</MenuItem>
          <MenuItem eventKey={4.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={4.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">
          Sign up
        </NavItem>
        <NavItem eventKey={2} href="#">
          Log in
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

  /*<div className="background">
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="spacer" />
        <div className="toolbar__navigation-items">
          <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/upload">Upload Product</Link>
            </li>
            <li>
              <Link to="/map">Location</Link>
            </li>
            <li>
              <Link to="/">Link</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>*/
);

export default toolbar;
