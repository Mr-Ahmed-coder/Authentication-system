import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <nav className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">AS</div>
          <div className="navbar-title-group">
            <span className="navbar-title">Ahmed's Project Authentication System</span>
            <span className="navbar-subtitle">Secure MERN login &amp; register</span>
          </div>
        </Link>

        <div className="navbar-actions">
          <Link to="/" className="navbar-link">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              <span className="navbar-email">{user.email}</span>
              <Button variant="ghost" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
              <Button variant="primary" onClick={() => navigate('/register')}>Get Started</Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
