import React from 'react';

function PremiumCalculator({ premium, riskLevel, coveredHours, riskProbability }) {
  const getRiskColor = (level) => {
    switch (level) {
      case 'Low':
        return '#10b981';
      case 'Medium':
        return '#f59e0b';
      case 'High':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="premium-calculator">
      <h2>💳 Premium Calculation</h2>
      
      <div className="premium-formula">
        <p className="formula-title">Formula: Premium = (H × C × P × S) × (1 + L)</p>
        <div className="formula-breakdown">
          <div className="parameter">
            <span className="param-label">H (Hourly Income):</span>
            <span className="param-value">₹150</span>
          </div>
          <div className="parameter">
            <span className="param-label">C (Covered Hours):</span>
            <span className="param-value">{coveredHours} hours</span>
          </div>
          <div className="parameter">
            <span className="param-label">P (Risk Probability):</span>
            <span className="param-value">{(riskProbability * 100).toFixed(0)}%</span>
          </div>
          <div className="parameter">
            <span className="param-label">S (Severity):</span>
            <span className="param-value">0.9</span>
          </div>
          <div className="parameter">
            <span className="param-label">L (Loading):</span>
            <span className="param-value">0.3 (30%)</span>
          </div>
        </div>
      </div>

      <div className="premium-display">
        <div className="premium-amount">
          <span className="amount-label">Weekly Premium</span>
          <span className="amount-value">₹{premium}</span>
        </div>

        <div className="risk-level" style={{ borderColor: getRiskColor(riskLevel) }}>
          <span className="risk-label">Risk Level</span>
          <span 
            className="risk-value"
            style={{ color: getRiskColor(riskLevel) }}
          >
            {riskLevel}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PremiumCalculator;
