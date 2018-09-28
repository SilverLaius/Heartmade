import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  state = {
    productName: this.props.productName,
    productPrice: this.props.productPrice,
    productImages: this.props.productImages
  };

  render() {
    return (
      <div className="product-card">
        <ul className="product-card__list">
          <li>{this.state.productName}</li>
          <li>{this.state.productPrice}</li>
        </ul>
      </div>
    );
  }
}

export default Card;
