import React, { Component } from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";

/**
 * https://academind.com/learn/react/snippets/image-upload/
 */

class ProductUpload extends Component {
  constructor() {
    super();
    this.state = {
      productID: null,
      productName: "",
      productPrice: 0,
      productDateAdded: null,
      productType: 1,
      productStatus: 1,
      productImages: []
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileChange = event => {
    let allImages = [];
    for (let i = 0; i < event.target.files.length; i++) {
      allImages.push(event.target.files[i]);
    }
    this.setState({
      productImages: allImages
    });
  };

  handleUploadProduct = event => {
    // https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
    const currentDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const date = new Date();
    const time = date.getTime();
    const generatedID = time & 0xffffffff;
    console.log(generatedID);

    console.log("hey");
    this.setState(
      {
        productDateAdded: currentDate,
        productID: -generatedID
      },
      () => {
        const formData = new FormData();
        formData.append("productID", this.state.productID);
        formData.append("productName", this.state.productName);
        formData.append("productPrice", this.state.productPrice);
        formData.append("productDateAdded", this.state.productDateAdded);
        formData.append("productType", this.state.productType);
        formData.append("productStatus", this.state.productStatus);
        formData.append("productImage", this.state.productImage);
        axios.post("/upload", formData);
        const imageData = new FormData();
        for (let i = 0; i < this.state.productImages.length; i++) {
          imageData.append("productImage", this.state.productImages[i]);
        }
        axios.post("/upload/" + this.state.productID, imageData);
      }
    );
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
            <div data-tip="hello world">
              <input
                name="productImage"
                type="file"
                onChange={this.handleFileChange}
                multiple
              />
              <ReactTooltip place="top" type="dark" effect="float" />
            </div>
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
