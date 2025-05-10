import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../context/context';
import { FaBars, FaTimes, FaUserCircle, FaPlane, FaSignOutAlt, FaSignInAlt, FaMoon, FaSun } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const context = useContext(AppContext);
  const checkLogin = context?.state?.profileData;
  const [menuOpen, setMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('startourism');
    context.dispatch({ type: 'PROFILE_CLEAR' });
    setLogin(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    const storedData = localStorage.getItem('startourism');
    if (storedData) {
      setLogin(true);
    }
  }, [checkLogin]);

  const navLinkClass =
    'transition duration-300 ease-in-out text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400';

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2 dark:text-blue-400 ">
          <img className='h-28' src="../public/logo.png" alt="" />
        </NavLink>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {checkLogin?.role === 'admin' && (
            <>
              <NavLink to="/uploadtrip" className={navLinkClass}>Upload Trip</NavLink>
              <NavLink to="/applications" className={navLinkClass}>Applications</NavLink>
            </>
          )}
          {checkLogin?.email && (
            <NavLink to="/profile" className={`${navLinkClass} flex items-center gap-1`}>
              <FaUserCircle /> Profile
            </NavLink>
          )}
        
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/trips" className={navLinkClass}>All Trips</NavLink>
          <NavLink to="/planatrip" className={navLinkClass}>Plan a Trip</NavLink>

          {login ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 transition duration-300"
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <NavLink
              to="/signup"
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 transition duration-300"
            >
              <FaSignInAlt /> Login/SignUp
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800 px-6 py-4 shadow-lg space-y-4"
          >
            {checkLogin?.role === 'admin' && (
              <>
                <NavLink to="/uploadtrip" onClick={() => setMenuOpen(false)} className={navLinkClass}>Upload Trip</NavLink>
                <NavLink to="/applications" onClick={() => setMenuOpen(false)} className={navLinkClass}>Applications</NavLink>
              </>
            )}
            {checkLogin?.email && (
              <NavLink to="/profile" onClick={() => setMenuOpen(false)} className={navLinkClass}>Profile</NavLink>
            )}
            <NavLink to="/" onClick={() => setMenuOpen(false)} className={navLinkClass}>Home</NavLink>
            <NavLink to="/trips" onClick={() => setMenuOpen(false)} className={navLinkClass}>All Trips</NavLink>
            <NavLink to="/planatrip" onClick={() => setMenuOpen(false)} className={navLinkClass}>Plan a Trip</NavLink>
            <button
              onClick={() => {
                context.dispatch({ type: 'TOGGLE_THEME' });
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {context.state.theme === 'light' ? <FaMoon /> : <FaSun />} Toggle Theme
            </button>
            {login ? (
              <button onClick={handleLogout} className="text-red-600 hover:text-red-700 w-full text-left transition duration-300">
                Logout
              </button>
            ) : (
              <NavLink to="/signup" onClick={() => setMenuOpen(false)} className="block text-blue-600 hover:text-blue-700 transition duration-300">
                Login/SignUp
              </NavLink>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;