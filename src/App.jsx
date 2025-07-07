import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './login-page'
import EditProfile from './edit-profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/profile" element={<EditProfile />} />
    </Routes>
  )
}

export default App
