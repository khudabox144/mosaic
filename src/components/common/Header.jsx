import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/public/assets/images/logo.svg';
import HomeIcon from '/public/assets/icons/home.svg';
import Notification from '/public/assets/icons/notification.svg';
import Avatar from '/public/assets/images/avatars/avatar_1.png';
import Logout from '../auth/Logout';
import useAuth from '../../hooks/useAuth';
import useProfile from '../../hooks/useProfile';

const Header = () => {
  const { auth } = useAuth();
  const { state } = useProfile();
  const user = state?.user ?? auth?.user;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#1E1F24]/95 via-[#24262C]/95 to-[#1E1F24]/95 border-b border-gray-700/50 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            className="max-w-[110px] lg:max-w-[140px] hover:scale-105 transition-transform duration-300"
            src={Logo}
            alt="Logo"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-200 shadow-sm"
          >
            <img src={HomeIcon} alt="Home" className="h-4 w-4 invert" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <button className="relative p-2 rounded-full hover:bg-white/10 transition-all duration-200">
            <img src={Notification} alt="Notification" className="h-5 w-5 invert" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <Logout />

          <Link
            to="/me"
            className="flex items-center gap-3 group"
          >
            <span className="text-gray-200 font-medium text-base lg:text-lg group-hover:text-indigo-400 transition-colors duration-200">
              {user?.firstName} {user?.lastName}
            </span>
            <img
              className="h-10 w-10 lg:h-12 lg:w-12 rounded-full border-2 border-gray-600 group-hover:border-indigo-500 transition-all duration-200 object-cover"
              src={
                user?.avatar
                  ? `${import.meta.env.VITE_SERVER_BASE_URL}/${user.avatar}`
                  : Avatar
              }
              alt="avatar"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden flex flex-col justify-center items-center space-y-1 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`h-0.5 w-6 bg-gray-200 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-gray-200 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-gray-200 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col items-center gap-4 py-4 bg-[#1E1F24]/95 border-t border-gray-700/40 animate-fade-in-down">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-200"
            onClick={() => setMenuOpen(false)}
          >
            <img src={HomeIcon} alt="Home" className="h-4 w-4 invert" />
            Home
          </Link>

          <button className="p-2 rounded-full hover:bg-white/10 transition-all duration-200">
            <img src={Notification} alt="Notification" className="h-5 w-5 invert" />
          </button>

          <Logout />

          <Link
            to="/me"
            className="flex items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <img
              className="h-10 w-10 rounded-full border-2 border-gray-600 object-cover"
              src={
                user?.avatar
                  ? `${import.meta.env.VITE_SERVER_BASE_URL}/${user.avatar}`
                  : Avatar
              }
              alt="avatar"
            />
            <span className="text-gray-200 font-medium text-lg">
              {user?.firstName} {user?.lastName}
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
