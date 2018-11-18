import React, { Component } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Checkbox,
  Thumbnail
} from "react-bootstrap";
import "./Anmelden.css";
import { onOpenLoginPopup } from "../event-bus.js";
import GoogleAuthentication from "./GoogleAuthentication";
import { authenticateUser } from "../event-bus";
import { Translate } from "react-localize-redux";

class Anmelden extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      email: "",
      password: "",
      show: false,
      googleUser: "",
      googleUserAvatar: ""
    };
  }

  componentDidMount() {
    this.subscription = onOpenLoginPopup(() => this.handleShow());
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.remove();
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleGoogleUserLoggedIn = user => {
    const firstName = user.profileObj.givenName;
    const avatar = user.profileObj.imageUrl;
    this.setState({
      googleUser: firstName,
      googleUserAvatar: avatar
    });
    authenticateUser();
    this.handleClose();
  };

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();

    this.setState({}, () => {
      formData.append("email", this.state.email);
      formData.append("password", this.state.password);

      axios.post("/remove", {
        productID: "Fred"
      });
    });
  };

  render() {
    return (
      <div>
        <Translate>
          {({ translate }) => (
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{translate("searchbar.login.title")}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form horizontal onSubmit={this.handleSubmit}>
                  <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                      {translate("searchbar.email")}
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        type="email"
                        placeholder={translate("searchbar.email")}
                        name="email"
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                      <Translate id="searchbar.password" />
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        type="password"
                        placeholder={translate("searchbar.password")}
                        name="password"
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Checkbox>
                        {translate("searchbar.login.remember")}
                      </Checkbox>
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Button type="submit">
                        {translate("searchbar.login.button")}
                      </Button>
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <GoogleAuthentication
                        onUserLoggedIn={this.handleGoogleUserLoggedIn}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>{translate("close")}</Button>
              </Modal.Footer>
            </Modal>
          )}
        </Translate>
      </div>
    );
  }
}

export default Anmelden;
