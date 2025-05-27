import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import loadGames from "../utils/loadGames.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Navbar = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userGames, setUserGames] = useState([]); // <-- ADD THIS
  const dropdownRef = useRef(null);
  const queryClient = useQueryClient();

  // Get current authenticated user with proper error handling
  const { data: authUser, error: authError } = useQuery({
    queryKey: ["authUser"],
    staleTime: Infinity,
  });

  // Check for authentication errors
  useEffect(() => {
    if (authError) {
      toast.error("Session expired. Please login again.");
    }
  }, [authError]);

  // Load games on component mount
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await loadGames();
        setGames(data);
      } catch (error) {
        console.error("Failed to load games:", error);
      }
    };
    fetchGames();
  }, []);

  // Sync userGames with authUser.games
  useEffect(() => {
    if (authUser && Array.isArray(authUser.games)) {
      setUserGames(authUser.games);
    }
  }, [authUser]);

  // Filter games based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredGames([]);
      setShowDropdown(false);
    } else {
      const filtered = games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGames(filtered);
      setShowDropdown(filtered.length > 0);
    }
  }, [searchTerm, games]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddGame = async (game) => {
    if (userGames.some((g) => g.name === game.name)) return;
    // Ensure iconUrl is set
    const mappedGame = {
      ...game,
      iconUrl: game.iconUrl || game.imageurl, // map imageurl to iconUrl if needed
    };
    const updatedGames = [...userGames, mappedGame];
    setUserGames(updatedGames);
    await fetch("/api/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ games: updatedGames }),
    });
    queryClient.setQueryData(["authUser"], (old) =>
      old ? { ...old, games: updatedGames } : old
    );
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
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(e.target.value.trim() !== "");
            }}
            onFocus={() => setShowDropdown(searchTerm.trim() !== "")}
            className="w-full px-4 py-1 rounded-xl shadow-[0_0_40px_4px_rgba(72,135,202,0.9)] text-sm text-gray-400 bg-[#181818] border-none outline-none"
          />

          {showDropdown && filteredGames.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto rounded-lg border border-gray-700 bg-black text-gray-300 shadow-lg">
              {filteredGames.map((game, index) => (
                <li
                  key={`${game.name}-${index}`}
                  className="flex justify-between items-center p-2 hover:bg-[#282828] cursor-pointer border-b border-gray-800 last:border-b-0"
                >
                  <div
                    className="flex items-center gap-2 flex-1"
                    onClick={() => handleSelectGame(game.name)}
                  >
                    <img
                      src={game.imageurl}
                      alt={game.name}
                      className="w-8 h-8 rounded object-cover"
                      onError={(e) => {
                        e.target.src = "/default-game.png";
                      }}
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{game.name}</span>
                      {game.genres && (
                        <span className="text-xs text-gray-400">
                          {game.genres.join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddGame(game);
                    }}
                    className="p-1 rounded-full hover:bg-gray-700 hover:text-white"
                    title="Add to profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-4 shrink-0">
          <Link
            to={`/profile/${authUser?.username || ""}`}
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
