import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Rewards.css';

function Rewards({ user, refreshUser }) {
  const [shieldPoints, setShieldPoints] = useState(0);
  const [maxDiscount, setMaxDiscount] = useState(0);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [message, setMessage] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(user?.pointsUsedDiscount || 0);

  useEffect(() => {
    fetchShieldPoints();
  }, []);

  const fetchShieldPoints = async () => {
    try {
      const response = await axios.get('/shieldpoints');
      setShieldPoints(response.data.shieldPoints);
      setMaxDiscount(response.data.maxDiscount);
    } catch (error) {
      console.error('Error fetching ShieldPoints:', error);
    }
  };

  const handleApplyPoints = async () => {
    if (pointsToUse <= 0) {
      setMessage('❌ Please enter a valid points amount');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (pointsToUse > shieldPoints) {
      setMessage('❌ Insufficient ShieldPoints');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      const response = await axios.post('/apply-points', { pointsToUse });
      if (response.data.success) {
        setAppliedDiscount(response.data.discountPercentage);
        setShieldPoints(response.data.remainingShieldPoints);
        setMessage(`✅ ${response.data.message}`);
        setPointsToUse(0);
        refreshUser();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('❌ Error applying points');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handlePointsChange = (e) => {
    const value = Math.max(0, Math.min(shieldPoints, parseInt(e.target.value) || 0));
    setPointsToUse(value);
  };

  const estimatedDiscount = Math.min(25, Math.floor(pointsToUse * 0.01));

  return (
    <div className="rewards">
      <div className="rewards-header">
        <h1>🎁 Rewards & Points</h1>
        <p className="subtitle">Convert your ShieldPoints to discounts</p>
      </div>

      {message && <div className="message">{message}</div>}

      <div className="rewards-grid">
        {/* ShieldPoints Balance */}
        <div className="card balance-card">
          <h2>💰 Your ShieldPoints Balance</h2>
          <div className="balance-display">
            <span className="balance-number">{shieldPoints}</span>
            <span className="balance-label">ShieldPoints</span>
          </div>
          <p className="info-text">
            Earned by having no disruptions or unused coverage hours
          </p>
        </div>

        {/* Current Discount */}
        <div className="card discount-card">
          <h2>✨ Current Discount Applied</h2>
          <div className="discount-display">
            <span className="discount-number">{appliedDiscount}%</span>
            <span className="discount-label">Off Your Premium</span>
          </div>
          <p className="info-text">
            Maximum available: 25% discount
          </p>
        </div>

        {/* Apply Points */}
        <div className="card apply-points-card wide">
          <h2>🎯 Convert Points to Discount</h2>
          
          <div className="apply-form">
            <div className="form-group">
              <label>Points to Use:</label>
              <input
                type="number"
                min="0"
                max={shieldPoints}
                value={pointsToUse}
                onChange={handlePointsChange}
                placeholder="Enter points amount"
              />
            </div>

            <div className="conversion-info">
              <p className="conversion-rate">
                💡 Conversion Rate: 1 ShieldPoint = 0.01% Discount
              </p>
              <p className="estimated-discount">
                Estimated Discount: <strong>{estimatedDiscount}%</strong>
              </p>
              <p className="max-info">
                (Maximum claimable: 25% discount)
              </p>
            </div>

            <button
              className="apply-button"
              onClick={handleApplyPoints}
              disabled={pointsToUse <= 0 || pointsToUse > shieldPoints}
            >
              Apply {pointsToUse} Points
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className="card info-card wide">
          <h2>ℹ️ How ShieldPoints Work</h2>
          <div className="info-list">
            <div className="info-item">
              <span className="item-number">1</span>
              <div>
                <strong>Earn Points</strong>
                <p>Get 100 ShieldPoints per unused covered hour when there's no disruption</p>
              </div>
            </div>
            <div className="info-item">
              <span className="item-number">2</span>
              <div>
                <strong>Accumulate Balance</strong>
                <p>Your points accumulate over time and never expire</p>
              </div>
            </div>
            <div className="info-item">
              <span className="item-number">3</span>
              <div>
                <strong>Use for Discounts</strong>
                <p>Convert points to premium discounts (max 25%)</p>
              </div>
            </div>
            <div className="info-item">
              <span className="item-number">4</span>
              <div>
                <strong>Save Money</strong>
                <p>Enjoy lower premiums on your next plan renewal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rewards;
