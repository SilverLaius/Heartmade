import React, { Component } from "react";
import { Grid, Col, Image } from "react-bootstrap";
import "./Über.css";
import Tabs from "./Tabs";

export default class Über extends Component {
  render() {
    return (
      <div className="kooskasutus" xmlns="http://www.w3.org/1999/xhtml">
        <h1>MathML (Pythagoras):</h1>
        <math xmlns="http://www.w3.org/1998/Math/MathML">
          <mrow>
            <mrow>
              <msup>
                <mi>a</mi>
                <mn>2</mn>
              </msup>
              <mo>+</mo>
              <msup>
                <mi>b</mi>
                <mn>2</mn>
              </msup>
            </mrow>
            <mo>=</mo>
            <msup>
              <mi>c</mi>
              <mn>2</mn>
            </msup>
          </mrow>
        </math>
        <h1>SVG:</h1>
        <svg className="kolmnurk" xmlns="http://www.w3.org/2000/svg">
          <polyline points="3 3 30 28 3 53" />
        </svg>
        <div>
          <Tabs />
          <Grid>
            <Col xs={12} sm={8} smOffset={2}>
              <Tabs />
            </Col>
          </Grid>
        </div>
      </div>
    );
  }
}
