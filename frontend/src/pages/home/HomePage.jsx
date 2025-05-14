import React, { useState } from "react";
import { Link } from "react-router-dom";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

// Navbar Component (with inline styles)
const navbarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  padding: "1rem 2rem",
  backgroundColor: "black",
  color: "#6F6F6F",
  borderBottom: "2px solid white",
  boxShadow: "0 0 40px 4px rgba(72, 135, 202, 0.9)",
  zIndex: 1000,
};

const headerContentStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
};
const logoStyle = {
  textDecoration: "none",
  fontSize: "1.3rem",
  fontWeight: "bold",
  color: "#7d7b7b",
  marginRight: "2rem",
};
const searchBarStyle = {
  flexGrow: 1,
  marginRight: "2rem",
};
const searchInputStyle = {
  width: "100%",
  padding: "0.2rem 10px",
  borderRadius: "14px",
  boxShadow: "0 0 40px 4px rgba(72, 135, 202, 0.9)",
  fontSize: "1rem",
  color: "rgb(128, 128, 128)",
  border: "none",
  outline: "none",
  backgroundColor: "#181818",
};
const mainNavStyle = {
  display: "flex",
  gap: "1.5rem",
};
const linkStyle = {
  textDecoration: "none",
  color: "#6F6F6F",
  fontWeight: 1000,
};

const Navbar = () => (
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

// HomePage Component
const HomePage = () => {
  const [feedType, setFeedType] = useState("forYou");

  return (
    <>
      <Navbar />
      {/* The paddingTop ensures content starts below the fixed Navbar */}
      <div
        style={{ paddingTop: "70px" }}
        className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen"
      >
        {/* Create Post */}
        <CreatePost />
        {/* Posts */}
        <Posts />
      </div>
    </>
  );
};

export default HomePage;
