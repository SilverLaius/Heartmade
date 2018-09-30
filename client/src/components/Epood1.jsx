import React, { Component } from "react";
import { Link } from "react-router-dom";
import socket from "../SocketManager";
import { Grid, Row, Col, Thumbnail, Button } from "react-bootstrap";
import "./Epood1.css";

export default class epood extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      products: [],
      filteredProducts: []
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
    socket.on("NEW_PRODUCT_UPLOADED", data => {
      const newProduct = this.linkProductsWithImages(data);
      const productsWithNewProduct = this.state.products.concat(newProduct);
      this.setState({
        products: productsWithNewProduct
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

  // @param up to 3 products
  /* rowOfProducts = products => {
    let productsInRow = [];
    for (let i = 0; i < products.length; i++) {
      productsInRow.push(
        <Thumbnail
          key={products[i].Tootekood}
          src={"/image/" + products[i].Pildid[0]}
          alt=""
        >
          <h3>{products[i].Kirjeldus}</h3>
          <p>
            <Button bsStyle="primary">Info</Button>
            &nbsp;
            <Button bsStyle="default">In den Einkaufswagen</Button>
          </p>
        </Thumbnail>
      );
    }
    return productsInRow;
  }; */

  /*  productsInAllRows = products => {
    let allRows = [];
    for (let i = 0; i < products.length; i += 3) {
      allRows.push(products.slice(i, i + 3));
    }
    return allRows;
  }; */

  render() {
    let filteredProducts = this.state.products.filter(
      product => product.Kirjeldus.indexOf(this.state.search) !== -1
    );
    return (
      <div>
        <div>
          <input
            name="searchbox"
            type="text"
            value={this.state.search}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <Grid>
            {filteredProducts.map(product => (
              <Row key={product.Tootekood}>
                <Thumbnail src={"/image/" + product.Pildid[0]} alt="">
                  <h3>{product.Kirjeldus}</h3>
                  <p>
                    <Button bsStyle="primary">Info</Button>
                    &nbsp;
                    <Button bsStyle="default">In den Einkaufswagen</Button>
                  </p>
                </Thumbnail>
              </Row>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}
