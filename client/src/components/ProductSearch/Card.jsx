import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  state = {
    productName: this.props.productName,
    productDescription: this.props.productDescription,
    productImg: this.props.productDescription
  };
  render() {
    return (
      <div className="product-card">
        <ul className="product-card__list">
          <li>{this.state.productName}</li>
          <li>{this.state.productDescription}</li>
          <img src={this.state.productImg} />
        </ul>
      </div>
    );
  }
}

export default Card;
