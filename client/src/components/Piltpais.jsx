import React, { Component } from "react";
<<<<<<< HEAD
import { Jumbotron, Image } from "react-bootstrap";
=======
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
>>>>>>> c02fe668baf50c14bb76e5378c711f676ff256cd
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
