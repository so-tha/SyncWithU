import './App.css'
import profileImage from '/profile/profile.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './components/header'
import MainCard from './components/main-card'

function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <> 
    <Header isEditing={isEditing} setIsEditing={setIsEditing} showNav={true} onLogout={handleLogout} />
  <MainCard isEditing={isEditing} profileImage={profileImage} />
    </>
  )
}

export default EditProfile
