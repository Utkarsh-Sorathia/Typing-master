import { faBolt, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import {
  FaStopwatch,
  FaTachometerAlt,
  FaBullseye,
  FaTimesCircle,
  FaRedo,
  FaSyncAlt,
} from 'react-icons/fa'

const DURATIONS = [15, 30, 60, 90] as const
type Duration = typeof DURATIONS[number]

const fallbackText =
  'The quick brown fox jumps over the lazy dog. This sentence contains all letters of the alphabet. Typing regularly improves your speed and accuracy. Practice makes perfect in the world of typing tests.'

async function fetchRandomWords(count: number): Promise<string> {
  try {
    const response = await fetch(
      `https://random-word-api.vercel.app/api?words=${count}`,
    )
    const words = await response.json()
    return words.join(' ')
  } catch {
    return fallbackText
  }
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

const TypingSpeedTest: React.FC = () => {
  const [testDuration, setTestDuration] = useState<Duration>(30)
  const [timeLeft, setTimeLeft] = useState<number>(30)
  const [testText, setTestText] = useState<string>('')
  const [userInput, setUserInput] = useState<string>('')
  const [testStarted, setTestStarted] = useState<boolean>(false)
  const [wpm, setWpm] = useState<number>(0)
  const [accuracy, setAccuracy] = useState<number>(100)
  const [errors, setErrors] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [lastTestText, setLastTestText] = useState<string>('')

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle duration change (always available)
  const handleSelectDuration = (duration: Duration) => {
    setTestDuration(duration)
    setTimeLeft(duration)
    setUserInput('')
    setTestStarted(false)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setTestText('')
    setLastTestText('')
    setShowModal(false)
  }

  // Start test (use existing text if present, otherwise fetch new)
  const startTest = async () => {
    if (testStarted) return

    if (!testText) {
      const text = await fetchRandomWords(testDuration > 30 ? 50 : 25)
      setTestText(text)
      setLastTestText(text)
    }
    setUserInput('')
    setTimeLeft(testDuration)
    setTestStarted(true)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setShowModal(false)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  // Try again (reuse lastTestText, but don't start test)
  const tryAgainTest = () => {
    setTestText(lastTestText)
    setUserInput('')
    setTimeLeft(testDuration)
    setTestStarted(false)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setShowModal(false)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  // New test (fetch new text, but don't start test)
  const newTest = async () => {
    const text = await fetchRandomWords(testDuration > 30 ? 50 : 25)
    setTestText(text)
    setLastTestText(text)
    setUserInput('')
    setTimeLeft(testDuration)
    setTestStarted(false)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setShowModal(false)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  // Timer effect
  useEffect(() => {
    if (!testStarted) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTestStarted(false)
          setShowModal(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [testStarted])

  // Calculate stats
  useEffect(() => {
    const correctChars = [...userInput].filter((ch, i) => ch === testText[i])
      .length
    const totalTyped = userInput.length
    const newErrors = Math.max(totalTyped - correctChars, 0)
    setErrors(newErrors)
    setAccuracy(
      totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100),
    )
    const words = userInput.trim().length / 5
    const minutesElapsed = (testDuration - timeLeft) / 60
    setWpm(minutesElapsed > 0 ? Math.round(words / minutesElapsed) : 0)
  }, [userInput, testText, testDuration, timeLeft])

  // Render text with highlights
  const renderText = () => {
    if (!testText)
      return (
        <p className="text-gray-400">
          Select a duration and click &quot;Start Test&quot; to begin
        </p>
      )
    return (
      <>
        {testText.split('').map((char, i) => {
          let className = ''
          if (i < userInput.length) {
            className = char === userInput[i] ? 'correct' : 'incorrect'
          } else if (i === userInput.length && testStarted) {
            className = 'current'
          }
          return (
            <span key={i} className={className}>
              {char}
            </span>
          )
        })}
      </>
    )
  }

  // Tailwind custom classes
  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = `
      .correct { color: #10b981; }
      .incorrect { color: #ef4444; text-decoration: underline; }
      .current { background-color: #e2e8f0; border-radius: 2px; }
      .progress-bar { height: 6px; background-color: #3b82f6; transition: width 0.3s ease; }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Progress bar width
  const progressPercent =
    testStarted && testDuration
      ? ((testDuration - timeLeft) / testDuration) * 100
      : 0

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <div className="text-center mb-20 pt-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 flex items-center justify-center">
          <FontAwesomeIcon icon={faKeyboard} className="text-indigo-500 mr-4" />
          <span className="text-5xl font-bold gradient-text bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 p-2">
            Time Based Typing Test Challenge
          </span>
          <FontAwesomeIcon icon={faBolt} className="text-yellow-400 ml-4" />
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Measure your speed, improve your accuracy, and challenge yourself!
        </p>
      </div>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Typingo</h1>
            </div>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                Speed Mode
              </span>
            </div>
          </div>
        </div>

        {/* Time Selection (always visible) */}
        <div className="flex justify-center space-x-4 my-6">
          {DURATIONS.map((duration) => (
            <button
              key={duration}
              onClick={() => handleSelectDuration(duration)}
              disabled={testStarted}
              className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all
                ${
                  testDuration === duration
                    ? 'bg-blue-500 text-white shadow'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }
                ${testStarted ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            >
              <FaStopwatch className="mr-2" />
              <span>{duration}s</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="p-6 pt-0">
          {/* Timer and Stats */}
          {(testText || testStarted) && (
            <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
              <div className="flex items-center text-2xl font-bold text-gray-800 space-x-2  mx-auto">
                <FaStopwatch />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {testStarted && (
            <div className="w-full bg-gray-200 rounded-full mb-6">
              <div
                className="progress-bar rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          )}

          {/* Text Display */}
          <div
            className="bg-gray-50 rounded-lg p-4 mb-6 h-40 overflow-y-auto border border-gray-200 font-mono text-lg"
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          >
            {renderText()}
          </div>

          {/* Input Area */}
          <div className="flex flex-col gap-4">
            <input
              ref={inputRef}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Start typing here..."
              value={userInput}
              onChange={(e) => {
                if (testStarted) setUserInput(e.target.value)
              }}
              disabled={!testStarted}
              spellCheck={false}
            />
            <button
              className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all w-1/4 mx-auto
                ${
                  testStarted
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }
              `}
              onClick={startTest}
              disabled={testStarted}
              type="button"
            >
              {testStarted ? (
                <>
                  <FaStopwatch className="mr-2" />
                  Testing...
                </>
              ) : (
                <>
                  <FaRedo className="mr-2" />
                  Start Test
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Test Results
              </h2>
              <p className="text-gray-600">Your typing performance</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
                <FaTachometerAlt className="text-blue-500 text-2xl mb-1" />
                <div className="text-blue-500 font-bold text-3xl mb-1">
                  {wpm}
                </div>
                <div className="text-xs text-blue-600">WPM</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center">
                <FaBullseye className="text-green-500 text-2xl mb-1" />
                <div className="text-green-500 font-bold text-3xl mb-1">
                  {accuracy}
                </div>
                <div className="text-xs text-green-600">Accuracy</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg flex flex-col items-center">
                <FaTimesCircle className="text-purple-500 text-2xl mb-1" />
                <div className="text-purple-500 font-bold text-3xl mb-1">
                  {errors}
                </div>
                <div className="text-xs text-purple-600">Errors</div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg flex flex-col items-center">
                <FaStopwatch className="text-amber-500 text-2xl mb-1" />
                <div className="text-amber-500 font-bold text-3xl mb-1">
                  {testDuration}
                </div>
                <div className="text-xs text-amber-600">Seconds</div>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <button
                className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={tryAgainTest}
                type="button"
              >
                <FaRedo className="mr-2" /> Try Again
              </button>
              <button
                className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                onClick={newTest}
                type="button"
              >
                <FaSyncAlt className="mr-2" /> New Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TypingSpeedTest
