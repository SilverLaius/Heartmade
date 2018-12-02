import React from "react";
import Register from "./Register";
import { shallow, mount } from "enzyme";

it("renders correctly", () => {
  const wrapper = shallow(<Register />);
  expect(wrapper.exists()).toBe(true);
});
/* 
describe("making an account", () => {
  it("creats account", done => {
    const response = register(
      "validFirstName",
      "validLastName",
      "articartic1@gmail.com",
      "testpassw"
    );
    expect(response).toBe(true);
  });
});

function register(firstName, lastName, email, password) {
  const wrapper = shallow(<Register />);
  const component = wrapper.instance();
  wrapper.setState({
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: password
  });
  return component.handleSubmit(new Event("test")); 
}*/
