import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const usuario = localStorage.getItem('usuario');

  if (!token || !usuario) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
