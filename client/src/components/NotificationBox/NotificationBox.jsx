import React, { Component } from "react";
import "./NotificationBox.css";

class NotificationBox extends Component {
  render() {
    return (
      <div
        className={`notification ${
          this.props.uploadingStatus === "uploaded"
            ? ""
            : this.props.uploadingStatus === "error"
            ? "error"
            : "invisible"
        }`}
      >
        <button
          className="notification-button"
          onClick={this.props.buttonClick}
        >
          &times;
        </button>
        <div>
          {this.props.text.split("\n").map((message, key) => {
            return (
              <div key={key}>
                <strong>{message}</strong>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default NotificationBox;
