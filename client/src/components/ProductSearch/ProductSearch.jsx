import React, { Component } from "react";
import Card from "./Card";
import "./ProductSearch.css";
import socket from "../../SocketManager";

/**
 * https://www.youtube.com/watch?v=OlVkYnVXPl0
 */

class ProductSearch extends Component {
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
          <ul className="product-list">
            {filteredProducts.map(product => (
              <li key={product.Tootekood}>
                <Card
                  key={product.Tootekood}
                  productName={product.Kirjeldus}
                  productPrice={product.Hind}
                  productImages={product.Pildid}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProductSearch;
