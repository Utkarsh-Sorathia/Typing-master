import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* SEO Tags */}
      <Helmet>
        <title>Typingo | Ultimate Typing Practice</title>
        <meta name="description" content="Typingo - Improve your typing speed and accuracy with fun, interactive tests and challenges." />
        <meta name="keywords" content="typing, typing test, speed, accuracy, keyboard, practice" />
        <meta property="og:title" content="Typingo | Ultimate Typing Practice" />
        <meta property="og:description" content="Improve your typing skills with Typingo's fun and challenging tests." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://typingo.vercel.app/" />
        <meta property="og:image" content="/og-image.png" />
        <link rel="canonical" href="https://typingo.vercel.app/" />
      </Helmet>

      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and Brand */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <FontAwesomeIcon
                icon={faKeyboard}
                className="text-indigo-500 text-2xl mr-2"
              />
              <span className="text-xl font-bold gradient-text bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                Typingo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link
                to="/"
                className="nav-link text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/tests"
                className="nav-link text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Tests
              </Link>
              <Link
                to="/time-base"
                className="nav-link text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Time
              </Link>
              <Link
                to="/keyboard-mastery"
                className="nav-link text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Keyboard Mastery
              </Link>
            </div>

            {/* Hamburger Button */}
            <button
              className="md:hidden flex items-center text-gray-700 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow absolute w-full left-0 top-16 z-20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block nav-link text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/tests"
                className="block nav-link text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Tests
              </Link>
              <Link
                to="/time-base"
                className="block nav-link text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Time
              </Link>
              <Link
                to="/keyboard-mastery"
                className="block nav-link text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Keyboard Mastery
              </Link>
            </div>
          </div>
        )}

        {/* Gradient text helper style */}
        <style>{`
          .gradient-text {
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
          }
        `}</style>
      </nav>
    </>
  )
}

export default Navbar
