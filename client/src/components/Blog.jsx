import React, { Component } from "react";
import { Grid, Col, Image } from "react-bootstrap";
import "./Blog.css";
import ProductSearch from "./ProductSearch/ProductSearch";
import ProductUpload from "./ProductUpload/ProductUpload";
import BingMap from "./BingMap/BingMap";

export default class Blog extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Col xs={12} sm={8} smOffset={2}>
            <Image
              src="assets/pilt (20).jpg"
              className="about-profile-pic"
              rounded="true"
            />
            <h3> Kas sa oled rebane?</h3>
            <p> Blablablablabla</p>
            <p> Blablablablabla</p>
            <p> Blablablablabla</p>
            <p> Blablablablabla</p>
          </Col>
          <ProductSearch />
          <ProductUpload />
          <BingMap />
        </Grid>
      </div>
    );
  }
}
