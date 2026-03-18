# 🛡️ Weekly Income Shield - MERN Full-Stack Demo

A parametric insurance platform for gig workers protecting income from disruptions (rain, heat, platform outages).

## 📋 Features

✅ **Demo Authentication** - Quick login with demo credentials  
✅ **Dynamic Premium Calculation** - Live formula: (H × C × P × S) × (1 + L)  
✅ **Disruption Simulation** - Trigger simulated events to test payouts  
✅ **ShieldPoints System** - Earn points for no disruptions, convert to discounts  
✅ **Insurance Plans** - Choose from 3 coverage levels (Basic, Standard, Pro)  
✅ **Rewards System** - Convert ShieldPoints to up to 25% premium discounts  
✅ **Interactive Dashboard** - Real-time parameter adjustments  
✅ **Fully Responsive** - Works on desktop and mobile  

## 🏗️ Tech Stack

**Frontend:**
- React 18 with React Router v6
- Functional components & hooks
- Axios for HTTP requests
- CSS3 with responsive design

**Backend:**
- Node.js with Express 4
- CORS enabled

**Database:**
- In-memory storage (simulates MongoDB for demo)

## 📁 Project Structure

```
weekly-income-shield/
├── server/
│   ├── package.json
│   └── server.js (Express API)
└── client/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navigation.js
    │   │   ├── PremiumCalculator.js
    │   │   ├── SimulationControls.js
    │   │   ├── PayoutDisplay.js
    │   │   ├── ShieldPointsDisplay.js
    │   │   └── ParameterControls.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Dashboard.js
    │   │   ├── Plans.js
    │   │   └── Rewards.js
    │   ├── styles/
    │   └── App.js
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm installed
- Windows/Mac/Linux terminal

### 1️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

### 2️⃣ Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 3️⃣ Start Backend Server

From the `server` directory:
```bash
npm start
```

Output should show:
```
Server running on http://localhost:5000
```

### 4️⃣ Start React Frontend

**In a new terminal**, from the `client` directory:
```bash
npm start
```

React will automatically open at `http://localhost:3000`

### 5️⃣ Login

Use demo credentials:
- **Email:** demo@user.com
- **Password:** 123456

## 📊 Dashboard Usage

### 1. Understand Your Plan
- **Name:** Rahul
- **Zone:** Hyderabad
- **Hourly Income (H):** ₹150
- **Covered Hours (C):** 5 (or adjust with plan selection)
- **Risk Probability (P):** 0.2 (adjust slider: 10%-50%)
- **Severity Factor (S):** 0.9
- **Loading (L):** 0.3 (30%)

### 2. Premium Calculation
Formula dynamically calculated:
```
Premium = (H × C × P × S) × (1 + L)
Premium = (150 × 5 × 0.2 × 0.9) × 1.3 = ₹175.50
```

### 3. Simulate Disruption
- Move "Disruption Hours" slider (0-10)
- Click "Trigger Disruption"
- **Payout:** ₹150 × min(disruptionHours, coveredHours)
  - Example: 3 disruption hours → ₹450 payout

### 4. No Disruption Scenario
- Move "Hours Used" slider (0-10)
- Click "No Disruption"
- **ShieldPoints Formula:**
  ```
  Unused Hours (UH) = max(0, C - U)
  ShieldPoints = UH × 100 × 0.4 × (1 - P)
  ```
  - Example: Used 2 of 5 hours, P=0.2 → 96 ShieldPoints

## 🎯 Pages Overview

### 📊 Dashboard
- View your plan details
- See calculated weekly premium
- Adjust risk parameters in real-time
- Simulate disruptions
- View payouts and earned ShieldPoints

### 📋 Plans
- **Basic:** 3 covered hours/week
- **Standard:** 6 covered hours/week (popular)
- **Pro:** 10 covered hours/week
- Select any plan to update coverage

### 🎁 Rewards
- View total ShieldPoints balance
- Convert points to premium discount
- Max 25% discount available
- Conversion rate: 1 point = 0.01% discount

## 🧮 Key Formulas

### Weekly Premium
```
Premium = (Hourly Income × Covered Hours × Risk Probability × Severity Factor) × (1 + Loading Factor)
```

### Disruption Payout
```
Payout = Hourly Income × min(Disruption Hours, Covered Hours)
```

### ShieldPoints Earned
```
Unused Hours = max(0, Covered Hours - Used Hours)
ShieldPoints = Unused Hours × 100 × 0.4 × (1 - Risk Probability)
```

