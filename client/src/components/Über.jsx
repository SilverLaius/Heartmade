import React, { Component } from "react";
import { Grid, Col, Image } from "react-bootstrap";
import "./Über.css";
import Tabs from "./Tabs";

export default class Über extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Col xs={12} sm={8} smOffset={2}>
            <Image
              src="assets/pilt (5).jpg"
              className="about-profile-pic"
              rounded="true"
            />
            <h3> Kas sa oled rebane?</h3>
            <p> Blablablablabla</p>
            <p> Blablablablabla</p>
            <p> Blablablablabla</p>
            <p> Blablablablabla</p>
            <Tabs />
          </Col>
        </Grid>
      </div>
      /* <div>
        <Image src="assets/pilt (1).png" className="header-image" />
        <Grid>
          <Col xs={12} sm={8} smOffset={2}>
            <Image
              src="assets/pilt (5).jpg"
              className="about-profile-pic"
              rounded="true"
            />
            <h3> Kas sa oled rebane?</h3>
            <p> Blablablablabla</p>
            <p> Blablablablabla</p>
            <p> Blablablablabla</p>
            <p> Blablablablabla</p>
            <Tabs />
          </Col>
        </Grid>
      </div>*/
    );
  }
}
