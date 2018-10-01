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
import carouselImg from "../images/pilt (1).png";
import "./Piltpais.css";

//import { Link } from "react-router-dom";

export default class piltpäis extends Component {
  render() {
    return (
      <div className="piltpäis">
        <Image src="assets/pilt (1).png" className="piltpäis-pilt" responsive />
      </div>
    );
  }
}

/*  <Carousel>
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
      </Carousel> */
