import React, { useState, useEffect, useRef } from 'react';

function MainCard({ isEditing, profileImage }) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const token = localStorage.getItem('token');
  const [profileData, setProfileData] = useState({
    nome: usuario?.nome || '',
    idade: usuario?.idade || '',
    profissao: usuario?.profissao || '',
    endereco: usuario?.endereco || '',
    sobre: usuario?.sobre || ''
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const prevIsEditing = useRef(isEditing);

  useEffect(() => {
    if (prevIsEditing.current && !isEditing) {
      salvarAlteracoes();
    }
    prevIsEditing.current = isEditing;
  }, [isEditing]);

  const salvarAlteracoes = async () => {
    setCarregando(true);
    setErro('');
    try {
      const response = await fetch(`http://localhost:3001/api/usuario/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          nome: profileData.nome,
          email: usuario.email, 
          idade: profileData.idade ? parseInt(profileData.idade) : null,
          profissao: profileData.profissao,
          endereco: profileData.endereco,
          sobre: profileData.sobre
        })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('usuario', JSON.stringify({
          ...usuario,
          ...profileData,
          idade: profileData.idade ? parseInt(profileData.idade) : null
        }));
      } else {
        setErro(data.message || 'Erro ao salvar alterações');
      }
    } catch {
      setErro('Erro de conexão ao salvar.');
    } finally {
      setCarregando(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <nav className='main-card'>
      <div className='top-photo-name-add'>
        <img src={profileImage} alt="Foto do perfil" />
        
        {isEditing ? (
          <div className='edit-fields'>
            <input
              className='edit-input'
              type="text"
              value={profileData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Nome"
            />
            <input
              className='edit-input'
              type="number"
              value={profileData.idade}
              onChange={(e) => handleInputChange('idade', e.target.value)}
              placeholder="Idade"
            />
            <input
              className='edit-input'
              type="text"
              value={profileData.profissao}
              onChange={(e) => handleInputChange('profissao', e.target.value)}
              placeholder="Profissão"
            />
            <input
              className='edit-input'
              type="text"
              value={profileData.endereco}
              onChange={(e) => handleInputChange('endereco', e.target.value)}
              placeholder="Endereço"
            />
            <textarea
              className='edit-textarea'
              value={profileData.sobre}
              onChange={(e) => handleInputChange('sobre', e.target.value)}
              placeholder="Sobre você"
            />
            {erro && <p className='erro-mensagem'>{erro}</p>}
            {carregando && <p className='login-link'>Salvando...</p>}
          </div>
        ) : (
          <>
            <div className='name-age-row'>
              <h1 className='name-above-photo'>{profileData.nome}</h1>
              <span className='age'>, {profileData.idade}</span>
            </div>
            <p className='job-address'>{profileData.profissao}</p>
            <p className='job-address'>{profileData.endereco}</p>
          </>
        )}
      </div>
      
      {!isEditing && (
        <div className='about-section'>
          <h2 className='about'>Sobre</h2>
          <p className='about-text'>{profileData.sobre}</p>
        </div>
      )}
    </nav>
  );
}

export default MainCard; 