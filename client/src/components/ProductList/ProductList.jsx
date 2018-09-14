import React, { Component } from "react";
import "./ProductList.css";

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch("/products")
      .then(res => res.json())
      .then(res => {
        this.setState({ products: res["data"] });
        console.log(this.products);
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.products.map(product => (
            <li key={product.id}>
              {product.productname}
              <img src={product.image_src} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductList;
