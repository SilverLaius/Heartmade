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
  FormControl
} from "react-bootstrap";
import carouselImg from "../images/pilt (1).png";
import "./Piltpais.css";

//import { Link } from "react-router-dom";

export default class karusell extends Component {
  render() {
    return (
      <Carousel>
        <Carousel.Item>
          <img src={carouselImg} />
          <Carousel.Caption />
        </Carousel.Item>
        <Carousel.Item>
          <img src={carouselImg} />
          <Carousel.Caption />
        </Carousel.Item>
        <Carousel.Item>
          <img src={carouselImg} />
          <Carousel.Caption />
        </Carousel.Item>
      </Carousel>
    );
  }
}