### Discount from Points
```
Discount% = min(25, floor(Points × 0.01))
```

## 🧠 Backend API Routes

All routes use demo user: `demo@user.com`

```
POST   /login                      - Demo login
GET    /user                       - Get user details
POST   /update-parameters          - Update risk params
POST   /simulate-disruption        - Simulate disruption event
POST   /simulate-no-disruption     - Simulate safe week (earn points)
POST   /select-plan                - Change insurance plan
GET    /plans                      - Get all available plans
GET    /shieldpoints               - Get ShieldPoints balance
POST   /apply-points               - Convert points to discount
GET    /health                     - Server health check
```

## 📝 Example API Calls

### Login
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@user.com","password":"123456"}'
```

### Simulate Disruption
```bash
curl -X POST http://localhost:5000/simulate-disruption \
  -H "Content-Type: application/json" \
  -d '{"disruptionHours":3}'
```

### Select Plan
```bash
curl -X POST http://localhost:5000/select-plan \
  -H "Content-Type: application/json" \
  -d '{"planName":"Pro"}'
```

### Apply ShieldPoints
```bash
curl -X POST http://localhost:5000/apply-points \
  -H "Content-Type: application/json" \
  -d '{"pointsToUse":500}'
```

## 🎨 UI Colors & Design

- **Primary:** Purple (#667eea) - Main actions & highlights
- **Success:** Green (#10b981) - Safe scenarios, reward cards
- **Danger:** Red (#ef4444) - Disruption scenarios
- **Info:** Blue (#3b82f6) - Information panels
- **Cards:** White backgrounds with subtle shadows
- **Responsive:** Mobile-first grid layout

## 🔧 Customization

### Change Demo User Data
Edit `server/server.js`, line 17-32:
```javascript
const demoUser = {
  name: 'Rahul',
  zone: 'Hyderabad',
  hourlyIncome: 150,
  // ... adjust parameters
};
```

### Modify Formulas
Update calculation logic in dashboard and backend API routes.

### Adjust Colors
Edit CSS files in `client/src/styles/`

### Add More Plans
Update `server.js` `/plans` route and `Plans.js` component

## 📱 Responsive Breakpoints

- **Desktop:** 1024px+ (3-column grid)
- **Tablet:** 768px-1023px (2-column grid)
- **Mobile:** <768px (single column)

## ⚙️ Configuration

### Backend Port
Change in `server/server.js` line 8:
```javascript
const PORT = process.env.PORT || 5000;
```

### Frontend Proxy
Change in `client/package.json`:
```json
"proxy": "http://localhost:5000"
```

## 📦 Dependencies

### Backend (server/package.json)
- express: 4.18.2
- cors: 2.8.5
- body-parser: 1.20.2

### Frontend (client/package.json)
- react: 18.2.0
- react-dom: 18.2.0
- react-router-dom: 6.8.0
- axios: 1.3.0
- react-scripts: 5.0.1

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# For Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

### CORS Errors
- Ensure backend server is running on http://localhost:5000
- Frontend should be on http://localhost:3000
- Check `client/package.json` proxy setting

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# For Windows:
rmdir /s /q node_modules
npm install
```

### Frontend Can't Connect to Backend
- Check backend port (should be 5000)
- Verify DNS resolution works

## 📚 How the Demo Works

1. **Pre-filled Data:** Demo user credentials and insurance data pre-loaded
2. **In-Memory Storage:** All data stored in Node.js memory during session
3. **Real-time Calculations:** Premium, payouts, and points calculated instantly
4. **No Database:** Demo doesn't persist data (resets on server restart)
5. **No Real Payments:** Purely simulated transactions

## 🚀 Deployment Ready

To deploy:

### Backend (Heroku, Railway, Render)
```bash
# Add Procfile
web: node server.js

# Deploy with git
git push heroku main
```

### Frontend (Vercel, Netlify)
```bash
# Build production bundle
npm run build

# Deploy build/ folder
```

## 📖 Additional Features to Implement

- User registration & real authentication
- MongoDB database integration
- Real payment gateway
- Email notifications
- Admin dashboard
- Claims history & analytics
- Multi-language support
- Dark mode

## 📄 License

MIT - Free to use and modify

## 👨‍💻 Created For

**Weekly Income Shield** - Making gig work safer and more predictable

---

**Questions?** Check the inline code comments for implementation details!

