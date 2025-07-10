import './App.css'
import Header from './components/header'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    idade: ''
  });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const response = await fetch('http://localhost:3001/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/');
      } else {
        setErro(data.message || 'Erro no cadastro');
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
              <h2 className='login-title'>Criar conta</h2>
              <form className='login-form' onSubmit={handleRegister}> 
                  <input 
                    className='login-input' 
                    type="text" 
                    placeholder='Nome' 
                    value={formData.nome}
                    onChange={(e) => handleInputChange('nome', e.target.value)}
                    required
                  />
                  <input 
                    className='login-input' 
                    type="email" 
                    placeholder='email@gmail.com' 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                  <input 
                    className='login-input' 
                    type="password" 
                    placeholder='Senha' 
                    value={formData.senha}
                    onChange={(e) => handleInputChange('senha', e.target.value)}
                    required
                  />
                  <input 
                    className='login-input' 
                    type="number" 
                    placeholder='Idade' 
                    value={formData.idade}
                    onChange={(e) => handleInputChange('idade', e.target.value)}
                    required
                  />
                  {erro && <p className='erro-mensagem'>{erro}</p>}
                  <button 
                    className='login-btn' 
                    type='submit' 
                    disabled={carregando}
                  >
                    {carregando ? 'Criando conta...' : 'Criar conta'}
                  </button>
                  <p className='login-link'>
                    Já tem uma conta? <a href="/">Faça login</a>
                  </p>
              </form>
          </div>
      </nav>
    </>
  )
}

export default RegisterPage; 