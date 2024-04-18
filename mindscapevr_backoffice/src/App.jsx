import { useState } from 'react'
import LandingPage from './components/landingpage';
import Navbar from './components/navbar';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />
    <LandingPage />
  </div>
  )
}

export default App
