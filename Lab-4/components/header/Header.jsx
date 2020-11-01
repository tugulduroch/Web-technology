import React from "react";
import "./Header.css";
// import logo from "./tuk.jpg"

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="headerText">
          <h1 className="headerTitle">Tuguldur Ochsaikhan</h1>
          <p className="affiliation">Class of Information technology</p>
          <p className="affiliation">School of engineering and applied science</p>
          <p className="affiliation">CS142: Project 4</p>
        </div>
        <div className="headerDesign">
          <div className="square1">
            {/* <img src={logo} alt=""/> */}
          </div>
          <div className="square2" />
        </div>
      </div>
    );
  }
}

export default Header;
