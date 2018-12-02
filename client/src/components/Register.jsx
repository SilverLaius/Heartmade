import React, { Component } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Popover,
  Tooltip,
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel
} from "react-bootstrap";
import "./Register.css";
import { onOpenRegisterPopup } from "../event-bus.js";
import { Translate } from "react-localize-redux";

class Register extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      userID: null,
      date: null,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      show: false
    };
  }

  componentDidMount() {
    this.subscription = onOpenRegisterPopup(() => this.handleShow());
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

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    const currentDate = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const date = new Date();
    const time = date.getTime();
    const generatedID = time & 0xffffffff;

    this.setState(
      {
        date: currentDate,
        userID: Math.abs(generatedID)
      },
      () => {
        formData.append("userid", this.state.userID);
        formData.append("firstname", this.state.firstname);
        formData.append("lastname", this.state.lastname);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password);
        formData.append("date", this.state.date);
        axios({
          method: "post",
          url: "/register",
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } }
        });
      }
    );
    this.handleClose();
  };

  render() {
    return (
      <div>
        <Translate>
          {({ translate }) => (
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <Translate id="searchbar.register.title" />
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form horizontal onSubmit={this.handleSubmit}>
                  <FormGroup controlId="formHorizontalFirstName">
                    <Col componentClass={ControlLabel} sm={2}>
                      {translate("searchbar.register.first")}
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        type="text"
                        placeholder={translate("searchbar.register.first")}
                        name="firstname"
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalLastName">
                    <Col componentClass={ControlLabel} sm={2}>
                      {translate("searchbar.register.last")}
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        type="text"
                        placeholder={translate("searchbar.register.last")}
                        name="lastname"
                        onChange={this.handleInputChange}
                      />
                    </Col>
                  </FormGroup>

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
                      <Button type="submit">
                        {translate("searchbar.register.button")}
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>
                  <Translate id="close" />
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </Translate>
      </div>
    );
  }
}

export default Register;
