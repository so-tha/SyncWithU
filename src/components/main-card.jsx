import React, { useState, useEffect, useRef } from 'react';

function MainCard({ isEditing, profileImage }) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const token = localStorage.getItem('token');
  const [profileData, setProfileData] = useState({
    nome: usuario?.nome || '',
    idade: usuario?.idade || '',
    profissao: usuario?.ocupacao || '',
    rua: usuario?.rua || '',
    bairro: usuario?.bairro || '',
    estado: usuario?.estado || '',
    sobre: usuario?.descricao || ''
  });
  const [fotoPerfil, setFotoPerfil] = useState(usuario?.foto || profileImage);
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
    
    const dadosParaEnviar = {
      nome: profileData.nome,
      email: usuario.email, 
      idade: profileData.idade ? parseInt(profileData.idade) : null,
      ocupacao: profileData.profissao,
      rua: profileData.rua,
      bairro: profileData.bairro,
      estado: profileData.estado,
      descricao: profileData.sobre
    };
    
    try {
      const response = await fetch(`http://localhost:3001/api/usuario/${usuario.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(dadosParaEnviar)
      });
      
      const data = await response.json();
      
      if (data.success) {
        const usuarioAtualizado = {
          ...usuario,
          nome: profileData.nome,
          idade: profileData.idade ? parseInt(profileData.idade) : null,
          ocupacao: profileData.profissao,
          rua: profileData.rua,
          bairro: profileData.bairro,
          estado: profileData.estado,
          descricao: profileData.sobre
        };
        
        localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
      } else {
        setErro(data.message || 'Erro ao salvar alterações');
      }
    } catch {
      setErro('Erro de conexão ao salvar.');
    } finally {
      setCarregando(false);
    }
  };

  const handleFotoChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('foto', file);

    try {
      const response = await fetch(`http://localhost:3001/api/usuario/${usuario.id}/foto`, {
        method: 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFotoPerfil(`http://localhost:3001${data.data.foto}`);
        const usuarioAtualizado = {
          ...usuario,
          foto: data.data.foto
        };
        localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
      } else {
        setErro(data.message || 'Erro ao fazer upload da foto');
      }
    } catch {
      setErro('Erro de conexão ao fazer upload da foto.');
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
        <img 
          src={fotoPerfil && fotoPerfil !== 'undefined' ? (fotoPerfil.startsWith('http') ? fotoPerfil : `http://localhost:3001${fotoPerfil}`) : profileImage} 
          alt="Foto do perfil" 
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            id="foto-input"
            style={{ marginTop: 8 }}
          />
        )}
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
              value={profileData.rua}
              onChange={e => handleInputChange('rua', e.target.value)}
              placeholder="Rua"
            />
            <input
              className='edit-input'
              type="text"
              value={profileData.bairro}
              onChange={e => handleInputChange('bairro', e.target.value)}
              placeholder="Bairro"
            />
            <input
              className='edit-input'
              type="text"
              value={profileData.estado}
              onChange={e => handleInputChange('estado', e.target.value)}
              placeholder="Estado"
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
            <p className='job-address'>{`${profileData.rua}${profileData.rua ? ', ' : ''}${profileData.bairro}${profileData.bairro ? ', ' : ''}${profileData.estado}`}</p>
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