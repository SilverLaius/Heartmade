import React, { Component } from "react";
import { Grid, Col, Image } from "react-bootstrap";
import "./Blog.css";
import ProductUpload from "./ProductUpload/ProductUpload";
import BingMap from "./BingMap/BingMap";

export default class Blog extends Component {
  render() {
    return (
      <div>
        <ProductUpload />
        <BingMap />
      </div>
    );
  }
}
