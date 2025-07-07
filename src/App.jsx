import './App.css'
import profileImage from '/profile/profile.png'
import { useState } from 'react';
import Header from './components/header'
import MainCard from './components/main-card'

function App() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <> 
    <Header isEditing={isEditing} setIsEditing={setIsEditing} />
    <MainCard isEditing={isEditing} profileImage={profileImage} />
    </>
  )
}

export default App
