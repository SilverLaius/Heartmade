import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Jumbotron, Grid, Row, Col, Image, Button } from "react-bootstrap";
import "./Startseite.css";
import Epood1 from "./Epood1";

export default class Startseite extends Component {
  render() {
    return (
      <Grid>
        <Epood1 auth={this.props.auth} />
      </Grid>
    );
  }
}
