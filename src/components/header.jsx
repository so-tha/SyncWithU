import React from 'react';

function Header({  isEditing = false, setIsEditing = null, onLogout = null }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/';
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <span className="logo">SyncWithU</span>
      </div>
      
      
      <div className="header-right">
        {isEditing && setIsEditing && (
          <button 
            className="menu-btn"
            onClick={() => setIsEditing(false)}
          >
            ✓
          </button>
        )}
        
        {!isEditing && setIsEditing && (
          <a 
            className="edit-text"
            onClick={() => setIsEditing(true)}
          >
            Editar Perfil
          </a>
        )}
        
        <a
          className="logout-text"
          onClick={onLogout || handleLogout}
        >
         Sair
        </a>
      </div>
    </header>
  );
}

export default Header; 