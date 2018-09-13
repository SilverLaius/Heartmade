import React from "react";
import { Switch, Route } from "react-router-dom";
import ProductSearch from "./ProductSearch/ProductSearch";
import MainPage from "./MainPage/MainPage";

const main = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route path="/products" component={ProductSearch} />
  </Switch>
);

export default main;
