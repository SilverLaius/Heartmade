import React from "react";
import "./Toolbar.css";
import { Link } from "react-router-dom";

const toolbar = () => (
  <div className="background">
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="spacer" />
        <div className="toolbar__navigation-items">
          <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/">Link</Link>
            </li>
            <li>
              <Link to="/">Link</Link>
            </li>
            <li>
              <Link to="/">Link</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  </div>
);

export default toolbar;
