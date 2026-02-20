import { Link } from 'react-router-dom';
import Button from '../components/UI/Button.jsx';

function Home() {
  return (
    <section className="home-section">
      <div>
        <h1 className="page-title">
          Secure Authentication,
          <br />
          Built on MERN.
        </h1>
        <p className="page-subtitle">
          System gaaban oo hordhac u ah big project aan soo wadno...waxa uu ku 
          dhisan yahay Luuqadaha MERN STACK
        </p>
        <div className="home-buttons">
          <Link to="/register">
            <Button variant="primary">Create account</Button>
          </Link>
          <Link to="/login">
            <Button variant="subtle">Login</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
