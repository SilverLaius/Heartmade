import React, { Component } from "react";
import {
  Carousel,
  Badge,
  Collapse,
  Navbar,
  Nav,
  NavItem,
  Button,
  Form,
  FormGroup,
  FormControl,
  Image
} from "react-bootstrap";
import piltpaisImg from "../images/pilt (1).webp";
import "./Piltpais.css";

//import { Link } from "react-router-dom";

export default class piltpäis extends Component {
  render() {
    return (
      <div className="piltpäis">
        <img src={piltpaisImg} className="piltpäis-pilt" />
      </div>
    );
  }
}
