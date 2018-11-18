import React, { Component } from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import socket from "../../SocketManager";
import "./ProductUpload.css";
import NotificationBox from "../NotificationBox/NotificationBox";
import ProductList from "../ProductList";

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
      productImages: [],
      notificationText: "Product uploaded!",
      uploadingStatus: "notUploaded",
      errorText: []
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
    this.setState({ productImages: allImages });
  };

  handleUploadProduct = event => {
    event.preventDefault();
    // https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
    const currentDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const date = new Date();
    const time = date.getTime();
    const generatedID = time & 0xffffffff;
    const formData = new FormData();

    this.setState(
      {
        productDateAdded: currentDate,
        productID: Math.abs(generatedID)
      },
      () => {
        if (!this.formIsValid()) {
          document.getElementById("upload-form").reset();
          let errorMessage = "";
          for (let i = 0; i < this.state.errorText.length; i++) {
            errorMessage += "\n" + this.state.errorText[i];
          }

          this.setState({
            notificationText: errorMessage,
            uploadingStatus: "error",
            errorText: []
          });
          return;
        } else {
          this.setState({
            notificationText: "Product successfully uploaded!",
            uploadingStatus: "notUploaded"
          });
        }
        formData.append("productID", this.state.productID);
        formData.append("productName", this.state.productName);
        formData.append("productPrice", this.state.productPrice);
        formData.append("productDateAdded", this.state.productDateAdded);
        formData.append("productType", this.state.productType);
        formData.append("productStatus", this.state.productStatus);
        for (let i = 0; i < this.state.productImages.length; i++) {
          formData.append("productImage", this.state.productImages[i]);
        }
        axios({
          method: "post",
          url: "/upload",
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } }
        }).then(() => {
          this.setState({
            uploadingStatus: "uploaded"
          });
          socket.emit("NEW_PRODUCT_UPLOADED", {
            productID: this.state.productID
          });
        });
      }
    );

    document.getElementById("upload-form").reset();
  };

  formIsValid = () => {
    if (this.state.productName.length === 0) {
      this.state.errorText.push("Please enter a name for the product!");
    }
    if (this.state.productPrice <= 0) {
      this.state.errorText.push(
        "Please enter a positive floating point number for the price of the item!"
      );
    }
    if (this.state.productImages.length === 0) {
      this.state.errorText.push(
        "Please add an illustrative image for the product!"
      );
    } else {
      for (let i = 0; i < this.state.productImages.length; i++) {
        if (
          this.state.productImages[i].type !== "image/png" &&
          this.state.productImages[i].type !== "image/jpeg"
        ) {
          this.state.errorText.push(
            "The uploaded file has to be a png or jpeg image!"
          );
        }
      }
    }
    if (this.state.errorText.length > 0) {
      return false;
    }
    return true;
  };

  handleChangeUploadStatus = () => {
    const newStatus =
      this.state.uploadingStatus === "notUploaded" ? "uploaded" : "notUploaded";
    this.setState({
      uploadingStatus: newStatus
    });
  };

  render() {
    return (
      <div>
        <NotificationBox
          text={this.state.notificationText}
          uploadingStatus={this.state.uploadingStatus}
          buttonClick={this.handleChangeUploadStatus}
        />
        <form id="upload-form" onSubmit={this.handleUploadProduct}>
          <label>
            Product Name:
            <input
              name="productName"
              type="text"
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Product Price:
            <input
              name="productPrice"
              type="text"
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Product Image:
            <div data-tip="Only supports .png format at the moment">
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
        <ProductList />
      </div>
    );
  }
}

export default ProductUpload;
