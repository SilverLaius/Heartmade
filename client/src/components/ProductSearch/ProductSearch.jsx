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
      prods: [],
      search: "",
      products: [],
      filteredProducts: []
    };
  }

  componentDidMount() {
    fetch("/products")
      .then(res => res.json())
      .then(res => {
        this.setState(
          {
            products: res,
            filteredProducts: res
          }

          /* {
            prods: res
          },
          () => {
            this.linkProductsToImages();
          } */
        );
      });
  }
  linkProductsToImages = () => {
    let prods = this.state.prods;
    let productsWithImages = new Map();
    for (let i = 0; i < prods.length; i++) {
      if (productsWithImages.has(prods[i].Tootekood)) {
        productsWithImages.get(prods[i].Tootekood).push(prods[i].Nimetus);
        prods.splice(i, 1);
      } else {
        let images = [];
        images.push(prods[i].Nimetus);
        productsWithImages.set(prods[i].Tootekood, images);
      }
    }

    for (let i = 0; i < prods.length; i++) {
      prods[i].Pildid = productsWithImages.get(prods[i].Tootekood);
    }
    this.setState({
      products: prods,
      filteredProducts: prods
    });
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
