import './App.css'
import Header from './components/header'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('usuario', JSON.stringify(data.data.usuario));
        navigate('/profile');
      } else {
        setErro(data.message || 'Erro no login');
      }
    } catch {
      setErro('Erro de conexão. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <><Header showNav={false} />
    <nav className='main-card'>
          <div className='login-container'>
              <h2 className='login-title'>Faça login</h2>
              <form className='login-form' onSubmit={handleLogin}> 
                  <input 
                    className='login-input' 
                    type="email" 
                    placeholder='email@gmail.com' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input 
                    className='login-input' 
                    type="password" 
                    placeholder='Password' 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                  {erro && <p className='erro-mensagem'>{erro}</p>}
                  <button 
                    className='login-btn' 
                    type='submit' 
                    disabled={carregando}
                  >
                    {carregando ? 'Entrando...' : 'Login'}
                  </button>
                  <p className='login-link'>
                    Não tem uma conta? <a href="/register">Criar conta</a>
                  </p>
              </form>
          </div>
      </nav>
    </>
  )
}

export default LoginPage;