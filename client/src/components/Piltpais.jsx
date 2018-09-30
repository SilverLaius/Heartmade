import React, { Component } from "react";
import { Jumbotron, Image } from "react-bootstrap";
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
          <img src="assets/pilt (1).png" />
          <Carousel.Caption />
        </Carousel.Item>
        <Carousel.Item>
          <img src="assets/pilt (1).png" />
          <Carousel.Caption />
        </Carousel.Item>
        <Carousel.Item>
          <img src="assets/pilt (1).png" />
          <Carousel.Caption />
        </Carousel.Item>
      </Carousel> */
