
export default function Header({ isEditing, setIsEditing }) {
  return (
    <header className="main-header">
<div className="header-left">
  <span className="logo">SyncWithU</span>
</div>
<div className="header-right">
  <nav className="header-nav">
    <a
      href="#"
      onClick={e => { e.preventDefault(); setIsEditing(!isEditing); }}
      style={{ color: isEditing ? "#1976d2" : undefined }}
    >
      {isEditing ? "Save" : "Edit Profile"}
    </a>
    <a href="#">Logout</a>
  </nav>
</div>
</header>
  )
}