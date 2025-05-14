import React from "react";
import { Link } from "react-router-dom";

const navbarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  display: "flex",
  gap: "1rem",
  padding: "1rem 2rem",
  backgroundColor: "black",
  color: "#6F6F6F",
  borderBottom: "2px solid white",
  boxShadow: "0 0 40px 4px rgba(72, 135, 202, 0.1)",
  zIndex: 1000,
};

const headerContentStyle = {
  display: "flex",
  alignItems: "center",
  margin: "0 auto",
  maxWidth: "1200px",
  width: "100%",
};

const logoStyle = {
  textDecoration: "none",
  fontSize: "1.3rem",
  fontWeight: "bold",
  color: "#7d7b7b",
  marginRight: "auto",
};

const searchBarStyle = {
  flexGrow: 1,
  marginRight: "2rem",
};

const searchInputStyle = {
  width: "80%",
  padding: "0.2rem 10px",
  borderRadius: "14px",
  boxShadow: "0 0 40px 4px rgba(72, 135, 202, 0.1)",
  fontSize: "1rem",
  color: "rgb(128, 128, 128)",
  border: "none",
  outline: "none",
};

const mainNavStyle = {
  display: "flex",
  gap: "1.5rem",
  marginLeft: "8%",
};

const linkStyle = {
  textDecoration: "none",
  color: "#6F6F6F",
  fontWeight: 1000,
};

const Navbar = () => {
  return (
    <header style={navbarStyle}>
      <div style={headerContentStyle}>
        <Link to="/" style={logoStyle}>
          Athelegard
        </Link>
        <div style={searchBarStyle}>
          <input type="text" placeholder="Search..." style={searchInputStyle} />
        </div>
        <nav style={mainNavStyle}>
          <Link to="/profile" style={linkStyle}>
            Profile
          </Link>
          <Link to="/ally" style={linkStyle}>
            Ally
          </Link>
          <Link to="/live" style={linkStyle}>
            Live
          </Link>
          <Link to="/settings" style={linkStyle}>
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
