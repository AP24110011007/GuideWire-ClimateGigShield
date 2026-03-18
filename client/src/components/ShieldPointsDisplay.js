import React from 'react';
import '../styles/ShieldPointsDisplay.css';

function ShieldPointsDisplay({ result }) {
  return (
    <div className="shieldpoints-display">
      <h2>🪙 ShieldPoints Earned!</h2>
      
      <div className="points-content">
        <div className="points-icon">✨</div>
        <div className="points-text">
          <p className="points-message">{result.message}</p>
          <div className="points-amounts">
            <div className="amount-row">
              <span className="label">This Week:</span>
              <span className="value">+{result.shieldPointsEarned}</span>
            </div>
            <div className="amount-row total">
              <span className="label">Total Balance:</span>
              <span className="value">{result.totalShieldPoints}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="points-note">
        ShieldPoints can be converted to discounts on your premium. Visit the Rewards page to apply them!
      </p>
    </div>
  );
}

export default ShieldPointsDisplay;
