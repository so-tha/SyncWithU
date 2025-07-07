export default function MainCard({ isEditing, profileImage }) {
  return (
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
                <input className="edit-input name" defaultValue="Theodora Coelho" />
                <input className="edit-input job" defaultValue="Doctor specializing in mental health" />
                <input className="edit-input address" defaultValue="Rua Ricardo José, 200, Visconde do Rio Branco" />
              </>
            ) : (
              <>
                <img src={profileImage} alt="profile photo" />
                <h2 className='name-above-photo'>Theodora Coelho</h2>
                <h2 className='age'>25 anos</h2>
                <p className='job-address'>Doctor specializing in mental health</p>
                <p className='job-address'>Rua Ricardo José, 200, Visconde do Rio Branco</p>
              </>
            )}
          </div>
        </div>  
        <div>
          <h2 className='about'>About</h2>
          {isEditing ? (
            <textarea className="edit-textarea" defaultValue="Experienced software engineer with a passion for creating innovative solutions. Skilled in various programming languages and frameworks, with a focus on developing scalable and efficient applications. Committed to continuous learning and staying up-to-date with the latest industry trends." />
          ) : (
            <p className='about-text'>Experienced software engineer with a passion for creating innovative solutions. Skilled in various programming languages and frameworks, with a focus on developing scalable and efficient applications. Committed to continuous learning and staying up-to-date with the latest industry trends.</p>
          )}
        </div>    
      </nav>
  )
}