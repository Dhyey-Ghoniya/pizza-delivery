import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBases, getSauces, getCheeses, getVeggies, getMeats } from '../../services/api';
import { toast } from 'react-toastify';
import './BuildPizza.css';

const steps = [
  { key: 'base', label: 'Base', icon: '🫓' },
  { key: 'sauce', label: 'Sauce', icon: '🍅' },
  { key: 'cheese', label: 'Cheese', icon: '🧀' },
  { key: 'veggies', label: 'Toppings', icon: '🥬' },
  { key: 'review', label: 'Review', icon: '✅' },
];

const BuildPizza = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [options, setOptions] = useState({ bases: [], sauces: [], cheeses: [], veggies: [], meats: [] });
  const [selection, setSelection] = useState({ base: null, sauce: null, cheese: null, veggies: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [b, s, c, v, m] = await Promise.all([getBases(), getSauces(), getCheeses(), getVeggies(), getMeats()]);
        setOptions({ bases: b.data, sauces: s.data, cheeses: c.data, veggies: [...v.data, ...m.data], meats: m.data });
      } catch (err) {
        toast.error('Failed to load options');
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  const handleSelect = (key, item) => {
    if (key === 'veggies') {
      setSelection((prev) => {
        const exists = prev.veggies.find((v) => v._id === item._id);
        return {
          ...prev,
          veggies: exists ? prev.veggies.filter((v) => v._id !== item._id) : [...prev.veggies, item],
        };
      });
    } else {
      setSelection((prev) => ({ ...prev, [key]: item }));
    }
  };

  const canProceed = () => {
    if (currentStep === 0) return selection.base;
    if (currentStep === 1) return selection.sauce;
    if (currentStep === 2) return selection.cheese;
    return true;
  };

  const totalPrice = () => {
    let total = 0;
    if (selection.base) total += selection.base.price;
    if (selection.sauce) total += selection.sauce.price;
    if (selection.cheese) total += selection.cheese.price;
    selection.veggies.forEach((v) => (total += v.price));
    return total;
  };

  const handleCheckout = () => {
    const pizzaData = {
      base: selection.base.name,
      sauce: selection.sauce.name,
      cheese: selection.cheese.name,
      veggies: selection.veggies.map((v) => v.name),
    };
    navigate('/checkout', { state: { pizza: pizzaData, totalPrice: totalPrice() } });
  };

  const renderOptions = (key, items) => (
    <div className="options-grid">
      {items.map((item) => {
        const isSelected = key === 'veggies'
          ? selection.veggies.some((v) => v._id === item._id)
          : selection[key]?._id === item._id;
        return (
          <div
            key={item._id}
            className={`option-card ${isSelected ? (key === 'veggies' ? 'selected-multi' : 'selected') : ''}`}
            onClick={() => handleSelect(key, item)}
          >
            <div className="option-icon">{item.image}</div>
            <div className="option-name">{item.name}</div>
            <div className="option-price">₹{item.price}</div>
          </div>
        );
      })}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (<div className="step-content"><h2 className="step-title">Choose Your Pizza Base</h2>{renderOptions('base', options.bases)}</div>);
      case 1:
        return (<div className="step-content"><h2 className="step-title">Pick Your Sauce</h2>{renderOptions('sauce', options.sauces)}</div>);
      case 2:
        return (<div className="step-content"><h2 className="step-title">Select Your Cheese</h2>{renderOptions('cheese', options.cheeses)}</div>);
      case 3:
        return (<div className="step-content"><h2 className="step-title">Add Toppings (Veggies & Meat)</h2>{renderOptions('veggies', options.veggies)}</div>);
      case 4:
        return (
          <div className="step-content">
            <h2 className="step-title">Review Your Pizza</h2>
            <div className="review-card">
              <div className="review-item"><span className="review-label">Base</span><span className="review-value">{selection.base?.image} {selection.base?.name} <small>₹{selection.base?.price}</small></span></div>
              <div className="review-item"><span className="review-label">Sauce</span><span className="review-value">{selection.sauce?.image} {selection.sauce?.name} <small>₹{selection.sauce?.price}</small></span></div>
              <div className="review-item"><span className="review-label">Cheese</span><span className="review-value">{selection.cheese?.image} {selection.cheese?.name} <small>₹{selection.cheese?.price}</small></span></div>
              <div className="review-item">
                <span className="review-label">Toppings</span>
                <div className="veggies-list">
                  {selection.veggies.length === 0 ? <span style={{color:'var(--text-muted)'}}>None</span> : selection.veggies.map((v) => <span key={v._id} className="veggie-pill">{v.image} {v.name}</span>)}
                </div>
              </div>
              <div className="review-total"><span>Total</span><span>₹{totalPrice()}</span></div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  if (loading) return <div className="page container" style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'48px'}}>🍕</div>;

  return (
    <div className="build-pizza page container">
      <div className="build-header">
        <h1>Build Your <span>Custom Pizza</span></h1>
      </div>

      <div className="progress-bar">
        {steps.map((step, i) => (
          <div key={step.key} className={`progress-step ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}>
            <span className="progress-step-num">{i < currentStep ? '✓' : i + 1}</span>
            <span>{step.icon} {step.label}</span>
          </div>
        ))}
      </div>

      {renderStep()}

      <div className="step-nav">
        {currentStep > 0 && (
          <button className="btn btn-secondary" onClick={() => setCurrentStep((p) => p - 1)}>← Back</button>
        )}
        {currentStep < 4 ? (
          <button className="btn btn-primary" disabled={!canProceed()} onClick={() => setCurrentStep((p) => p + 1)}>
            Next →
          </button>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={handleCheckout}>
            🛒 Proceed to Checkout — ₹{totalPrice()}
          </button>
        )}
      </div>
    </div>
  );
};

export default BuildPizza;
