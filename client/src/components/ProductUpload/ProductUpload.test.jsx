import React from "react";
import ProductUpload from "./ProductUpload";
import ProductList from "../ProductList";
import { shallow, mount } from "enzyme";

it("renders correctly", () => {
  const wrapper = shallow(<ProductUpload />);
  expect(wrapper.exists()).toBe(true);
});

describe("uploading", () => {
  it("uploads successfully", () => {
    const component = upload("validName", 10, [
      new File([""], "validFile.png", {
        type: "image/png",
        lastModified: Date.now()
      })
    ]);
    expect(component.state.notificationText).toEqual(
      "Product successfully uploaded!"
    );
  });

  it("shows error on negative product price", () => {
    const component = upload("validName", -10, [
      new File([""], "validFile.png", {
        type: "image/png",
        lastModified: Date.now()
      })
    ]);
    expect(component.state.uploadingStatus).toEqual("error");
  });

  it("shows error on invalid file type", () => {
    const component = upload("validName", 10, [
      new File([""], "invalidFile.txt", {
        type: "text/plain",
        lastModified: Date.now()
      })
    ]);
    expect(component.state.uploadingStatus).toEqual("error");
  });

  it("shows error on empty name", () => {
    const component = upload("", 10, [
      new File([""], "validFile.png", {
        type: "image/png",
        lastModified: Date.now()
      })
    ]);
    expect(component.state.uploadingStatus).toEqual("error");
  });
});

function upload(name, price, images) {
  const wrapper = shallow(<ProductUpload />);
  const component = wrapper.instance();
  wrapper.setState({
    productName: name,
    productPrice: price,
    productType: 1,
    productStatus: 1,
    productImages: images
  });
  component.handleUploadProduct(new Event("test"));
  return component;
}
