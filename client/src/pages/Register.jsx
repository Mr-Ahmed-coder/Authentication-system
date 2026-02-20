import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/UI/Card.jsx';
import Input from '../components/UI/Input.jsx';
import Button from '../components/UI/Button.jsx';
import { registerUser } from '../api/authApi.js';
import { useAuth } from '../hooks/useAuth.js';

function Register() {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const data = await registerUser(form);
      login(data.token, { id: data.user._id, email: data.user.email });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <div className="card-header-white">
        <h2>Registration</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <div className="form-error">{error}</div>}
          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? 'Creating account...' : 'Register Now'}
          </Button>
        </form>
        <p className="form-footer">
          Already have an account?{' '}
          <Link to="/login">Login now</Link>
        </p>
      </div>
    </Card>
  );
}

export default Register;
