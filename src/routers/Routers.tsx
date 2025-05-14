// import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Tests from '../components/Typing-test/Tests'
import KeyboardLearning from '../components/Keyboard-mastery/KeyboardTest'
import TypeMaster from '../components/Home/LandingPage'

const Routers = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<TypeMaster />} />
            <Route path="/tests" element={<Tests />} />
            <Route path='/keyboard-mastery' element={<KeyboardLearning />} />
        </Routes>
    </div>
  )
}

export default Routers