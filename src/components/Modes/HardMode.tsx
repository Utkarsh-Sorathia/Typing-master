import React, { useState, useRef, useEffect } from 'react'

// FontAwesome icons (ensure you have fontawesome loaded in your project)
import {
  FaBolt,
  FaFire,
  FaRocket,
  FaTrophy,
  FaTachometerAlt,
  FaBullseye,
  FaTimesCircle,
  FaRedo,
  FaHeart,
} from 'react-icons/fa'

type Mode = 5 | 10 | 15 | null

const HardMode: React.FC = () => {
  // State
  const [mode, setMode] = useState<Mode>(null)
  const [words, setWords] = useState<string[]>([])
  const [fullText, setFullText] = useState('')
  const [typedText, setTypedText] = useState('')
  const [errors, setErrors] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [timer, setTimer] = useState(0)
  const [testFinished, setTestFinished] = useState(false)
  const [originalWords, setOriginalWords] = useState<string[]>([])
  const [finalStats, setFinalStats] = useState({
    wpm: 0,
    accuracy: 100,
    errors: 0,
  })

  // Refs
  const inputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  console.log(words)
  // Effects
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
      typedText.length === fullText.length &&
      fullText.length > 0 &&
      !testFinished
    ) {
      finishTest()
    }
    // eslint-disable-next-line
  }, [typedText])

  // Handlers
  // Remove SAMPLE_WORDS array

  const handleModeSelect = async (count: Mode) => {
    if (!count) return
    try {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=${count}`,
      )
      const data = await response.json()
      const selectedWords: string[] = Array.isArray(data) ? data : []
      setWords(selectedWords)
      setOriginalWords(selectedWords)
      setFullText(selectedWords.join(' '))
      setTypedText('')
      setErrors(0)
      setStartTime(null)
      setTimer(0)
      setTestFinished(false)
      setMode(count)
      setFinalStats({ wpm: 0, accuracy: 100, errors: 0 })
      setTimeout(() => inputRef.current?.focus(), 100)
    } catch (err) {
      alert('Failed to fetch random words. Please try again.')
    }
  }

  const startNewTest = async () => {
    if (!mode) return
    try {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=${mode}`,
      )
      const data = await response.json()
      const selectedWords: string[] = Array.isArray(data) ? data : []
      setWords(selectedWords)
      setOriginalWords(selectedWords)
      setFullText(selectedWords.join(' '))
      setTypedText('')
      setErrors(0)
      setStartTime(null)
      setTimer(0)
      setTestFinished(false)
      setFinalStats({ wpm: 0, accuracy: 100, errors: 0 })
      setTimeout(() => inputRef.current?.focus(), 100)
    } catch (err) {
      alert('Failed to fetch random words. Please try again.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (startTime === null && value.length > 0) {
      setStartTime(Date.now())
    }
    setTypedText(value)

    // Count errors
    let err = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== fullText[i]) err++
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
    setWords([...originalWords])
    setFullText(originalWords.join(' '))
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
    <div className="flex items-center justify-center p-4 bg-slate-100 font-sans" id='hard-mode'>
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Typing Master</h1>
            </div>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                Hard Mode
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Mode Selection */}
          {!mode && !testFinished && (
            <div className="mb-8 text-center">
              <h2 className="text-xl font-semibold mb-4">Select Word Count</h2>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => handleModeSelect(5)}
                  className="mode-btn px-6 py-3 bg-primary/10 text-primary rounded-lg font-medium hover:bg-primary/20 transition-all flex items-center"
                >
                  <FaBolt className="mr-2" /> 5 Words
                </button>
                <button
                  onClick={() => handleModeSelect(10)}
                  className="mode-btn px-6 py-3 bg-secondary/10 text-secondary rounded-lg font-medium hover:bg-secondary/20 transition-all flex items-center"
                >
                  <FaFire className="mr-2" /> 10 Words
                </button>
                <button
                  onClick={() => handleModeSelect(15)}
                  className="mode-btn px-6 py-3 bg-amber-500/10 text-amber-600 rounded-lg font-medium hover:bg-amber-500/20 transition-all flex items-center"
                >
                  <FaRocket className="mr-2" /> 15 Words
                </button>
              </div>
            </div>
          )}

          {/* Typing Area */}
          {mode && !testFinished && (
            <div>
              {/* Text Display */}
              <div
                className="bg-gray-50 rounded-xl p-6 mb-4 text-display font-mono text-lg"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                <span>
                  {fullText.split('').map((char, i) => {
                    let charClass = 'text-gray-800'
                    if (i < typedText.length) {
                      charClass =
                        typedText[i] === fullText[i]
                          ? 'text-green-600'
                          : 'text-red-500'
                    }
                    const isCursor = i === typedText.length
                    return (
                      <span
                        key={i}
                        className={
                          charClass + (isCursor ? ' typing-cursor' : '')
                        }
                        style={
                          isCursor
                            ? { animation: 'blink 1s step-end infinite' }
                            : {}
                        }
                      >
                        {char}
                      </span>
                    )
                  })}
                </span>
              </div>

              {/* Input Area */}
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="Start typing here..."
                  value={typedText}
                  onChange={handleInputChange}
                  disabled={testFinished}
                  autoFocus
                />
                <div className="absolute right-3 top-3 bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                  <span>{`${Math.floor(timer / 60)}:${(timer % 60)
                    .toString()
                    .padStart(2, '0')}`}</span>
                </div>
              </div>

              {/* Live Stats */}
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
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
            </div>
          )}

          {/* Results */}
          {testFinished && (
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mb-6">
                <div className="inline-block bg-white p-2 rounded-full mb-4 shadow-md">
                  <FaTrophy className="text-3xl text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Test Completed!
                </h3>
                <p className="text-gray-600 mb-6">
                  Here are your typing statistics
                </p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-primary text-3xl mb-1">
                      <FaTachometerAlt />
                    </div>
                    <p className="text-sm text-gray-500">Speed</p>
                    <p className="text-xl font-bold">
                      <span>{finalStats.wpm}</span> WPM
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-secondary text-3xl mb-1">
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
              <div className="flex justify-center space-x-4">
                <button
                  onClick={restartTest}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center"
                >
                  <FaRedo className="mr-2" /> Try Again
                </button>
                <button
                  onClick={startNewTest}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all flex items-center"
                >
                  <FaRedo className="mr-2" /> Start Again (New Words)
                </button>
              </div>
            </div>
          )}
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>
              Press any key to start. Type all the words as fast as you can!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
          <p>
            Made with <FaHeart className="inline text-rose-500" /> by Typing
            Master
          </p>
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

export default HardMode
