import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet' // Add this for SEO tags

type ModeType = 'alphabets' | 'words'

function generateAlphabet() {
  return Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))
}

async function fetchWords(count = 10, length = 4): Promise<string[]> {
  const url = `https://random-word-api.vercel.app/api?words=${count}&length=${length}`
  const resp = await fetch(url)
  return await resp.json()
}

export default function EasyMode() {
  const [section, setSection] = useState<ModeType>('alphabets')

  // Alphabets state
  const [letters, setLetters] = useState<string[]>(generateAlphabet())
  const [typedAlpha, setTypedAlpha] = useState('')
  const [startedAlpha, setStartedAlpha] = useState(false)
  const [finishedAlpha, setFinishedAlpha] = useState(false)
  const [startTimeAlpha, setStartTimeAlpha] = useState<number | null>(null)
  const [errorsAlpha, setErrorsAlpha] = useState(0)
  const inputAlphaRef = useRef<HTMLInputElement>(null)

  // Words state
  const [words, setWords] = useState<string[]>([])
  const [typedWords, setTypedWords] = useState('')
  const [startedWords, setStartedWords] = useState(false)
  const [finishedWords, setFinishedWords] = useState(false)
  const [startTimeWords, setStartTimeWords] = useState<number | null>(null)
  const [errorsWords, setErrorsWords] = useState(0)
  const [originalWords, setOriginalWords] = useState<string[]>([])
  const inputWordsRef = useRef<HTMLInputElement>(null)
  const [loadingWords, setLoadingWords] = useState(false)

  // Focus input on section switch
  useEffect(() => {
    if (section === 'alphabets') {
      inputAlphaRef.current?.focus()
    } else if (section === 'words') {
      inputWordsRef.current?.focus()
    }
  }, [section, letters, words])

  // Fetch words on mount or when new test is requested
  useEffect(() => {
    if (section === 'words' && words.length === 0) {
      handleNewWordsTest()
    }
    // eslint-disable-next-line
  }, [section])

  // --- Alphabets Section Logic ---

  function shuffleLetters() {
    setLetters([...letters].sort(() => Math.random() - 0.5))
    resetAlphaTest()
  }

  function resetAlphaTest() {
    setTypedAlpha('')
    setStartedAlpha(false)
    setFinishedAlpha(false)
    setStartTimeAlpha(null)
    setErrorsAlpha(0)
    if (inputAlphaRef.current) {
      inputAlphaRef.current.value = ''
      inputAlphaRef.current.disabled = false
      inputAlphaRef.current.focus()
    }
  }

  function handleTypingAlpha(e: React.ChangeEvent<HTMLInputElement>) {
    if (finishedAlpha) return
    const value = e.target.value
    if (!startedAlpha) {
      setStartedAlpha(true)
      setStartTimeAlpha(Date.now())
    }
    setTypedAlpha(value)
    let errorCount = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== letters[i]) errorCount++
    }
    setErrorsAlpha(errorCount)
    if (value.length === letters.length) {
      setFinishedAlpha(true)
      if (inputAlphaRef.current) {
        inputAlphaRef.current.disabled = true
      }
    }
  }

  function calculateWPMAlpha() {
    if (startTimeAlpha === null) return 0
    const timeInSeconds = (Date.now() - startTimeAlpha) / 1000
    return Math.round(letters.length / 5 / (timeInSeconds / 60))
  }

  function calculateAccuracyAlpha() {
    return Math.round(((letters.length - errorsAlpha) / letters.length) * 100)
  }

  // --- Words Section Logic ---

  async function handleNewWordsTest() {
    setLoadingWords(true)
    const newWords = await fetchWords(10, 4)
    setWords(newWords)
    setOriginalWords(newWords)
    resetWordsTest(newWords)
    setLoadingWords(false)
  }

  function resetWordsTest(wordsToUse = words) {
    setTypedWords('')
    setStartedWords(false)
    setFinishedWords(false)
    setStartTimeWords(null)
    setErrorsWords(0)
    setWords(wordsToUse)
    if (inputWordsRef.current) {
      inputWordsRef.current.value = ''
      inputWordsRef.current.disabled = false
      inputWordsRef.current.focus()
    }
  }

  function handleTypingWords(e: React.ChangeEvent<HTMLInputElement>) {
    if (finishedWords) return
    const value = e.target.value
    if (!startedWords) {
      setStartedWords(true)
      setStartTimeWords(Date.now())
    }
    setTypedWords(value)
    const target = words.join(' ')
    let errorCount = 0
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== target[i]) errorCount++
    }
    setErrorsWords(errorCount)
    if (value.length === target.length) {
      setFinishedWords(true)
      if (inputWordsRef.current) {
        inputWordsRef.current.disabled = true
      }
    }
  }

  function calculateWPMWords() {
    if (startTimeWords === null) return 0
    const timeInSeconds = (Date.now() - startTimeWords) / 1000
    const totalChars = words.join(' ').length
    return Math.round(totalChars / 5 / (timeInSeconds / 60))
  }

  function calculateAccuracyWords() {
    const totalChars = words.join(' ').length
    return Math.round(((totalChars - errorsWords) / totalChars) * 100)
  }


  // --- UI ---
  return (
    <main className="flex items-center justify-center p-2 sm:p-4 font-sans" id="easy-mode">
      {/* SEO tags */}
      <Helmet>
        <title>Easy Typing Test | Typingo</title>
        <meta name="description" content="Practice your typing skills with alphabets and words in Easy Mode. Track your speed and accuracy with Typingo." />
        <meta property="og:title" content="Easy Typing Test | Typingo" />
        <meta property="og:description" content="Practice your typing skills with alphabets and words in Easy Mode. Track your speed and accuracy with Typingo." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/easy-mode-og-image.png" />
        <meta property="og:url" content="https://typingo.vercel.app/tests" />
        <meta property="og:site_name" content="Typingo" />
      </Helmet>
      <section className="w-full max-w-2xl md:max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-500 to-green-500 p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold">Typingo</h1>
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">Easy Mode</span>
          </div>
        </header>

        {/* Section Tabs */}
        <nav className="flex flex-col xs:flex-row justify-center items-center gap-2 bg-gray-50 pt-4 pb-2">
          <button
            className={`w-full xs:w-auto px-4 py-2 rounded-t-lg font-semibold transition-colors ${section === 'alphabets'
              ? 'bg-blue-500 text-white shadow'
              : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            onClick={() => setSection('alphabets')}
          >
            Alphabets
          </button>
          <button
            className={`w-full xs:w-auto px-4 py-2 rounded-t-lg font-semibold transition-colors ${section === 'words'
              ? 'bg-blue-500 text-white shadow'
              : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            onClick={() => setSection('words')}
          >
            Words
          </button>
        </nav>

        {/* Main Content */}
        <section className="p-4 sm:p-6">
          {section === 'alphabets' && (
            <>
              <div className="mb-6 sm:mb-8">
                <div className="bg-gray-100 rounded-lg p-4 sm:p-6 mb-4">
                  <div className="typing-text text-lg sm:text-xl md:text-2xl font-mono text-center leading-relaxed flex flex-wrap justify-center gap-x-1">
                    {letters.map((char, i) => (
                      <span
                        key={i}
                        className={
                          i < typedAlpha.length
                            ? typedAlpha[i] === char
                              ? 'text-green-500'
                              : 'text-red-500'
                            : ''
                        }
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
                <input
                  ref={inputAlphaRef}
                  onChange={handleTypingAlpha}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-base"
                  placeholder="Start typing here..."
                  disabled={finishedAlpha}
                  autoComplete="off"
                  value={typedAlpha}
                  aria-label="Type the alphabet"
                />
              </div>

              {finishedAlpha && (
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 sm:p-6 mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-green-600 mb-4">
                    Test Completed!
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-gray-500 text-sm">WPM</div>
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                        {calculateWPMAlpha()}
                      </div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-gray-500 text-sm">Accuracy</div>
                      <div className="text-2xl sm:text-3xl font-bold text-green-600">
                        {calculateAccuracyAlpha()}%
                      </div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-gray-500 text-sm">Errors</div>
                      <div className="text-2xl sm:text-3xl font-bold text-red-500">
                        {errorsAlpha}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                    <button
                      onClick={resetAlphaTest}
                      className="flex-1 mt-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={shuffleLetters}
                      className="flex-1 mt-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
                    >
                      Shuffle
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-4 sm:mt-6 text-center text-gray-500 text-sm">
                <p>
                  Press any key to start. Type the alphabet as fast as you can!
                </p>
              </div>
            </>
          )}

          {section === 'words' && (
            <>
              <div className="mb-4">
                <div className="bg-gray-100 rounded-lg p-4 sm:p-6 mb-4">
                  <div className="typing-text text-lg sm:text-xl md:text-2xl font-mono text-center leading-relaxed break-words">
                    {words.length === 0 && (
                      <span className="text-gray-400">Loading words...</span>
                    )}
                    {words.length > 0 &&
                      words
                        .join(' ')
                        .split('')
                        .map((char, i) => (
                          <span
                            key={i}
                            className={
                              i < typedWords.length
                                ? typedWords[i] === char
                                  ? 'text-green-500'
                                  : 'text-red-500'
                                : ''
                            }
                          >
                            {char}
                          </span>
                        ))}
                  </div>
                </div>
                <input
                  ref={inputWordsRef}
                  onChange={handleTypingWords}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-base"
                  placeholder="Start typing here..."
                  disabled={finishedWords || loadingWords || words.length === 0}
                  autoComplete="off"
                  value={typedWords}
                  aria-label="Type the words"
                />
              </div>

              {finishedWords && (
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 sm:p-6 mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-green-600 mb-4">
                    Test Completed!
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-gray-500 text-sm">WPM</div>
                      <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                        {calculateWPMWords()}
                      </div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-gray-500 text-sm">Accuracy</div>
                      <div className="text-2xl sm:text-3xl font-bold text-green-600">
                        {calculateAccuracyWords()}%
                      </div>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="text-gray-500 text-sm">Errors</div>
                      <div className="text-2xl sm:text-3xl font-bold text-red-500">
                        {errorsWords}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                    <button
                      onClick={() => resetWordsTest(originalWords)}
                      className="flex-1 mt-6 py-2 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200 font-medium"
                    >
                      Try Again
                    </button>
                    <button
                      onClick={handleNewWordsTest}
                      className="flex-1 mt-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
                      disabled={loadingWords}
                    >
                      {loadingWords ? 'Loading...' : 'New Test'}
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-4 sm:mt-6 text-center text-gray-500 text-sm">
                <p>
                  Press any key to start. Type all the words as fast as you can!
                </p>
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  )
}

