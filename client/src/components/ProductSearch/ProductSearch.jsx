import React, { Component } from "react";
import Card from "./Card";
import "./ProductSearch.css";

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

  componentDidMount() {
    fetch("/products")
      .then(res => res.json())
      .then(res => {
        this.setState({
          products: res["data"],
          filteredProducts: res["data"]
        });
      });
  }

  filterProducts() {}

  handleInputChange = event => {
    console.log(event.target.value);
    this.setState({
      search: event.target.value
    });
  };

  render() {
    let filteredProducts = this.state.products.filter(
      product => product.productname.indexOf(this.state.search) !== -1
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
              <li key={product.id}>
                <Card
                  key={product.id}
                  productName={product.productname}
                  productDescription={product.product_description}
                  productImg={product.image_src}
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
