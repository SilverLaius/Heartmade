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
      productPrice: 0,
      productDateAdded: null,
      productType: 1,
      productStatus: 1,
      productImage: null
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileChange = event => {
    /* let allImages = [];
    for (let i = 0; i < event.target.files.length; i++) {
      allImages.push(event.target.files[i]);
    }
    this.setState({
      productImages: allImages
    }); */
    this.setState({
      productImage: event.target.files[0]
    });
  };

  handleUploadProduct = event => {
    // https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
    const currentDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    this.setState({
      productDateAdded: currentDate
    });
    const formData = new FormData();
    formData.append("productName", this.state.productName);
    formData.append("productPrice", this.state.productPrice);
    formData.append("productDateAdded", this.state.productDateAdded);
    formData.append("productType", this.state.productType);
    formData.append("productStatus", this.state.productStatus);
    formData.append("productImage", this.state.productImage);
    axios.post("/upload", formData);
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
            Product Price:
            <input
              value={this.state.productPrice}
              name="productPrice"
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
          <label>
            Product Type:
            <select name="productType" onChange={this.handleInputChange}>
              <option>1</option>
              <option>2</option>
            </select>
          </label>
          <label>
            Product Status:
            <select name="productStatus" onChange={this.handleInputChange}>
              <option>1</option>
              <option>2</option>
            </select>
          </label>

          <button>Submit!</button>
        </form>
      </div>
    );
  }
}

export default ProductUpload;
