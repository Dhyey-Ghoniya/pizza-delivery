import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getBases, getSauces, getCheeses, getVeggies, getMeats } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [items, setItems] = useState({ bases: [], sauces: [], cheeses: [], veggies: [], meats: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [b, s, c, v, m] = await Promise.all([getBases(), getSauces(), getCheeses(), getVeggies(), getMeats()]);
        setItems({ bases: b.data, sauces: s.data, cheeses: c.data, veggies: v.data, meats: m.data });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const renderSection = (title, icon, data) => (
    <div className="menu-section animate-fade">
      <h2>{icon} {title}</h2>
      <div className="menu-grid">
        {data.map((item) => (
          <div className="menu-card" key={item._id}>
            <div className="menu-card-icon">{item.image}</div>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) return <div className="page container" style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'48px'}}>🍕</div>;

  return (
    <div className="dashboard page container">
      <div className="dashboard-hero">
        <h1>Welcome, <span>{user?.name}</span>! 🍕</h1>
        <p>Explore our menu or build your own custom pizza</p>
        <div className="dashboard-cta">
          <Link to="/build-pizza" className="btn btn-primary btn-lg">🍕 Build Your Pizza</Link>
          <Link to="/my-orders" className="btn btn-secondary btn-lg">📦 My Orders</Link>
        </div>
      </div>

      {renderSection('Pizza Bases', '🫓', items.bases)}
      {renderSection('Sauces', '🍅', items.sauces)}
      {renderSection('Cheeses', '🧀', items.cheeses)}
      {renderSection('Veggies', '🥬', items.veggies)}
      {renderSection('Meats', '🍗', items.meats)}
    </div>
  );
};

export default Dashboard;
