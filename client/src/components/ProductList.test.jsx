import React from "react";
import ProductList from "./ProductList";
import { shallow, mount } from "enzyme";

it("renders correctly", () => {
  const wrapper = shallow(<ProductList />);
  expect(wrapper.exists()).toBe(true);
});

describe("products list", () => {
  it("shows products", () => {
    const wrapper = shallow(<ProductList />);
    wrapper.setState({
      products: [
        { Tootekood: 1, Kirjeldus: "test" },
        { Tootekood: 2, Kirjeldus: "test2" }
      ]
    });
    expect(wrapper.find(".product")).toHaveLength(2);
  });
  it("deletes products", () => {
    const wrapper = shallow(<ProductList />);
    const component = wrapper.instance();
    const testProduct = { Tootekood: 1, Kirjeldus: "test" };
    wrapper.setState({
      products: [testProduct]
    });
    component.handleProductRemove(testProduct);
    expect(component.state.products).toHaveLength(0);
  });
});
