import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Plans.css';

function Plans({ user, refreshUser }) {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(user?.selectedPlan || 'Standard');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/plans');
      setPlans(response.data.plans);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setLoading(false);
    }
  };

  const handleSelectPlan = async (planName) => {
    try {
      const response = await axios.post('/select-plan', { planName });
      if (response.data.success) {
        setSelectedPlan(planName);
        setMessage(`✅ ${response.data.message}`);
        refreshUser();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('❌ Error selecting plan');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) {
    return <div className="plans-loading">Loading plans...</div>;
  }

  return (
    <div className="plans">
      <div className="plans-header">
        <h1>📋 Insurance Plans</h1>
        <p className="subtitle">Choose your coverage level</p>
      </div>

      {message && <div className="message">{message}</div>}

      <div className="plans-grid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`plan-card ${selectedPlan === plan.name ? 'selected' : ''}`}
          >
            <div className="plan-header">
              <h2>{plan.name}</h2>
              {plan.name === 'Standard' && <span className="badge">Popular</span>}
            </div>

            <div className="plan-hours">
              <span className="hours-number">{plan.hours}</span>
              <span className="hours-label">Covered Hours / Week</span>
            </div>

            <p className="plan-description">{plan.description}</p>

            <button
              className={`select-button ${selectedPlan === plan.name ? 'selected' : ''}`}
              onClick={() => handleSelectPlan(plan.name)}
            >
              {selectedPlan === plan.name ? '✓ Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="plans-info">
        <h3>What do covered hours mean?</h3>
        <p>
          Covered hours represent the maximum number of hours per week for which you'll
          receive a payout if a disruption occurs. Plan your coverage based on your typical
          weekly income-generating activity.
        </p>
      </div>
    </div>
  );
}

export default Plans;
