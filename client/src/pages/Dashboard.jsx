import { useEffect, useState } from 'react';
import Card from '../components/UI/Card.jsx';
import { getMe } from '../api/authApi.js';
import { useAuth } from '../hooks/useAuth.js';

function Dashboard() {
  const { user } = useAuth();
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMe();
        setMe(data);
      } catch (e) {
        // handle error if needed
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="dashboard-space">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">
        System Tijaabo ah oo aad u  <span>secure</span>  gareysan
      </p>

      <Card>
        {loading ? (
          <div className="card-body">
            <p className="loading-text">Loading profile...</p>
          </div>
        ) : (
          <div className="card-body">
            <h2 className="dashboard-welcome">
              Welcome, {me?.name || user.email}
            </h2>
            <p className="dashboard-desc">
              Waynu Ka gudubnay Tijaabada koowaad hadda waxaad leedahay Account Rasmi ah .mustqbalka dhow Dashboard aad u casriyesan baanu ku sameen  insahaleh
            </p>

            <div className="dashboard-grid">
              <div className="dashboard-stat">
                <p className="dashboard-stat-label">Email</p>
                <p className="dashboard-stat-value">{me?.email}</p>
              </div>
              <div className="dashboard-stat">
                <p className="dashboard-stat-label">Account created</p>
                <p className="dashboard-stat-value">
                  {me?.createdAt
                    ? new Date(me.createdAt).toLocaleString()
                    : '-'}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
