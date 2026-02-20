import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Card from '../components/UI/Card.jsx';
import Input from '../components/UI/Input.jsx';
import Button from '../components/UI/Button.jsx';
import { loginUser } from '../api/authApi.js';
import { useAuth } from '../hooks/useAuth.js';

/* Simple inline SVG icons */
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
    <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
  </svg>
);

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const data = await loginUser(form);
      login(data.token, { id: data.user._id, email: data.user.email });
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <div className="card-header">
        <h2>Customer Login</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            icon={<UserIcon />}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            icon={<LockIcon />}
            required
          />
          {error && <div className="form-error">{error}</div>}
          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <p className="form-footer">
          Not a member?{' '}
          <Link to="/register">Signup now</Link>
        </p>
      </div>
    </Card>
  );
}

export default Login;
