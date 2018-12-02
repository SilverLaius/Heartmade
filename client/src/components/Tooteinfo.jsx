import React, { Component } from "react";
import { Grid, Col, Image, Row, Button } from "react-bootstrap";
import "./Epood1";
import Tabs from "./Tabs";
import "./Tooteinfo.css";
import pilt from "../images/pilt (4).jpg";
import { FaEuroSign } from "react-icons/fa";

export default class Productinfo extends Component {
  render() {
    return (
      <div className="productinfokonteiner">
        <Row>
          <Col xs={6} md={6}>
            <img className="ppicture" src={pilt} alt="" />
          </Col>
          <Col xs={6} md={6}>
            <h2>Rebane</h2>
            <Row className="hind">
              <Col xs={6} md={5}>
                <FaEuroSign /> 10.00
              </Col>
              <Col xs={4} md={3}>
                <Button className="tootenupp" bsStyle="sm">
                  In den Einkaufswagen
                </Button>
              </Col>
            </Row>
            <p>
              Rebase heegeldamisel on kasutatud 3 värvi lõnga. Rebane on ca 15
              cm pikk ja 5 cm lai. Mustri järgi tegemiseks kulu vilunud
              heegeldajal ca 1 päev.
            </p>
            <Row>
              <Col xs={2} md={3}>
                Kategorien:
              </Col>
              <Col xs={6} md={4}>
                <p>
                  <a href="">Teema1</a> &nbsp;<a href="">Teema2</a>
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={2} md={3}>
                Stichwörter:
              </Col>
              <Col xs={6} md={4}>
                <p>
                  <a href="">Sõna1</a> &nbsp;<a href="">Sõna2</a>
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={2} md={3}>
                Artikkel:
              </Col>
              <Col xs={6} md={4}>
                <p>11111</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Tabs />
      </div>
    );
  }
}
