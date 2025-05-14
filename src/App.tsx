// src/App.tsx
import React from 'react'
import Navbar from './components/Header/Navbar'
import Routers from './routers/Routers'
import Footer from './components/Footer/Footer'

const App: React.FC = () => {
  // const [mode, setMode] = useState<'easy' | 'hard'>('easy');

  return (
    <>
      <div className="bg-gray-100">
        <Navbar />
        <div className="min-h-screen pt-16">
          <Routers />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
