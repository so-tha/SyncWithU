import './App.css'
import profileImage from './assets/images/profile/profile.png'

function App() {

  return (
    <> 
    <nav>
      <div className='top'>
        <div className='top-photo-name-add'>
          <img src={profileImage} alt="profile photo" />
          <h2 className='name-above-photo'>Theodora Coelho</h2>
          <p className='job-address'>Doctor specializing in mental health</p>
          <p className='job-address'>Rua Ricardo José, 200, Visconde do Rio Branco</p>
        </div>
      </div>  
      <div>
        <h2 className='about'>About</h2>
        <p className='about-text'>Experienced software engineer with a passion for creating innovative solutions. Skilled in various programming languages and frameworks, with a focus on developing scalable and efficient applications. Committed to continuous learning and staying up-to-date with the latest industry trends.</p>
      </div>    
    </nav>
    </>
  )
}

export default App
