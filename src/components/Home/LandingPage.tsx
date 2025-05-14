import React, { useState, useRef, useEffect } from 'react'
import {
  FaArrowRight,
  FaSmile,
  FaUser,
  FaFire,
  FaCode,
  FaTrophy,
  FaCheckCircle,
  FaTimesCircle,
  FaKeyboard,
  FaTachometerAlt,
  FaBullseye,
  FaChartLine,
} from 'react-icons/fa'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

const TEST_TEXT = `The quick brown fox jumps over the lazy dog near the river bank. 
This sentence contains every letter of the alphabet and is often used for typing practice. 
Typing regularly helps improve speed and accuracy.`
const TEST_DURATION = 30 // seconds

function formatTime(sec: number) {
  return `0:${sec < 10 ? '0' : ''}${sec}`
}

const TypingMaster: React.FC = () => {
  // State
  const [userInput, setUserInput] = useState<string>('')
  const [started, setStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [errors, setErrors] = useState(0)
  const [inputDisabled, setInputDisabled] = useState(true)

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Start test
  const startTest = () => {
    setUserInput('')
    setStarted(true)
    setTimeLeft(TEST_DURATION)
    setWpm(0)
    setAccuracy(100)
    setErrors(0)
    setInputDisabled(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  // Timer effect
  useEffect(() => {
    if (!started) return
    if (timeLeft === 0) {
      setStarted(false)
      setInputDisabled(true)
      return
    }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [started, timeLeft])

  // Typing logic
  useEffect(() => {
    if (!started) return
    const correctChars = userInput
      .split('')
      .filter((ch, i) => ch === TEST_TEXT[i]).length
    const totalTyped = userInput.length
    const errorCount = totalTyped - correctChars
    setErrors(errorCount > 0 ? errorCount : 0)
    setAccuracy(
      totalTyped === 0 ? 100 : Math.round((correctChars / totalTyped) * 100),
    )
    const words = userInput.trim().split(/\s+/).filter(Boolean).length
    setWpm(Math.round((words / (TEST_DURATION - timeLeft + 1)) * 60))
  }, [userInput, started, timeLeft])

  // Handle input
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  // Text display with coloring
  const renderText = () => (
    <p className="font-mono break-words whitespace-pre-wrap">
      {TEST_TEXT.split('').map((char, idx) => {
        let className = ''
        if (idx < userInput.length) {
          className = char === userInput[idx] ? 'correct' : 'incorrect'
        }
        if (idx === userInput.length && started) className += ' current'
        return (
          <span key={idx} className={className}>
            {char}
          </span>
        )
      })}
    </p>
  )

  // --- JSX ---
  return (
    <div className="bg-slate-50 font-sans min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left */}
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Master Your <span className="text-blue-600">Typing Skills</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Improve your typing speed and accuracy with our interactive
                typing tests. Perfect for beginners and advanced typists alike.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-center flex items-center justify-center"
                  onClick={startTest}
                  disabled={started}
                >
                  Start Typing Test <FaArrowRight className="ml-2" />
                </button>
                <a
                  href="#modes"
                  className="px-8 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all shadow hover:shadow-md text-center"
                >
                  Explore Modes
                </a>
              </div>
            </div>
            {/* Right */}
            <div className="md:w-1/2 flex justify-center">
              <div className="relative max-w-md w-full">
                <div className="bg-white p-6 rounded-xl shadow-xl floating glow transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition bg-blue-100 text-blue-800"
                      onClick={() => inputRef.current?.focus()}
                    >
                      Quick Test
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div
                    id="textDisplay"
                    className="bg-gray-50 rounded-lg p-4 mb-4 h-52 overflow-y-auto border font-mono text-base"
                  >
                    {renderText()}
                  </div>
                  <input
                    ref={inputRef}
                    value={userInput}
                    onChange={handleInput}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Start typing here..."
                    disabled={inputDisabled}
                  />
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="text-xs text-gray-500">Speed</p>
                      <p className="font-bold">{wpm} WPM</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="text-xs text-gray-500">Accuracy</p>
                      <p className="font-bold">{accuracy}%</p>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <p className="text-xs text-gray-500">Errors</p>
                      <p className="font-bold">{errors}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modes Section (for display/marketing only) */}
      <section id="modes" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Typing Test Modes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from different modes to challenge yourself at various
              difficulty levels.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Easy */}
            <Link to="/tests">
              <ModeCard
                icon={<FaSmile className="text-xl" />}
                color="green"
                title="Easy Mode"
                desc="Perfect for beginners with simple words and sentences."
                highlight={
                  <>
                    <FaCheckCircle className="mr-1" /> Backspace allowed
                  </>
                }
              />
            </Link>
            {/* Normal */}
            <Link to="/tests">
              <ModeCard
                icon={<FaUser className="text-xl" />}
                color="blue"
                title="Normal Mode"
                desc="Standard typing test with regular text passages."
                highlight={
                  <>
                    <FaCheckCircle className="mr-1" /> Backspace allowed
                  </>
                }
              />
            </Link>
            {/* Hard */}
            <Link to="/tests">
              <ModeCard
                icon={<FaFire className="text-xl" />}
                color="red"
                title="Hard Mode"
                desc="No backspace allowed! Mistakes are permanent."
                highlight={
                  <>
                    <FaTimesCircle className="mr-1" /> No backspace
                  </>
                }
              />
            </Link>
            {/* Code */}
            <Link to="/tests">
              <ModeCard
                icon={<FaCode className="text-xl" />}
                color="purple"
                title="Code Mode"
                desc="Practice typing code with special characters."
                highlight={<> Code syntax</>}
              />
            </Link>
            {/* Mastery */}
            <div className="col-span-2 lg:col-span-4 mx-auto max-w-2xl">
              <Link to="/keyboard-mastery">
                <ModeCard
                  icon={<FaTrophy className="text-xl" />}
                  color="amber"
                  title="Keyboard Mastery"
                  desc="The ultimate challenge with random keys and finger positioning exercises."
                  highlight={
                    <>
                      <FaKeyboard className="mr-1" /> Advanced finger
                      positioning
                    </>
                  }
                  center
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Track Your Progress
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Monitor your typing performance across different metrics.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard
              icon={<FaTachometerAlt className="text-xl" />}
              color="blue"
              title="Speed"
              desc="Words Per Minute (WPM) measures how fast you can type while maintaining accuracy."
              rangeLeft="Beginner: 0-30 WPM"
              rangeRight="Expert: 80+ WPM"
              percent={45}
            />
            <StatCard
              icon={<FaBullseye className="text-xl" />}
              color="green"
              title="Accuracy"
              desc="Percentage of correct characters typed. Aim for 95%+ accuracy in your tests."
              rangeLeft="Acceptable: 90%"
              rangeRight="Excellent: 98%+"
              percent={92}
            />
            <StatCard
              icon={<FaChartLine className="text-xl" />}
              color="purple"
              title="Consistency"
              desc="Measure how consistently you maintain your speed and accuracy over time."
              rangeLeft="Irregular"
              rangeRight="Steady"
              percent={78}
            />
          </div>
        </div>
      </section>

      {/* Inline styles for animation and coloring */}
      <style>{`
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        .floating { animation: float 3s ease-in-out infinite; }
        .glow { box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
        .correct { color: #10b981; }
        .incorrect { color: #ef4444; text-decoration: underline; }
        .current { background-color: #e2e8f0; border-radius: 2px; }
      `}</style>
    </div>
  )
}

// --- ModeCard Component ---
interface ModeCardProps {
  icon: React.ReactNode
  color: string
  title: string
  desc: string
  highlight: React.ReactNode
  center?: boolean
}
const ModeCard: React.FC<ModeCardProps> = ({
  icon,
  color,
  title,
  desc,
  highlight,
  center,
}) => (
  <div
    className={clsx(
      'mode-card bg-white p-6 rounded-lg shadow-md border-t-4 cursor-pointer transition-all',
      `border-t-${color}-500`,
      center && 'mx-auto text-center',
    )}
    style={{ borderTopColor: `var(--tw-${color}-500, #000)` }}
  >
    <div
      className={`w-12 h-12 bg-${color}-100 text-${color}-600 rounded-full flex items-center justify-center mb-4 mx-auto`}
    >
      {icon}
    </div>
    <h3
      className={clsx(
        'text-xl font-semibold mb-2 text-gray-800',
        center && 'text-center',
      )}
    >
      {title}
    </h3>
    <p className={clsx('text-gray-600 mb-4', center && 'text-center')}>
      {desc}
    </p>
    <div
      className={clsx(
        'text-sm font-medium flex items-center',
        `text-${color}-600`,
        center && 'justify-center',
      )}
    >
      {highlight}
    </div>
  </div>
)

// --- StatCard Component ---
interface StatCardProps {
  icon: React.ReactNode
  color: string
  title: string
  desc: string
  rangeLeft: string
  rangeRight: string
  percent: number
}
const StatCard: React.FC<StatCardProps> = ({
  icon,
  color,
  title,
  desc,
  rangeLeft,
  rangeRight,
  percent,
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
    <div className="flex items-center mb-4">
      <div
        className={`w-12 h-12 bg-${color}-100 text-${color}-600 rounded-full flex items-center justify-center mr-4`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{desc}</p>
    <div className="mt-4">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>{rangeLeft}</span>
        <span>{rangeRight}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`bg-${color}-600 h-2.5 rounded-full`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  </div>
)

export default TypingMaster
