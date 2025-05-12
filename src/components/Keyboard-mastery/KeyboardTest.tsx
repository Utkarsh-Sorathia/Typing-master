import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faKeyboard } from '@fortawesome/free-solid-svg-icons'

// Finger mapping for tooltips
const fingerMap: Record<string, string> = {
  '~': 'Left Pinky',
  '1': 'Left Pinky',
  '2': 'Left Ring',
  '3': 'Left Middle',
  '4': 'Left Index',
  '5': 'Left Index',
  '6': 'Right Index',
  '7': 'Right Index',
  '8': 'Right Middle',
  '9': 'Right Ring',
  '0': 'Right Pinky',
  '-': 'Right Pinky',
  '=': 'Right Pinky',
  Backspace: 'Right Pinky',
  Tab: 'Left Pinky',
  Q: 'Left Pinky',
  W: 'Left Ring',
  E: 'Left Middle',
  R: 'Left Index',
  T: 'Left Index',
  Y: 'Right Index',
  U: 'Right Index',
  I: 'Right Middle',
  O: 'Right Ring',
  P: 'Right Pinky',
  '[': 'Right Pinky',
  ']': 'Right Pinky',
  '\\': 'Right Pinky',
  'Caps Lock': 'Left Pinky',
  A: 'Left Pinky',
  S: 'Left Ring',
  D: 'Left Middle',
  F: 'Left Index',
  G: 'Left Index',
  H: 'Right Index',
  J: 'Right Index',
  K: 'Right Middle',
  L: 'Right Ring',
  ';': 'Right Pinky',
  "'": 'Right Pinky',
  Enter: 'Right Pinky',
  ShiftL: 'Left Pinky',
  Z: 'Left Pinky',
  X: 'Left Ring',
  C: 'Left Middle',
  V: 'Left Index',
  B: 'Left Index',
  N: 'Right Index',
  M: 'Right Index',
  ',': 'Right Middle',
  '.': 'Right Ring',
  '/': 'Right Pinky',
  ShiftR: 'Right Pinky',
  Space: 'Thumbs',
}

const keyboardRows = [
  [
    { label: '~', code: 'Backquote' },
    { label: '1', code: 'Digit1' },
    { label: '2', code: 'Digit2' },
    { label: '3', code: 'Digit3' },
    { label: '4', code: 'Digit4' },
    { label: '5', code: 'Digit5' },
    { label: '6', code: 'Digit6' },
    { label: '7', code: 'Digit7' },
    { label: '8', code: 'Digit8' },
    { label: '9', code: 'Digit9' },
    { label: '0', code: 'Digit0' },
    { label: '-', code: 'Minus' },
    { label: '=', code: 'Equal' },
    { label: 'Backspace', code: 'Backspace', wide: true },
  ],
  [
    { label: 'Tab', code: 'Tab', wide: true },
    { label: 'Q', code: 'KeyQ' },
    { label: 'W', code: 'KeyW' },
    { label: 'E', code: 'KeyE' },
    { label: 'R', code: 'KeyR' },
    { label: 'T', code: 'KeyT' },
    { label: 'Y', code: 'KeyY' },
    { label: 'U', code: 'KeyU' },
    { label: 'I', code: 'KeyI' },
    { label: 'O', code: 'KeyO' },
    { label: 'P', code: 'KeyP' },
    { label: '[', code: 'BracketLeft' },
    { label: ']', code: 'BracketRight' },
    { label: '\\', code: 'Backslash', wide: true },
  ],
  [
    { label: 'Caps Lock', code: 'CapsLock', wide: true },
    { label: 'A', code: 'KeyA' },
    { label: 'S', code: 'KeyS' },
    { label: 'D', code: 'KeyD' },
    { label: 'F', code: 'KeyF' },
    { label: 'G', code: 'KeyG' },
    { label: 'H', code: 'KeyH' },
    { label: 'J', code: 'KeyJ' },
    { label: 'K', code: 'KeyK' },
    { label: 'L', code: 'KeyL' },
    { label: ';', code: 'Semicolon' },
    { label: "'", code: 'Quote' },
    { label: 'Enter', code: 'Enter', wide: true },
  ],
  [
    { label: 'Shift', code: 'ShiftLeft', wide: true },
    { label: 'Z', code: 'KeyZ' },
    { label: 'X', code: 'KeyX' },
    { label: 'C', code: 'KeyC' },
    { label: 'V', code: 'KeyV' },
    { label: 'B', code: 'KeyB' },
    { label: 'N', code: 'KeyN' },
    { label: 'M', code: 'KeyM' },
    { label: ',', code: 'Comma' },
    { label: '.', code: 'Period' },
    { label: '/', code: 'Slash' },
    { label: 'Shift', code: 'ShiftRight', wide: true },
  ],
  [
    { label: '', code: 'Empty1', empty: true },
    { label: '', code: 'Empty2', empty: true },
    { label: '', code: 'Empty3', empty: true },
    { label: 'Space', code: 'Space', space: true },
    { label: '', code: 'Empty4', empty: true },
    { label: '', code: 'Empty5', empty: true },
    { label: '', code: 'Empty6', empty: true },
  ],
]

