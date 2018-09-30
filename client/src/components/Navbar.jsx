import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

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
                <Link to="/">Startseite</Link>
              </li>
              <li>
                <Link to="/über">Über</Link>
              </li>
              <li>
                <Link to="/buch">Buch</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/">Shop</Link>
              </li>
              <li>
                <Link to="/gratis">Gratis</Link>
              </li>
              <li>
                <Link to="/häkelkurs">Häkelkurs</Link>
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
                  <Link to="/">Startseite</Link>
                </li>
                <li>
                  <Link to="/über">Über</Link>
                </li>
                <li>
                  <Link to="/buch">Buch</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/gratis">Gratis</Link>
                </li>
                <li>
                  <Link to="/häkelkurs">Häkelkurs</Link>
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
