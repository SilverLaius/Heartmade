import React, { Component } from "react";
import "./NotificationBox.css";

class NotificationBox extends Component {
  render() {
    return (
      <div
        className={`notification ${
          this.props.uploadingStatus === "uploaded" ? "" : "invisible"
        }`}
      >
        <strong>{this.props.text}</strong>
        <button
          className="notification-button"
          onClick={this.props.buttonClick}
        >
          &times;
        </button>
      </div>
    );
  }
}

export default NotificationBox;
