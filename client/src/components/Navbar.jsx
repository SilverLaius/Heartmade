import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Translate } from "react-localize-redux";

class Navbar extends Component {
  state = {
    smallWindow: false,
    drawButtonIsToggled: false
  };

  handleWindowResize = () => {
    this.setState({ smallWindow: window.outerWidth < 769 });
  };

  componentWillMount() {
    this.setState({ smallWindow: window.outerWidth < 769 });
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  onToggleButtonClick = () => {
    console.log("heyyooo");
    this.setState({
      drawButtonIsToggled: !this.state.drawButtonIsToggled
    });
  };

  dropdownOrRegular = () => {
    if (!this.state.smallWindow) {
      return (
        <nav className="toolbar__navigation">
          <div className="toolbar-logo">
            <Link to="/">kertupertu.de</Link>
          </div>
          <div className="toolbar__navigation-items">
            <ul>
              <li>
                <Link to="/">
                  <Translate id="menu.main" />
                </Link>
              </li>
              <li>
                <Link to="/über">
                  <Translate id="menu.about" />
                </Link>
              </li>
              <li>
                <Link to="/buch">
                  <Translate id="menu.book" />
                </Link>
              </li>
              <li>
                <Link to="/blog">
                  <Translate id="menu.blog" />
                </Link>
              </li>
              <li>
                <Link to="/shop">
                  <Translate id="menu.shop" />
                </Link>
              </li>
              <li>
                <Link to="/gratis">
                  <Translate id="menu.free" />
                </Link>
              </li>
              <li>
                <Link to="/häkelkurs">
                  <Translate id="menu.courses" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    } else {
      return (
        <div>
          <div className="toolbar__toggle">
            <div className="toolbar-logo__toggle">
              <Link to="/">kertupertu.de</Link>
            </div>
            <button
              className="toggle-button"
              onClick={this.onToggleButtonClick}
            >
              <div className="toggle-button__line" />
              <div className="toggle-button__line" />
              <div className="toggle-button__line" />
            </button>
          </div>
          <div
            className={
              this.state.drawButtonIsToggled === true
                ? "toolbar__dropdown"
                : "toolbar__dropdown__deactive"
            }
          >
            <div className="toolbar__dropdown-items">
              <ul>
                <li>
                  <Link to="/">
                    <Translate id="menu.main" />
                  </Link>
                </li>
                <li>
                  <Link to="/über">
                    <Translate id="menu.about" />
                  </Link>
                </li>
                <li>
                  <Link to="/buch">
                    <Translate id="menu.book" />
                  </Link>
                </li>
                <li>
                  <Link to="/blog">
                    <Translate id="menu.blog" />
                  </Link>
                </li>
                <li>
                  <Link to="/shop">
                    <Translate id="menu.shop" />
                  </Link>
                </li>
                <li>
                  <Link to="/statistics">
                    <Translate id="menu.statistics" />
                  </Link>
                </li>
                <li>
                  <Link to="/gratis">
                    <Translate id="menu.free" />
                  </Link>
                </li>
                <li>
                  <Link to="/häkelkurs">
                    <Translate id="menu.courses" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }
  };
  render() {
    return this.dropdownOrRegular();
  }
}

export default Navbar;
