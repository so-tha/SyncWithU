import './App.css'
import profileImage from '../public/profile/profile.png'
import { useState } from 'react';

function App() {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <> 
    <header className="main-header">
      <div className="header-left">
        <span className="logo">SyncWithU</span>
      </div>
      <div className="header-right">
        <nav className="header-nav">
          <a href="#" onClick={() => {setIsEditing(!isEditing )}}>{isEditing ?  "Save" : "Edit Profile"}</a>
          <a href="#">Logout</a>
        </nav>
      </div>
    </header>
    <nav className="main-card">
      <div className='top'>
        <div className='top-photo-name-add'>
          {isEditing ? (
            <>
              <label className="edit-photo-label">
                <img src={profileImage} alt="profile" className="edit-photo" />
                <input type="file" style={{ display: "none" }} />
                <span className="edit-photo-btn">Trocar foto</span>
              </label>
              <input className="edit-input age" defaultValue="20" />
              <input className="edit-input name" defaultValue="Theodora Coelho" />
              <input className="edit-input job" defaultValue="Doctor specializing in mental health" />
              <input className="edit-input address" defaultValue="Rua Ricardo José, 200, Visconde do Rio Branco" />
            </>
          ) : (
            <>
              <img src={profileImage} alt="profile photo" />
              <div className="name-age-row">
                <h2 className='name-above-photo'>Theodora Coelho</h2>
                <span className='age'>20 anos</span>
              </div>
              <p className='job-address'>Doctor specializing in mental health</p>
              <p className='job-address'>Rua Ricardo José, 200, Visconde do Rio Branco</p>
            </>
          )}
        </div>
      </div>  
      <div>
        <h2 className='about'>Biography</h2>
        {isEditing ? (
          <textarea className="edit-textarea" defaultValue="Experienced software engineer with a passion for creating innovative solutions. Skilled in various programming languages and frameworks, with a focus on developing scalable and efficient applications. Committed to continuous learning and staying up-to-date with the latest industry trends." />
        ) : (
          <p className='about-text'>Experienced software engineer with a passion for creating innovative solutions. Skilled in various programming languages and frameworks, with a focus on developing scalable and efficient applications. Committed to continuous learning and staying up-to-date with the latest industry trends. Experienced software engineer with a passion for creating innovative solutions. Skilled in various programming languages and frameworks, with a focus on developing scalable and efficient applications. Committed to continuous learning and staying up-to-date with the latest industry trends. </p>
        )}
      </div>    
    </nav>
    </>
  )
}

export default App
