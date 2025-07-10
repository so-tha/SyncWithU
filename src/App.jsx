import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './login-page'
import EditProfile from './edit-profile'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
