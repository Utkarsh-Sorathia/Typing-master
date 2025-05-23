import React, { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import {
  FaTrophy,
  FaTachometerAlt,
  FaBullseye,
  FaTimesCircle,
  FaRedo,
  FaCode,
} from 'react-icons/fa'

const API_URL = 'https://random-code-utkarsh.vercel.app/random-code'

const CodeMode: React.FC = () => {
  const [snippet, setSnippet] = useState('')
  const [typedText, setTypedText] = useState('')
  const [errors, setErrors] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [timer, setTimer] = useState(0)
  const [testFinished, setTestFinished] = useState(false)
  const [finalStats, setFinalStats] = useState({
    wpm: 0,
    accuracy: 100,
    errors: 0,
  })

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch a random code snippet
  const fetchSnippet = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setSnippet(data.code || '')
      setTypedText('')
      setErrors(0)
      setStartTime(null)
      setTimer(0)
      setTestFinished(false)
      setFinalStats({ wpm: 0, accuracy: 100, errors: 0 })
      setTimeout(() => inputRef.current?.focus(), 100)
    } catch (err) {
      alert('Failed to fetch code snippet. Please try again.')
    }
  }

  useEffect(() => {
    fetchSnippet()
  }, [])

  useEffect(() => {
    if (startTime !== null && !testFinished) {
      intervalRef.current = setInterval(() => {
        setTimer(Math.floor((Date.now() - startTime) / 1000))
      }, 100)
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [startTime, testFinished])

  useEffect(() => {
    if (
      typedText.length === snippet.length &&
      snippet.length > 0 &&
      !testFinished
    ) {
      finishTest()
    }
  }, [typedText])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (startTime === null && value.length > 0) {
      setStartTime(Date.now())
    }
    setTypedText(value)
    // Count errors
    let err = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== snippet[i]) err++
    }
    setErrors(err)
  }

  const calcLiveStats = () => {
    const elapsedSeconds = timer
    const typedChars = typedText.length
    const wpm =
      elapsedSeconds > 0
        ? Math.round(typedChars / 5 / (elapsedSeconds / 60))
        : 0
    const correctChars = typedChars - errors
    const accuracy =
      typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100
    return { wpm, accuracy, errors }
  }

  const finishTest = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    const elapsedSeconds = (Date.now() - (startTime ?? 0)) / 1000
    const typedChars = typedText.length
    const wpm =
      elapsedSeconds > 0
        ? Math.round(typedChars / 5 / (elapsedSeconds / 60))
        : 0
    const correctChars = typedChars - errors
    const accuracy =
      typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100
    setFinalStats({ wpm, accuracy, errors })
    setTestFinished(true)
    setStartTime(null)
  }

  const restartTest = () => {
    setTypedText('')
    setErrors(0)
    setStartTime(null)
    setTimer(0)
    setTestFinished(false)
    setFinalStats({ wpm: 0, accuracy: 100, errors: 0 })
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  // Render
  return (
    <div
      className="flex items-center justify-center p-2 sm:p-4 font-sans"
      id="code-typing-test"
    >
      {/* SEO TAGS */}
      <Helmet>
        <title>Typingo | Code Typing Test</title>
        <meta name="description" content="Test and improve your code typing speed and accuracy with Typingo's Code Mode. Practice with random code snippets and track your WPM, accuracy, and errors." />
        <meta name="keywords" content="typing test, code typing, speed test, accuracy, WPM, programming, Typingo" />
        <meta property="og:title" content="Code Typing Test | Typingo" />
        <meta property="og:description" content="Challenge yourself with random code snippets. Measure your code typing speed and accuracy!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/code-mode-og-image.png" />
        <meta property="og:url" content="https://typingo.vercel.app/tests" />
        <link rel="canonical" href="https://typingo.vercel.app/tests" />
      </Helmet>

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold flex items-center mb-2 sm:mb-0">
              <FaCode className="mr-2" /> Code Typingo
            </h1>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
              Random Code Snippet
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-3 sm:p-6">
          {/* Code Display */}
          <pre
            className="bg-gray-900 rounded-xl p-3 sm:p-6 mb-4 text-display font-mono text-base text-green-100 overflow-x-auto whitespace-pre-wrap text-left"
            style={{ fontFamily: "'Fira Code', monospace", maxHeight: '320px' }}
          >
            {snippet.split('').map((char, i) => {
              let charClass = 'text-green-100'
              if (i < typedText.length) {
                charClass =
                  typedText[i] === snippet[i]
                    ? 'text-green-400'
                    : 'text-red-400'
              }
              const isCursor = i === typedText.length
              return (
                <span
                  key={i}
                  className={charClass + (isCursor ? ' typing-cursor' : '')}
                  style={
                    isCursor ? { animation: 'blink 1s step-end infinite' } : {}
                  }
                >
                  {char}
                </span>
              )
            })}
          </pre>

          {/* Input Area */}
          {!testFinished && (
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all font-mono text-base sm:text-lg"
                placeholder="Start typing the code here..."
                value={typedText}
                onChange={handleInputChange}
                disabled={testFinished}
                autoFocus
              />
              <div className="absolute right-2 top-2 sm:right-3 sm:top-3 bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                <span>{`${Math.floor(timer / 60)}:${(timer % 60)
                  .toString()
                  .padStart(2, '0')}`}</span>
              </div>
            </div>
          )}

          {/* Live Stats */}
          {!testFinished && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Speed</p>
                <p className="text-xl font-bold">
                  <span>{calcLiveStats().wpm}</span> WPM
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Accuracy</p>
                <p className="text-xl font-bold">
                  <span>{calcLiveStats().accuracy}</span>%
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Errors</p>
                <p className="text-xl font-bold">
                  <span>{calcLiveStats().errors}</span>
                </p>
              </div>
            </div>
          )}

          {/* Results */}
          {testFinished && (
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 sm:p-6 rounded-xl mb-6">
                <div className="inline-block bg-white p-2 rounded-full mb-4 shadow-md">
                  <FaTrophy className="text-3xl text-yellow-500" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Test Completed!
                </h3>
                <p className="text-gray-600 mb-6">
                  Here are your typing statistics
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-purple-600 text-3xl mb-1">
                      <FaTachometerAlt />
                    </div>
                    <p className="text-sm text-gray-500">Speed</p>
                    <p className="text-xl font-bold">
                      <span>{finalStats.wpm}</span> WPM
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-blue-600 text-3xl mb-1">
                      <FaBullseye />
                    </div>
                    <p className="text-sm text-gray-500">Accuracy</p>
                    <p className="text-xl font-bold">
                      <span>{finalStats.accuracy}</span>%
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-rose-500 text-3xl mb-1">
                      <FaTimesCircle />
                    </div>
                    <p className="text-sm text-gray-500">Errors</p>
                    <p className="text-xl font-bold">
                      <span>{finalStats.errors}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={restartTest}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center justify-center"
                >
                  <FaRedo className="mr-2" /> Try Again
                </button>
                <button
                  onClick={fetchSnippet}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center"
                >
                  <FaRedo className="mr-2" /> New Snippet
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-gray-500 text-xs sm:text-sm">
            <p>
              Press any key to start. Type the code as fast and accurately as you can!
            </p>
          </div>
        </div>
      </div>
      {/* Custom CSS for blinking cursor */}
      <style>{`
        @keyframes blink { from, to { opacity: 1; } 50% { opacity: 0; } }
        .typing-cursor { animation: blink 1s step-end infinite; }
        .text-display { line-height: 1.8; letter-spacing: 0.5px; }
      `}</style>
    </div>
  )
}

export default CodeMode
