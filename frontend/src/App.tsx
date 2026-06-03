import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  )
}

export default App
