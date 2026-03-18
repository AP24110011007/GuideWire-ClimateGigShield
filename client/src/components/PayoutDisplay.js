import React from 'react';
import '../styles/PayoutDisplay.css';

function PayoutDisplay({ result }) {
  return (
    <div className="payout-display">
      <h2>💸 Disruption Payout</h2>
      
      <div className="payout-content">
        <div className="payout-icon">🔴</div>
        <div className="payout-text">
          <p className="payout-message">{result.message}</p>
          <div className="payout-amount">
            <span className="label">Payout Amount:</span>
            <span className="value">₹{result.payout}</span>
          </div>
        </div>
      </div>

      <p className="payout-note">
        Your claim has been processed instantly. The amount covers your lost income for the disrupted hours.
      </p>
    </div>
  );
}

export default PayoutDisplay;
