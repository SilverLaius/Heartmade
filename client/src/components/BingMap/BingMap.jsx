import React, { Component } from "react";

class BingMap extends Component {
  render() {
    return (
      <div>
        <iframe
          title="map"
          width="500"
          height="400"
          frameborder="0"
          src="https://www.bing.com/maps/embed?h=400&w=500&cp=58.37839283136799~26.71461600126922&lvl=18&typ=d&sty=r&src=SHELL&FORM=MBEDV8"
          scrolling="no"
        />
      </div>
    );
  }
}

export default BingMap;
