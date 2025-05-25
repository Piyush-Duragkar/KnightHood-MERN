import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import loadGames from "../utils/loadGames.js";

const Navbar = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [userGames, setUserGames] = useState(() => {
    const saved = localStorage.getItem("userGames");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchGames = async () => {
      const data = await loadGames();
      setGames(data);
    };
    fetchGames();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFiltered([]);
    } else {
      setFiltered(
        games.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, games]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (name) => {
    setSearchTerm(name);
    setFiltered([]);
    setShowDropdown(false);
  };

  const handleAddGame = (game) => {
    if (userGames.some((g) => g.name === game.name)) return;
    const updatedGames = [...userGames, game];
    setUserGames(updatedGames);
    localStorage.setItem("userGames", JSON.stringify(updatedGames));
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-gray-400 border-b-2 border-white shadow-[0_0_40px_4px_rgba(72,135,202,0.9)] z-50">
      <div className="flex flex-wrap items-center justify-between px-4 md:px-8 py-4 gap-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-400 shrink-0">
          Aethelgard
        </Link>

        {/* Search Bar with dropdown */}
        <div
          className="flex-grow max-w-lg w-full md:w-auto relative"
          ref={dropdownRef}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="w-full px-4 py-1 rounded-xl shadow-[0_0_40px_4px_rgba(72,135,202,0.9)] text-sm text-gray-400 bg-[#181818] border-none outline-none"
          />
          {showDropdown && filtered.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto rounded-lg border border-gray-700 bg-black text-gray-300">
              {filtered.map((game, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 hover:bg-[#282828] cursor-pointer"
                >
                  <div
                    className="flex items-center gap-2"
                    onClick={() => handleSelect(game.name)}
                  >
                    <img
                      src={game.imageurl}
                      alt={game.name}
                      className="w-7 h-7 rounded"
                    />
                    <span>{game.name}</span>
                  </div>
                  <button
                    onClick={() => handleAddGame(game)}
                    className="hover:bg-gray-700 hover:opacity-90"
                    title="Add to profile"
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-4 shrink-0">
          <Link
            to="/profile/:username"
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
};

export default Navbar;