const homeKeys = ['F', 'J']

export default function KeyboardLearning() {
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [typed, setTyped] = useState<string>('')

  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKey(e.code)

      // Only allow typing printable keys
      if (e.key.length === 1 || e.code === 'Space' || e.code === 'Backspace') {
        setTyped((prev) => {
          if (e.code === 'Backspace') {
            return prev.slice(0, -1)
          }
          if (e.code === 'Space') {
            return prev + ' '
          }
          if (e.key.length === 1) {
            return prev + e.key
          }
          return prev
        })
      }
    }
    const handleKeyUp = () => {
      setPressedKey(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [enabled])

  // For tooltips
  const getFingerHint = (label: string, code: string) => {
    if (label === 'Shift' && code === 'ShiftLeft') return 'Left Pinky'
    if (label === 'Shift' && code === 'ShiftRight') return 'Right Pinky'
    if (label === '' || label === undefined) return ''
    if (label === ' ') return 'Thumbs'
    if (label === 'Space') return 'Thumbs'
    return fingerMap[label] || ''
  }

  return (
    <section className="max-w-7xl mx-auto mt-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 flex items-center justify-center">
          <FontAwesomeIcon icon={faKeyboard} className="text-indigo-500 mr-4" />
          <span className="text-5xl font-bold gradient-text bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 p-2">
            Keyboard Mastery
          </span>
          <FontAwesomeIcon icon={faBolt} className="text-yellow-400 ml-4" />
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          Learn proper finger placement and technique with our interactive
          keyboard visualization.
        </p>
      </div>
      <div className="glass-card p-8 rounded-xl mt-4">
        <div className="flex justify-center mb-8">
          <div className='border border-indigo-200 rounded p-4'>
            {keyboardRows.map((row, rowIdx) => (
              <div key={rowIdx} className="flex mb-1">
                {row.map((key, keyIdx) => {
                  if ('empty' in key && key.empty)
                    return <div key={keyIdx} className="w-10 h-10 mx-0.5" />
                  if ('space' in key && key.space)
                    return (
                      <div
                        key={keyIdx}
                        className={`keyboard-key bg-indigo-100 rounded w-64 h-10 flex items-center justify-center font-medium mx-0.5 ${
                          !enabled
                            ? 'opacity-50 pointer-events-none select-none'
                            : ''
                        }`}
                        tabIndex={-1}
                        onMouseEnter={() => enabled && setHoveredKey('Space')}
                        onMouseLeave={() => enabled && setHoveredKey(null)}
                      >
                        Space
                        {hoveredKey === 'Space' && enabled && (
                          <span className="absolute mt-16 px-2 py-1 bg-black text-white text-xs rounded shadow-lg z-50">
                            {getFingerHint('Space', 'Space')}
                          </span>
                        )}
                      </div>
                    )
                  const isHomeKey = homeKeys.includes(key.label)
                  const isPressed = enabled && pressedKey === key.code
                  const isHovered =
                    enabled &&
                    (hoveredKey === key.label || hoveredKey === key.code)
                  const baseColor =
                    key.label === 'Backspace' ||
                    key.label === 'Tab' ||
                    key.label === 'Caps Lock' ||
                    key.label === 'Enter' ||
                    key.label === 'Shift'
                      ? 'bg-indigo-100'
                      : 'bg-white'
                  const textColor =
                    isPressed || isHomeKey
                      ? 'text-black'
                      : key.label === 'G' || key.label === 'H'
                      ? 'text-black'
                      : 'text-gray-900'
                  const bgColor = isPressed
                    ? 'bg-indigo-500'
                    : isHomeKey
                    ? 'bg-indigo-500'
                    : baseColor

                  return (
                    <div
                      key={keyIdx}
                      className={`keyboard-key rounded h-10 flex items-center justify-center font-medium mx-0.5 relative select-none ${
                        'wide' in key && key.wide ? 'w-20' : 'w-10'
                      } ${key.label === 'Tab' ? 'w-16' : ''} ${
                        key.label === '\\' ? 'w-14' : ''
                      } ${key.label === 'Caps Lock' ? 'w-20' : ''} ${
                        key.label === 'Enter' ? 'w-24' : ''
                      } ${
                        key.label === 'Shift' && key.code === 'ShiftRight'
                          ? 'w-28'
                          : ''
                      } ${bgColor} ${textColor} ${
                        !enabled
                          ? 'opacity-50 pointer-events-none select-none'
                          : ''
                      }`}
                      tabIndex={-1}
                      onMouseEnter={() => enabled && setHoveredKey(key.label)}
                      onMouseLeave={() => enabled && setHoveredKey(null)}
                    >
                      <span>
                        {key.label}
                        {/* Tactile marker for F and J */}
                        {isHomeKey && (
                          <span className="block w-2 h-1 mx-auto mt-1 bg-yellow-400 rounded" />
                        )}
                      </span>
                      {/* Tooltip for finger placement */}
                      {isHovered && (
                        <span className="absolute mt-16 px-2 py-1 bg-black text-white text-xs rounded shadow-lg z-50">
                          {getFingerHint(key.label, key.code)}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Hover over keys to see proper finger placement. Home keys (F and J)
            have tactile markers.
          </p>
          <div className="flex justify-center">
            <button
              className={`bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center mx-auto ${
                enabled ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              onClick={() => {
                if (!enabled) {
                  setEnabled(true)
                  setTyped('')
                }
              }}
              disabled={enabled}
            >
              <FontAwesomeIcon icon={faKeyboard} className="mr-2" /> Start
              Keyboard Practice
            </button>
            <button
              className={`bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center mx-auto ${
                !enabled ? 'opacity-60 cursor-not-allowed' : ''
              }`}
              onClick={() => {
                if (enabled) {
                  setEnabled(false)
                  setTyped('')
                }
              }}
              disabled={!enabled}
            >
              <FontAwesomeIcon icon={faKeyboard} className="mr-2" /> Stop
              Keyboard Practice
            </button>
          </div>
        </div>
      </div>
      {/* Typing Card */}
      <div className="mt-12 flex justify-center mb-12">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border-4 border-indigo-200 p-10 min-h-[160px] flex items-center text-3xl font-mono select-none break-words">
          {enabled ? (
            typed.length > 0 ? (
              <span>{typed}</span>
            ) : (
              <span className="text-gray-400">
                Start typing to see your input here...
              </span>
            )
          ) : (
            <span className="text-gray-400">
              Click "Start Keyboard Practice" to begin.
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
