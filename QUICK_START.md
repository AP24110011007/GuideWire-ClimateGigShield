# 🚀 Quick Start Guide - 5 Minutes

## Step 1: Install Backend (Terminal 1)
```bash
cd server
npm install
npm start
```
✅ Wait for: `Server running on http://localhost:5000`

## Step 2: Install Frontend (Terminal 2)
```bash
cd client
npm install
npm start
```
✅ Browser auto-opens at `http://localhost:3000`

## Step 3: Login
- **Email:** demo@user.com
- **Password:** 123456

## Step 4: Explore

### Dashboard - See Premium Calculation
- Move sliders to adjust Risk Probability (10%-50%)
- Watch premium recalculate in real-time
- Formula: (150 × 5 × P × 0.9) × 1.3

### Simulate Events
- **Disruption:** Get ₹450 payout for 3 disruption hours
- **No Disruption:** Earn ~96 ShieldPoints with unused hours

### Change Plans
Go to **Plans** → Select "Pro" (10 hours coverage)

### Convert Points
Go to **Rewards** → Use 500 points → Get 5% discount

---

## 🎯 What to Try

1. **Max out Risk:** Set probability to 50% → See premium increase
2. **Trigger Disruption:** Set 5 disruption hours → See ₹750 payout
3. **Earn Points:** Set used hours to 2 → Get 96 ShieldPoints
4. **Stack Points:** Simulate no disruption twice → 192 total points
5. **Apply Discount:** Use 2500 points → Get 25% max discount

---

## 📊 Key Formula to Understand

```
Weekly Premium = (H × C × P × S) × (1 + L)

H = ₹150/hour (Hourly Income)
C = Covered Hours (3, 6, or 10)
P = Risk Probability (10%-50%)
S = 0.9 (Severity Factor)
L = 0.3 (30% Loading)

Example: (150 × 6 × 0.2 × 0.9) × 1.3 = ₹210.60/week
```

---

## 🆘 Troubleshooting

**Can't connect to backend?**
- Backend must be on port 5000, frontend on 3000
- Both terminals should show "running"

**Port already in use?**
```bash
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

**Npm install errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 File Structure

```
server/               ← Express backend (port 5000)
├── server.js        (all API routes)
└── package.json

client/               ← React frontend (port 3000)
├── src/
│   ├── pages/       (Login, Dashboard, Plans, Rewards)
│   ├── components/  (UI building blocks)
│   └── styles/      (CSS)
└── package.json
```

---

**Ready?** The app is fully functional - no database setup needed! 🎉
