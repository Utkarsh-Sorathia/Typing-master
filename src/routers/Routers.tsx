// import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Tests from '../components/Typing-test/Tests'
import KeyboardLearning from '../components/Keyboard-mastery/KeyboardTest'
import Typingo from '../components/Home/LandingPage'
import TimeBaseMode from '../components/Modes/TimeBase'

const Routers = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Typingo />} />
            <Route path="/tests" element={<Tests />} />
            <Route path="/time-base" element={<TimeBaseMode />} />
            <Route path='/keyboard-mastery' element={<KeyboardLearning />} />
        </Routes>
    </div>
  )
}

export default Routers