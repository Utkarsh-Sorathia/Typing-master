import React, { useState } from 'react'
import EasyMode from '../Modes/EasyMode'
import HardMode from '../Modes/HardMode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBolt,
  faCircleCheck,
  faKeyboard,
} from '@fortawesome/free-solid-svg-icons'

const Tests: React.FC = () => {
  const [mode, setMode] = useState<'easy' | 'hard'>('easy')

  return (
    <div
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          {/* <h1 className="text-5xl font-bold text-gray-800 mb-3">Typing Test</h1>
          <p className="text-xl text-gray-600">
            Test and improve your typing speed and accuracy
          </p> */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faKeyboard}
              className="text-indigo-500 mr-4"
            />
            <span className="text-5xl font-bold gradient-text bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 p-2">
              Typing Test Challenge
            </span>
            <FontAwesomeIcon icon={faBolt} className="text-yellow-400 ml-4" />
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Measure your speed, improve your accuracy, and challenge yourself!
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center space-x-6 mb-12">
          <button
            className={`mode-btn px-8 py-3 rounded-full text-lg font-semibold w-40 ${
              mode === 'easy'
                ? 'active-mode'
                : 'bg-white border border-gray-200'
            }`}
            onClick={() => setMode('easy')}
            style={{
              transition: 'all 0.3s ease',
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faCircleCheck} />
              Easy
            </div>
          </button>
          <button
            className={`mode-btn px-8 py-3 rounded-full text-lg font-semibold w-40 ${
              mode === 'hard'
                ? 'active-mode'
                : 'bg-white border border-gray-200'
            }`}
            onClick={() => setMode('hard')}
            style={{
              transition: 'all 0.3s ease',
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faBolt} />
              Hard
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="typing-card p-8">
          {mode === 'easy' ? (
            <div className="text-center">
              <EasyMode />
            </div>
          ) : (
            <div className="text-center">
              <HardMode />
            </div>
          )}
        </div>
      </div>
      {/* Inline style for .active-mode and .mode-btn */}
      <style>{`
        .mode-btn {
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .mode-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .active-mode {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
        }
      `}</style>
      {/* <KeyboardLearning /> */}
    </div>
  )
}

export default Tests
