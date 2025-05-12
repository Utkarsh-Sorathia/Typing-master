// import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Tests from '../components/Typing-test/Tests'
import KeyboardLearning from '../components/Keyboard-mastery/KeyboardTest'

const Routers = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Tests />} />
            <Route path='/keyboard-mastery' element={<KeyboardLearning />} />
        </Routes>
    </div>
  )
}

export default Routers