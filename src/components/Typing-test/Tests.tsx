import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import EasyMode from '../Modes/EasyMode'
import HardMode from '../Modes/HardMode'
import CodeMode from '../Modes/CodeMode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBolt,
  faCircleCheck,
  faCode,
  faKeyboard,
} from '@fortawesome/free-solid-svg-icons'

const Tests: React.FC = () => {
  const [mode, setMode] = useState<'easy' | 'hard' | 'code'>('easy')

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 min-h-screen bg-gray-50">
      {/* SEO Tags */}
      <Helmet>
        <title>Typing Test Challenge | Speed & Accuracy</title>
        <meta
          name="description"
          content="Test your typing speed and accuracy with Easy, Hard, and Code modes. Challenge yourself and improve your skills!"
        />
        <meta name="keywords" content="typing test, speed test, accuracy, code typing, easy mode, hard mode, challenge" />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="Typing Test Challenge" />
        <meta property="og:description" content="Measure your typing speed, improve your accuracy, and challenge yourself with multiple modes!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/typing-challenge-og.png" />
        <meta property="og:url" content="https://typingo.vercel.app/tests" />
        <link rel="canonical" href="https://typingo.vercel.app/tests" />
      </Helmet>

      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 flex flex-col sm:flex-row items-center justify-center">
            <FontAwesomeIcon icon={faKeyboard} className="text-indigo-500 mr-0 sm:mr-4 mb-2 sm:mb-0" />
            <span className="text-4xl sm:text-5xl font-bold gradient-text bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 p-2">
              Typing Test Challenge
            </span>
            <FontAwesomeIcon icon={faBolt} className="text-yellow-400 ml-0 sm:ml-4 mt-2 sm:mt-0" />
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Measure your speed, improve your accuracy, and challenge yourself!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-8 sm:mb-12">
          <button
            className={`mode-btn px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold w-44 ${mode === 'easy'
                ? 'active-mode'
                : 'bg-white border border-gray-200'
              }`}
            onClick={() => setMode('easy')}
          >
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faCircleCheck} />
              Easy
            </div>
          </button>
          <button
            className={`mode-btn px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold w-44 ${mode === 'hard'
                ? 'active-mode'
                : 'bg-white border border-gray-200'
              }`}
            onClick={() => setMode('hard')}
          >
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faBolt} />
              Hard
            </div>
          </button>
          <button
            className={`mode-btn px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold w-44 ${mode === 'code'
                ? 'active-mode'
                : 'bg-white border border-gray-200'
              }`}
            onClick={() => setMode('code')}
          >
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faCode} />
              Code
            </div>
          </button>
        </div>
        <div className="typing-card p-4 sm:p-8 bg-white rounded-lg shadow-md">
          {mode === 'code' ? (
            <div className="text-center">
              <CodeMode />
            </div>
          ) : mode === 'hard' ? (
            <div className="text-center">
              <HardMode />
            </div>
          ) : (
            <div className="text-center">
              <EasyMode />
            </div>
          )}
        </div>
      </div>
      <style>{`
        .mode-btn {
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }
        .mode-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -2px rgba(0, 0, 0, 0.04);
        }
        .active-mode {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
        }
        @media (max-width: 640px) {
          .typing-card {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Tests
