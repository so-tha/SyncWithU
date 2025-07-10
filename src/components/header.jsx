import React from 'react';

function Header({ showNav = true, isEditing = false, setIsEditing = null, onLogout = null }) {
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
      
      {showNav && (
        <nav className="header-nav">
          <a href="/profile">Perfil</a>
          <a href="/edit">Editar</a>
        </nav>
      )}
      
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
          <button 
            className="menu-btn"
            onClick={() => setIsEditing(true)}
          >
            ✏️
          </button>
        )}
        
        <button 
          className="menu-btn"
          onClick={onLogout || handleLogout}
        >
          🚪
        </button>
      </div>
    </header>
  );
}

export default Header; 