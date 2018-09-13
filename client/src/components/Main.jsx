import React from "react";
import { Switch, Route } from "react-router-dom";
import ProductSearch from "./ProductSearch/ProductSearch";
import MainPage from "./MainPage/MainPage";
import ProductUpload from "./ProductUpload/ProductUpload";

const main = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route path="/products" component={ProductSearch} />
    <Route path="/upload" component={ProductUpload} />
  </Switch>
);

export default main;
