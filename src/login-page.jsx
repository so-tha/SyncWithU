import './App.css'
import Header from './components/header'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/profile');
  };

  return (
    <><Header showNav={false} />
    <nav className='main-card'>
          <div className='login-container'>
              <h2 className='login-title'>Faça login</h2>
              <form className='login-form'> 
                  <input className='login-input' type="email" placeholder='email@gmail.com' />
                  <input className='login-input' type="password" placeholder='Password' />
                  <button className='login-btn' type='button' onClick={handleLogin}>Login</button>
              </form>
          </div>
      </nav>
    </>
  )
}

export default LoginPage;