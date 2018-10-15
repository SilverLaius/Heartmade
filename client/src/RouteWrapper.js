import React, { Component } from "react";
import axios from "axios";
import { openLoginPopup } from "./event-bus";
import auth from "./Auth";

export const routeApplicationPart = (
  WrappedComponent,
  pageName,
  authRequired = false
) => {
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
      const currentDate = new Date(
        new Date().getTime() + 3 * 60 * 60 * 1000
      ).toISOString();
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
      if (authRequired) {
        if (auth.isAuthenticated) {
          return <WrappedComponent />;
        } else {
          openLoginPopup();
          return null;
        }
      } else {
        return <WrappedComponent />;
      }
    }
  }
  return ApplicationStepWrapper;
};