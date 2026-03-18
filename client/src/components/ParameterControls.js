import React from 'react';

function ParameterControls({ riskProbability, coveredHours, onParameterChange }) {
  const handleRiskChange = (e) => {
    const newRisk = parseFloat(e.target.value);
    onParameterChange({ riskProbability: newRisk });
  };

  const handleCoveredHoursChange = (e) => {
    const newHours = parseInt(e.target.value);
    onParameterChange({ coveredHours: newHours });
  };

  return (
    <div className="parameter-controls">
      <h2>⚙️ Risk Parameters</h2>
      
      <div className="parameter-grid">
        {/* Risk Probability */}
        <div className="parameter-control">
          <div className="control-header">
            <label>Risk Probability (P)</label>
            <span className="control-value">{(riskProbability * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="0.5"
            step="0.05"
            value={riskProbability}
            onChange={handleRiskChange}
            className="parameter-slider"
          />
          <div className="slider-labels">
            <span>10% (Low)</span>
            <span>50% (High)</span>
          </div>
          <p className="control-description">
            Likelihood of disruption event occurring
          </p>
        </div>

        {/* Covered Hours */}
        <div className="parameter-control">
          <div className="control-header">
            <label>Maximum Covered Hours (C)</label>
            <span className="control-value">{coveredHours} hrs</span>
          </div>
          <input
            type="range"
            min="3"
            max="10"
            step="1"
            value={coveredHours}
            onChange={handleCoveredHoursChange}
            className="parameter-slider"
          />
          <div className="slider-labels">
            <span>3 hrs (Basic)</span>
            <span>10 hrs (Pro)</span>
          </div>
          <p className="control-description">
            Maximum hours covered per disruption event
          </p>
        </div>
      </div>

      <div className="parameter-note">
        💡 Adjusting these parameters recalculates your premium instantly.
      </div>
    </div>
  );
}

export default ParameterControls;
