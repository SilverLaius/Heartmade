import React, { Component } from "react";
import { Link } from "react-router-dom";
import socket from "../SocketManager";
import { Grid, Row, Col, Thumbnail, Button, Badge } from "react-bootstrap";
import "./Epood1.css";
import { Translate } from "react-localize-redux";

export default class epood extends Component {
  constructor() {
    super();
    this.state = {
      productCount: 0,
      search: "",
      products: [],
      filteredProducts: [],
      kogus: []
    };
  }

  componentDidMount = () => {
    fetch("/products")
      .then(res => res.json())
      .then(res => {
        const products = this.linkProductsWithImages(res);
        this.setState({
          products: products,
          filteredProducts: products
        });
      });

    fetch("/productcount")
      .then(res => res.json())
      .then(res => {
        this.setState({
          productCount: res[0].count
        });
      });

    socket.on("NEW_PRODUCT_UPLOADED", data => {
      const newProduct = this.linkProductsWithImages(data);
      const productsWithNewProduct = this.state.products.concat(newProduct);
      this.setState({
        products: productsWithNewProduct,
        productCount: this.state.productCount + 1
      });
    });
  };

  linkProductsWithImages = products => {
    let productsWithImages = new Map();
    for (let i = 0; i < products.length; i++) {
      if (productsWithImages.has(products[i].Tootekood)) {
        productsWithImages.get(products[i].Tootekood).push(products[i].Nimetus);
        products.splice(i, 1);
      } else {
        let images = [];
        images.push(products[i].Nimetus);
        productsWithImages.set(products[i].Tootekood, images);
      }
    }

    for (let i = 0; i < products.length; i++) {
      products[i].Pildid = productsWithImages.get(products[i].Tootekood);
    }
    return products;
  };

  handleInputChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  render() {
    const { kogus } = this.state;
    let filteredProducts = this.state.products.filter(
      product => product.Kirjeldus.indexOf(this.state.search) !== -1
    );
    return (
      <div className="Epoodkonteiner">
        <div className="search-box">
          <input
            name="searchbox"
            type="text"
            value={this.state.search}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <p className="tooteidkokku">
            <Translate id="mainpage.productscount" />{" "}
            <Badge>{this.state.productCount}</Badge>
          </p>
        </div>
        <Grid fluid>
          <Row>
            {filteredProducts.map(product => (
              <Col md={4} sm={4} key={product.Tootekood}>
                <Thumbnail src={"/image/" + product.Pildid[0]} alt="">
                  <h3>{product.Kirjeldus}</h3>
                  <p>
                    <Button bsStyle="sm">
                      <Translate id="mainpage.info" />
                    </Button>
                    &nbsp;
                    <Button bsStyle="sm">
                      <Translate id="mainpage.addproduct" />
                    </Button>
                  </p>
                </Thumbnail>
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    );
  }
}
