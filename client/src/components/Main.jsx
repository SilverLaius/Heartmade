import React from "react";
import { Switch, Route } from "react-router-dom";
import ProductSearch from "./ProductSearch/ProductSearch";
import MainPage from "./MainPage/MainPage";
import ProductUpload from "./ProductUpload/ProductUpload";
import BingMap from "./BingMap/BingMap";

const main = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route path="/products" component={ProductSearch} />
    <Route path="/upload" component={ProductUpload} />
    <Route path="/map" component={BingMap} />
  </Switch>
);

export default main;
