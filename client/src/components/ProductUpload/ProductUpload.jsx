import React, { Component } from "react";
import axios from "axios";

/**
 * https://academind.com/learn/react/snippets/image-upload/
 */

class ProductUpload extends Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      productDescription: "",
      productImage: null
    };
    this.baseState = this.state;
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileChange = event => {
    this.setState({
      productImage: event.target.files[0]
    });
  };

  resetFileInput = event => {};

  handleUploadProduct = event => {
    const formData = new FormData();
    formData.append("productName", this.state.productName);
    formData.append("productDescription", this.state.productDescription);
    formData.append("productImage", this.state.productImage);

    axios.post("/upload", formData, {
      onUploadProgress: progressEvent => {
        while (progressEvent.loaded !== progressEvent.total) {
          this.setState({
            progress: progressEvent.loaded / progressEvent.total
          });
        }
      }
    });
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
              value={this.state.productName}
              name="productName"
              type="text"
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Product Description:
            <input
              value={this.state.productDescription}
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
