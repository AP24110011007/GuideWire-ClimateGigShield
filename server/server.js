const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage (simulating MongoDB)
const users = {};
const shieldPointsRecord = {};
const disruptions = {};

// Demo user data
const demoUser = {
  id: 'user123',
  email: 'demo@user.com',
  password: '123456',
  name: 'Rahul',
  zone: 'Hyderabad',
  hourlyIncome: 150,
  coveredHours: 5,
  riskProbability: 0.2,
  severityFactor: 0.9,
  loading: 0.3,
  selectedPlan: 'Standard',
  shieldPoints: 0,
  pointsUsedDiscount: 0
};

// Initialize demo user
users['demo@user.com'] = { ...demoUser };
shieldPointsRecord['demo@user.com'] = 0;

// ===== ROUTES =====

// POST /login - Demo login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'demo@user.com' && password === '123456') {
    return res.json({
      success: true,
      user: {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        zone: demoUser.zone
      },
      message: 'Login successful'
    });
  }

  res.status(401).json({
    success: false,
    message: 'Invalid credentials'
  });
});

// GET /user - Get logged in user info
app.get('/user', (req, res) => {
  const user = users['demo@user.com'];
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  return res.json({
    success: true,
    user: {
      name: user.name,
      zone: user.zone,
      hourlyIncome: user.hourlyIncome,
      coveredHours: user.coveredHours,
      riskProbability: user.riskProbability,
      severityFactor: user.severityFactor,
      loading: user.loading,
      selectedPlan: user.selectedPlan,
      shieldPoints: shieldPointsRecord['demo@user.com'] || 0,
      pointsUsedDiscount: user.pointsUsedDiscount || 0
    }
  });
});

// POST /update-parameters - Update risk parameters
app.post('/update-parameters', (req, res) => {
  const { riskProbability, coveredHours } = req.body;
  const user = users['demo@user.com'];

  if (riskProbability !== undefined) {
    user.riskProbability = Math.min(0.5, Math.max(0.1, riskProbability));
  }
  if (coveredHours !== undefined) {
    user.coveredHours = Math.min(10, Math.max(3, coveredHours));
  }

  return res.json({
    success: true,
    user: {
      riskProbability: user.riskProbability,
      coveredHours: user.coveredHours
    }
  });
});

// POST /simulate-disruption - Simulate disruption event
app.post('/simulate-disruption', (req, res) => {
  const { disruptionHours } = req.body;
  const user = users['demo@user.com'];

  if (!disruptionHours || disruptionHours <= 0) {
    return res.status(400).json({ success: false, message: 'Invalid disruption hours' });
  }

  // Calculate payout: H × min(Disruption Hours, Covered Hours)
  const payout = user.hourlyIncome * Math.min(disruptionHours, user.coveredHours);

  // No ShieldPoints earned in case of disruption
  disruptions['demo@user.com'] = {
    timestamp: new Date(),
    disruptionHours,
    actualCoveredHours: Math.min(disruptionHours, user.coveredHours),
    payout
  };

  return res.json({
    success: true,
    disruption: true,
    payout,
    message: `₹${payout} credited instantly due to disruption`
  });
});

// POST /simulate-no-disruption - Simulate no disruption (earn ShieldPoints)
app.post('/simulate-no-disruption', (req, res) => {
  const user = users['demo@user.com'];
  const { usedHours = 0 } = req.body;

  // Calculate unused hours: UH = max(0, C − U)
  const unusedHours = Math.max(0, user.coveredHours - usedHours);

  // ShieldPoints = UH × 100 × 0.4 × (1 − P)
  const shieldPointsEarned = Math.round(
    unusedHours * 100 * 0.4 * (1 - user.riskProbability)
  );

  // Add to total ShieldPoints
  shieldPointsRecord['demo@user.com'] =
    (shieldPointsRecord['demo@user.com'] || 0) + shieldPointsEarned;

  return res.json({
    success: true,
    disruption: false,
    shieldPointsEarned,
    totalShieldPoints: shieldPointsRecord['demo@user.com'],
    message: `You earned ${shieldPointsEarned} ShieldPoints!`
  });
});

// POST /select-plan - Select insurance plan
app.post('/select-plan', (req, res) => {
  const { planName } = req.body;
  const user = users['demo@user.com'];

  const plansMap = {
    'Basic': 3,
    'Standard': 6,
    'Pro': 10
  };

  if (!plansMap[planName]) {
    return res.status(400).json({ success: false, message: 'Invalid plan' });
  }

  user.selectedPlan = planName;
  user.coveredHours = plansMap[planName];

  return res.json({
    success: true,
    plan: planName,
    coveredHours: plansMap[planName],
    message: `You selected ${planName} plan with ${plansMap[planName]} covered hours`
  });
});

// GET /shieldpoints - Get ShieldPoints balance
app.get('/shieldpoints', (req, res) => {
  const totalShieldPoints = shieldPointsRecord['demo@user.com'] || 0;

  return res.json({
    success: true,
    shieldPoints: totalShieldPoints,
    maxDiscount: Math.floor(totalShieldPoints * 0.01) // Convert to max discount percentage
  });
});

// POST /apply-points - Apply ShieldPoints for discount
app.post('/apply-points', (req, res) => {
  const { pointsToUse } = req.body;
  const user = users['demo@user.com'];
  const totalShieldPoints = shieldPointsRecord['demo@user.com'] || 0;

  if (pointsToUse > totalShieldPoints) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient ShieldPoints'
    });
  }

  // Max 25% discount on premium
  const percentageDiscount = Math.min(25, Math.floor(pointsToUse * 0.01));

  shieldPointsRecord['demo@user.com'] -= pointsToUse;
  user.pointsUsedDiscount = percentageDiscount;

  return res.json({
    success: true,
    discountPercentage: percentageDiscount,
    remainingShieldPoints: shieldPointsRecord['demo@user.com'],
    message: `Applied ${percentageDiscount}% discount using ${pointsToUse} ShieldPoints`
  });
});

// GET /plans - Get all available plans
app.get('/plans', (req, res) => {
  const plans = [
    {
      name: 'Basic',
      hours: 3,
      description: '3 covered hours per week'
    },
    {
      name: 'Standard',
      hours: 6,
      description: '6 covered hours per week (Most Popular)'
    },
    {
      name: 'Pro',
      hours: 10,
      description: '10 covered hours per week (Maximum coverage)'
    }
  ];

  return res.json({ success: true, plans });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
