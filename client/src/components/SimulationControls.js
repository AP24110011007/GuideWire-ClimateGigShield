import React, { useState } from 'react';

function SimulationControls({ onSimulateDisruption, onSimulateNoDisruption }) {
  const [disruptionHours, setDisruptionHours] = useState(2);
  const [usedHours, setUsedHours] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDisruption = async () => {
    setLoading(true);
    try {
      await onSimulateDisruption(disruptionHours);
    } finally {
      setLoading(false);
    }
  };

  const handleNoDisruption = async () => {
    setLoading(true);
    try {
      await onSimulateNoDisruption(usedHours);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="simulation-controls">
      <h2>🎮 Simulation Controls</h2>
      
      <div className="simulation-grid">
        {/* Disruption Simulation */}
        <div className="simulation-section">
          <h3>⚠️ Simulate Rain/Heat Disruption</h3>
          
          <div className="control-group">
            <label>Disruption Hours: {disruptionHours}</label>
            <input
              type="range"
              min="0"
              max="10"
              value={disruptionHours}
              onChange={(e) => setDisruptionHours(parseInt(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          <button
            className="simulation-btn disruption-btn"
            onClick={handleDisruption}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Trigger Disruption'}
          </button>
        </div>

        {/* No Disruption Simulation */}
        <div className="simulation-section">
          <h3>✅ Simulate No Disruption</h3>
          
          <div className="control-group">
            <label>Hours Used: {usedHours}</label>
            <input
              type="range"
              min="0"
              max="10"
              value={usedHours}
              onChange={(e) => setUsedHours(parseInt(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          <button
            className="simulation-btn safe-btn"
            onClick={handleNoDisruption}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'No Disruption (Earn Points)'}
          </button>
        </div>
      </div>

      <div className="simulation-info">
        <p><strong>Disruption Scenario:</strong> Income lost due to platform outage, bad weather, etc.</p>
        <p><strong>No Disruption Scenario:</strong> Work completed successfully; unused hours earn ShieldPoints</p>
      </div>
    </div>
  );
}

export default SimulationControls;
