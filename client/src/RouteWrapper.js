import React, { Component } from "react";
import axios from "axios";

export const routeApplicationPart = (WrappedComponent, pageName) => {
  class ApplicationStepWrapper extends Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        date: null,
        page: pageName
      };
    }
    componentDidMount() {
      const formData = new FormData();
      const currentDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      this.setState(
        {
          date: currentDate
        },
        () => {
          formData.append("date", this.state.date);
          formData.append("page", this.state.page);
          axios({
            method: "post",
            url: "/statistics",
            data: formData,
            config: { headers: { "Content-Type": "multipart/form-data" } }
          });
        }
      );
    }

    render() {
      return <WrappedComponent />;
    }
  }
  return ApplicationStepWrapper;
};
