import React, { Component } from "react";

/**
 * https://academind.com/learn/react/snippets/image-upload/
 */

class ProductUpload extends Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      productDescription: "",
      productImageSrc: "",
      productImage: null
    };
    this.baseState = this.state;
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileChange = event => {
    this.setState({
      productImage: event.target.files[0],
      productImageSrc: event.target.files[0].name
    });
  };

  handleUploadProduct = event => {
    event.preventDefault();
    fetch("/upload", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productName: this.state.productName,
        productDescription: this.state.productDescription,
        productImageSrc: this.state.productImageSrc
      })
    }).then(() => this.resetState());
  };

  resetState = () => {
    this.setState(this.baseState);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleUploadProduct}>
          <label>
            Product Name:
            <input
              name="productName"
              type="text"
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Product Description:
            <input
              name="productDescription"
              type="text"
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Product Image:
            <input
              name="productImage"
              type="file"
              onChange={this.handleFileChange}
            />
          </label>
          <button>Submit!</button>
        </form>
      </div>
    );
  }
}

export default ProductUpload;
