import React from "react";
import Epood1 from "./Epood1";
import { shallow } from "enzyme";

it("renders correctly", () => {
  const wrapper = shallow(<Epood1 />);
  expect(wrapper.exists()).toBe(true);
});

describe("products view", () => {
  const testProduct1 = { Tootekood: 1, Kirjeldus: "test1", Pildid: [null] };
  const testProduct2 = { Tootekood: 2, Kirjeldus: "test2", Pildid: [null] };
  it("shows products", () => {
    const wrapper = shallow(<Epood1 />);
    const component = wrapper.instance();
    wrapper.setState({
      products: [testProduct1]
    });
    expect(wrapper.find(".toode")).toHaveLength(1);
    wrapper.setState({
      products: [testProduct1, testProduct2]
    });
    expect(wrapper.find(".toode")).toHaveLength(2);
  });
  it("filters products", () => {
    const wrapper = shallow(<Epood1 />);
    const component = wrapper.instance();
    wrapper.setState({
      search: "test1",
      products: [testProduct1, testProduct2]
    });
    expect(wrapper.find(".toode").props().product).toEqual(testProduct1);
    wrapper.setState({
      search: "test2"
    });
    expect(wrapper.find(".toode").props().product).toEqual(testProduct2);
  });
});
