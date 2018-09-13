import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  state = {
    productName: this.props.productName,
    productDescription: this.props.productDescription,
    productImg: this.props.productImg
  };
  render() {
    console.log();
    return (
      <div className="product-card">
        <ul className="product-card__list">
          <li>{this.state.productName}</li>
          <li>{this.state.productDescription}</li>
          <img
            className="product-card__image"
            src={"img/" + this.state.productImg + ".jpg"}
            alt="img"
          />
        </ul>
      </div>
    );
  }
}

export default Card;
