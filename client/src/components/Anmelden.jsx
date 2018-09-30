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
  ControlLabel,
  Checkbox
} from "react-bootstrap";
import "./Anmelden.css";
import { onOpenLoginPopup } from "../event-bus.js";

class Anmelden extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      email: "",
      password: "",
      show: false
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

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();

    this.setState({}, () => {
      formData.append("email", this.state.email);
      formData.append("password", this.state.password);

      axios({
        method: "post",
        url: "/login",
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      });
    });
    this.handleClose();
  };

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Anmelden</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Checkbox>Remember me</Checkbox>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">Sign in</Button>
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Anmelden;
