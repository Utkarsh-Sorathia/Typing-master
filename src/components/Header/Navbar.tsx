import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <FontAwesomeIcon
                  icon={faKeyboard}
                  className="text-indigo-500 text-2xl mr-2"
                />
                <span className="text-xl font-bold gradient-text bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                  TypingMaster
                </span>
              </div>
            </div>
          </Link>
          {/* Navigation Links */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
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
              to="/keyboard-mastery"
              className="nav-link text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Keyboard Mastrey
            </Link>
          </div>
        </div>
      </div>
      {/* Gradient text helper style */}
      <style>{`
        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }
      `}</style>
    </nav>
  )
}

export default Navbar
