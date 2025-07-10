import React, { useState } from 'react';

function MainCard({ isEditing, profileImage }) {
  const [profileData, setProfileData] = useState({
    nome: 'Thais de Cassia',
    idade: 25,
    profissao: 'Desenvolvedora Full Stack',
    endereco: 'Rio Pomba, MG',
    sobre: 'Desenvolvedora apaixonada por tecnologia e inovação. Trabalho com React, Node.js e outras tecnologias modernas.'
  });

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