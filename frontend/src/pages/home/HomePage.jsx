import React from "react";
import { Link } from "react-router-dom";
import Posts from "../../components/common/Posts";
import CreatePost from "./CreatePost";

// Navbar Component (with Tailwind styles)
const Navbar = () => (
  <header className="fixed top-0 left-0 w-full bg-black text-gray-400 border-b-2 border-white shadow-[0_0_40px_4px_rgba(72,135,202,0.9)] z-50">
    <div className="flex flex-wrap items-center justify-between px-4 md:px-8 py-4 gap-4">
      {/* Logo aligned with sidebar */}
      <Link to="/" className="text-xl font-bold text-gray-400 shrink-0">
        Aethelgard
      </Link>

      {/* Search bar aligned with middle panel */}
      <div className="flex-grow max-w-lg w-full md:w-auto">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-1 rounded-xl shadow-[0_0_40px_4px_rgba(72,135,202,0.9)] text-sm text-gray-400 bg-[#181818] border-none outline-none"
        />
      </div>

      {/* Navigation links aligned with right panel */}
      <nav className="flex flex-wrap items-center gap-4 shrink-0">
        <Link
          to="/profile"
          className="font-bold text-gray-400 hover:text-white"
        >
          Profile
        </Link>
        <Link to="/ally" className="font-bold text-gray-400 hover:text-white">
          Ally
        </Link>
        <Link to="/live" className="font-bold text-gray-400 hover:text-white">
          Live
        </Link>
        <Link
          to="/settings"
          className="font-bold text-gray-400 hover:text-white"
        >
          Settings
        </Link>
      </nav>
    </div>
  </header>
);

// HomePage Component
const HomePage = () => {
  return (
    <>
      <Navbar />
      {/* The paddingTop ensures content starts below the fixed Navbar */}
      <div
        style={{ paddingTop: "100px" }}
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
