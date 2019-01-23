import React, { Component } from "react";
import { Link } from "react-router-dom";
import {footericon, foottext} from "./footconfig.js";
import "../../assets/css/base.css";
import "./index.css";
class Foot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: []
    };
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div className="footerbox">
        <Link to="/">
          <img
            src={
              this.renderClass() === 0 ? footericon.home_on : footericon.home
            }
            alt="foottext[0]"
          />
          <span className={this.renderClass() === 0 ? "on" : ""}>{foottext[0]}</span>
        </Link>
        <Link to="/chat">
          <img
            src={
              this.renderClass() === 1 ? footericon.chat_on : footericon.chat
            }
            alt="foottext[1]"
          />
          <span className={this.renderClass() === 1 ? "on" : ""}>{foottext[1]}</span>
        </Link>
        <Link to="/relationship">
          <img
            src={
              this.renderClass() === 2
                ? footericon.relationship_on
                : footericon.relationship
            }
            alt="foottext[2]"
          />
          <span className={this.renderClass() === 2 ? "on" : ""}>{foottext[2]}</span>
        </Link>
        <Link to="/center">
          <img
            src={
              this.renderClass() === 3
                ? footericon.center_on
                : footericon.center
            }
            alt="foottext[3]"
          />
          <span className={this.renderClass() === 3 ? "on" : ""}>{foottext[3]}</span>
        </Link>
      </div>
    );
  }
  renderClass = () => {
    switch (this.props.pathname) {
      case "/":
        return 0;
        break;
      case "/chat":
        return 1;
        break;
      case "/relationship":
        return 2;
        break;
      case "/center":
        return 3;
        break;
      default:
        return 1;
    }
  };
}

export default Foot;
