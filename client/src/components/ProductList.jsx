import React, { Component } from "react";
import socket from "../SocketManager";
import "./ProductList.css";
import axios from "axios";

class ProductList extends Component {
  state = {
    products: []
  };

  componentDidMount = () => {
    fetch("/products")
      .then(res => res.json())
      .then(res => {
        this.setState({
          products: res
        });
      });

    socket.on("NEW_PRODUCT_UPLOADED", data => {
      const productsWithNewProduct = this.state.products.concat(data);
      this.setState({
        products: productsWithNewProduct
      });
    });
  };

  handleProductRemove = product => {
    const index = this.state.products.indexOf(product);
    const productsWithoutRemoved = this.state.products;
    productsWithoutRemoved.splice(index, 1);
    this.setState({ products: productsWithoutRemoved });
    fetch("/remove/" + product.Tootekood);
  };

  render() {
    return (
      <div>
        {this.state.products.map(product => {
          return (
            <div key={product.Tootekood}>
              <button
                className="button"
                onClick={() => this.handleProductRemove(product)}
              >
                &times;
              </button>
              <div className="product">{product.Kirjeldus}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ProductList;
