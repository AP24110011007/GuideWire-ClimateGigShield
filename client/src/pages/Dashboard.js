import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PremiumCalculator from '../components/PremiumCalculator';
import SimulationControls from '../components/SimulationControls';
import PayoutDisplay from '../components/PayoutDisplay';
import ShieldPointsDisplay from '../components/ShieldPointsDisplay';
import ParameterControls from '../components/ParameterControls';
import '../styles/Dashboard.css';

function Dashboard({ user, refreshUser }) {
  const [premium, setPremium] = useState(0);
  const [riskLevel, setRiskLevel] = useState('Low');
  const [payoutResult, setPayoutResult] = useState(null);
  const [shieldPointsResult, setShieldPointsResult] = useState(null);
  const [userParams, setUserParams] = useState({
    riskProbability: user?.riskProbability || 0.2,
    coveredHours: user?.coveredHours || 5
  });

  useEffect(() => {
    if (user) {
      calculatePremium();
    }
  }, [user, userParams]);

  const calculatePremium = () => {
    if (!user) return;

    const { hourlyIncome, severityFactor, loading } = user;
    const { riskProbability, coveredHours } = userParams;

    // Premium = (H × C × P × S) × (1 + L)
    const basePremium = hourlyIncome * coveredHours * riskProbability * severityFactor;
    const finalPremium = basePremium * (1 + loading);

    setPremium(Math.round(finalPremium));

    // Determine risk level
    if (riskProbability < 0.2) {
      setRiskLevel('Low');
    } else if (riskProbability < 0.35) {
      setRiskLevel('Medium');
    } else {
      setRiskLevel('High');
    }
  };

  const handleParameterChange = async (newParams) => {
    setUserParams(newParams);
    try {
      await axios.post('/update-parameters', newParams);
      refreshUser();
    } catch (error) {
      console.error('Error updating parameters:', error);
    }
  };

  const handleSimulateDisruption = async (disruptionHours) => {
    try {
      const response = await axios.post('/simulate-disruption', { disruptionHours });
      setPayoutResult({
        payout: response.data.payout,
        message: response.data.message,
        disruption: true
      });
      setShieldPointsResult(null);
      refreshUser();
    } catch (error) {
      console.error('Error simulating disruption:', error);
    }
  };

  const handleSimulateNoDisruption = async (usedHours) => {
    try {
      const response = await axios.post('/simulate-no-disruption', { usedHours });
      setShieldPointsResult({
        shieldPointsEarned: response.data.shieldPointsEarned,
        totalShieldPoints: response.data.totalShieldPoints,
        message: response.data.message
      });
      setPayoutResult(null);
      refreshUser();
    } catch (error) {
      console.error('Error simulating no disruption:', error);
    }
  };

  if (!user) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p className="subtitle">Weekly Income Shield Portal</p>
      </div>

      <div className="dashboard-grid">
        {/* User Info Card */}
        <div className="card user-info-card">
          <h2>👤 Your Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{user.name}</span>
            </div>
            <div className="info-item">
              <span className="label">Zone:</span>
              <span className="value">{user.zone}</span>
            </div>
            <div className="info-item">
              <span className="label">Hourly Income:</span>
              <span className="value">₹{user.hourlyIncome}</span>
            </div>
            <div className="info-item">
              <span className="label">Current Plan:</span>
              <span className="value">{user.selectedPlan}</span>
            </div>
          </div>
        </div>

        {/* Premium Calculator Card */}
        <div className="card premium-card">
          <PremiumCalculator 
            premium={premium}
            riskLevel={riskLevel}
            coveredHours={userParams.coveredHours}
            riskProbability={userParams.riskProbability}
          />
        </div>

        {/* Parameter Controls */}
        <div className="card parameters-card wide">
          <ParameterControls 
            riskProbability={userParams.riskProbability}
            coveredHours={userParams.coveredHours}
            onParameterChange={handleParameterChange}
          />
        </div>

        {/* Simulation Controls */}
        <div className="card simulation-card wide">
          <SimulationControls 
            onSimulateDisruption={handleSimulateDisruption}
            onSimulateNoDisruption={handleSimulateNoDisruption}
          />
        </div>

        {/* Results */}
        {payoutResult && (
          <div className="card result-card disruption">
            <PayoutDisplay result={payoutResult} />
          </div>
        )}

        {shieldPointsResult && (
          <div className="card result-card rewards">
            <ShieldPointsDisplay result={shieldPointsResult} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
