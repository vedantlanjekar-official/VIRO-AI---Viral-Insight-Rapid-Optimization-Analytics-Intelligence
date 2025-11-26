# 🚀 Viro-AI Frontend Setup Guide

## Overview
This is the complete frontend application for Viro-AI, featuring:
- 🎨 Beautiful landing page with project information
- 🔐 Authentication system (login/signup)
- 📊 Interactive dashboard with file upload
- 📈 Comprehensive results display (7 sections)
- 📜 Prediction history management
- 📱 Fully responsive design

## Tech Stack
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State**: React Context API
- **HTTP**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Charts**: Chart.js + React-Chartjs-2

## Prerequisites
- Node.js 16+ and npm
- Backend API running on `http://localhost:8000`

## Installation

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Setup
Create a `.env` file in the frontend directory:
```bash
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=Viro-AI
VITE_APP_VERSION=1.0.0
VITE_ENABLE_DEMO_MODE=true
```

### 3. Start Development Server
```bash
npm run dev
```

The app will run at `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── pages/                    # Page components
│   │   ├── LandingPage.jsx      # Public landing page
│   │   ├── LoginPage.jsx        # Login page
│   │   ├── SignupPage.jsx       # Signup page
│   │   ├── DashboardPage.jsx    # Main dashboard
│   │   ├── ResultsPage.jsx      # Results display (7 sections)
│   │   └── HistoryPage.jsx      # Prediction history
│   │
│   ├── components/               # Reusable components
│   │   ├── Header.jsx           # Navigation header
│   │   └── ProtectedRoute.jsx   # Route protection
│   │
│   ├── context/                  # React Context
│   │   └── AuthContext.jsx      # Authentication state
│   │
│   ├── services/                 # API services
│   │   ├── api.js               # Axios instance
│   │   ├── authApi.js           # Auth endpoints
│   │   └── predictionApi.js     # Prediction endpoints
│   │
│   ├── utils/                    # Utilities
│   │   ├── exportUtils.js       # Export to PDF/CSV/JSON
│   │   └── fileValidation.js    # File upload validation
│   │
│   ├── App.jsx                   # Root component with routing
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles + Tailwind
│
├── public/                       # Static assets
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Features

### 🏠 Landing Page
- Hero section with CTA buttons
- Features grid (6 feature cards)
- How It Works (4-step process)
- Project cards for 3 viruses
- Statistics section
- Responsive design

### 🔐 Authentication
- Demo mode (any email/password works)
- JWT token management
- Protected routes
- Persistent sessions
- Logout functionality

### 📊 Dashboard
- File upload zone (drag & drop)
- Virus & protein selection
- Quick analysis buttons
- Recent predictions
- Usage statistics
- Deadliness score preview

### 📈 Results Page (7 Sections)
1. **Mutation Prediction** - Predicted mutations with confidence
2. **Deadliness Score** - Risk assessment with breakdown
3. **Clinical Symptoms** - Symptom predictions with probabilities
4. **Top Drug Candidates** - Ranked drug list
5. **3D Visualization** - Molecular binding view (placeholder)
6. **AI Modifications** - Chemical structure improvements
7. **Recommendations** - Actionable steps

### 📜 History Page
- View all past predictions
- Search & filter functionality
- Sort by date or deadliness
- Download results (JSON)
- Delete predictions
- Usage statistics

## Theme Customization

The app uses a **white/blue/grey** color scheme as requested:

### Colors
- **Background**: White (#ffffff)
- **Primary Blue**: #3b82f6 (Tailwind blue-500)
- **Borders**: Blue (#3b82f6 with opacity)
- **Cards**: White with grey backgrounds (#f9fafb)
- **Buttons**: Blue borders and fills

### Custom Classes (in index.css)
```css
.card              /* White card with blue border */
.card-grey         /* Grey card with blue border */
.btn-primary       /* Blue button */
.btn-secondary     /* White button with blue border */
.btn-outline       /* Transparent with blue border */
.input             /* Input with blue border */
.badge-blue        /* Blue badge */
```

## API Integration

### Endpoints Used
```javascript
// Auth (Demo mode - not yet connected to backend)
POST /auth/login
POST /auth/signup

// Predictions (Connected to backend)
POST /predict
GET  /top_drugs/:virus_id
GET  /viruses
GET  /health

// History (Local storage for now)
localStorage: 'prediction_history'
localStorage: 'access_token'
localStorage: 'user_data'
```

## Running in Production

### Build for Production
```bash
npm run build
```

This creates optimized files in `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Deploy
You can deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag `dist/` folder
- **GitHub Pages**: Configure in repo settings

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Demo Mode

The app currently runs in **demo mode** for authentication:
- Any email/password combination works for login
- Users are stored in localStorage
- Replace with real API calls in production

### To Connect Real Auth:
1. Update `frontend/src/pages/LoginPage.jsx`
2. Replace mock auth with: `const response = await authAPI.login(email, password)`
3. Update `frontend/src/pages/SignupPage.jsx` similarly
4. Update `backend/api/main.py` to add auth endpoints

## Troubleshooting

### API Connection Issues
- Ensure backend is running on `http://localhost:8000`
- Check CORS settings in backend
- Verify API endpoints match

### Styling Issues
- Run `npm run dev` to rebuild Tailwind
- Clear browser cache
- Check tailwind.config.js

### Routing Issues
- Ensure react-router-dom is installed
- Check Browser Router configuration
- Verify route paths

## Color Scheme Reference

### Primary Colors
- `bg-white` - White background
- `border-blue-200` - Light blue borders
- `border-blue-300` - Medium blue borders
- `bg-blue-600` - Primary blue
- `bg-gray-50` - Light grey cards

### Text Colors
- `text-gray-900` - Primary text
- `text-gray-600` - Secondary text
- `text-blue-600` - Blue accent text

### Interactive Elements
- Hover effects use `hover:bg-blue-50`
- Active states use blue borders
- Disabled states use opacity-50

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## Support
For issues or questions, contact the development team.

---

**Built with ❤️ for viral research**


