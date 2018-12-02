import React, { Component } from "react";
import { Grid, Col, Image } from "react-bootstrap";
import "./Über.css";
import Tabs from "./Tabs";

export default class Über extends Component {
  render() {
    return (
      <div>
        <Tabs />
        <Grid>
          <Col xs={12} sm={8} smOffset={2} />
        </Grid>
      </div>
    );
  }
}
