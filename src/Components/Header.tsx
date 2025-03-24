import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface UserData {
  email?: string;
  name?: string;
}

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      setUserData(JSON.parse(userDetails));
    }
  }, []);

  const firstTwoLetters = userData?.email
    ? userData.email.slice(0, 2).toUpperCase()
    : "U";

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleTheme = () => setDarkMode((prev) => !prev);
  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    window.location.href='/'; 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="p-4 flex justify-between items-center border-b border-gray-800 bg-gray-900">
      <div className="flex items-center">
        {!sidebarOpen && (
          <button className="mr-2 cursor-pointer text-white" onClick={toggleSidebar}>
            ☰
          </button>
        )}
        {!sidebarOpen && <span className="font-medium text-white">Estro Tech</span>}
      </div>

      <div className="relative" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
        >
          {firstTwoLetters}
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg p-3 text-white">
            <Link to="/UserDetails">
              <a className="text-sm font-semibold block">{userData?.name || "Guest"}</a>
            </Link>
            <hr className="border-gray-700 my-2" />

            <button
              onClick={toggleTheme}
              className="w-full text-left text-sm py-2 px-3 hover:bg-gray-700 rounded-md"
            >
              {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left text-sm py-2 px-3 hover:bg-gray-700 rounded-md text-red-400"
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
