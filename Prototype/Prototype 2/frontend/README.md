# Viro-AI Frontend

Modern, responsive web interface for the Viro-AI Drug-Virus Binding Prediction System.

## 🎯 Features

- ✅ **Interactive Dashboard** - Quick virus screening and statistics
- ✅ **Prediction Interface** - Comprehensive drug-virus binding prediction
- ✅ **Results Visualization** - Charts, tables, and detailed drug information
- ✅ **Virus Information** - Complete database of supported viruses
- ✅ **Data Export** - Download results as JSON or CSV
- ✅ **Real-time Status** - API health monitoring
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm (or yarn)
- Backend API running on `http://localhost:8000`

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── PredictionForm.jsx   # Prediction input form
│   │   ├── ResultsDisplay.jsx   # Results view
│   │   ├── VirusInfo.jsx    # Virus information
│   │   ├── DeadlinessChart.jsx  # Radar chart
│   │   └── DrugRankingsChart.jsx # Bar chart
│   ├── services/
│   │   └── api.js           # API communication
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── tailwind.config.js       # Tailwind CSS config
```

## 🎨 Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Hot Toast** - Notifications

## 🔧 Configuration

### API Endpoint

The frontend connects to the backend at `http://localhost:8000` by default.

To change this, edit `src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: 'http://your-api-url:port',
  // ...
});
```

### Proxy Configuration

Vite proxy is configured in `vite.config.js` to handle CORS during development:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true
    }
  }
}
```

## 📖 Usage Guide

### 1. Dashboard

- View all supported viruses with deadliness scores
- Quick screening with one-click buttons
- See platform features and statistics

### 2. Prediction

- Select target virus (SARS-CoV-2, Influenza, Ebola)
- Choose protein target (PDB ID)
- Set number of top candidates (1-100)
- Run prediction and view results

### 3. Results

- View ranked drug candidates
- Interactive charts and visualizations
- Detailed drug information modal
- Export results as JSON or CSV

### 4. Virus Info

- Complete virus database information
- Protein targets for each virus
- Deadliness score explanations
- Database statistics

## 🎯 Key Components

### PredictionForm

Allows users to:
- Select virus and protein target
- Configure prediction parameters
- Submit prediction requests

### ResultsDisplay

Shows:
- Prediction metadata (request ID, timestamp, processing time)
- Viral threat assessment with deadliness scores
- Top drug candidates in table format
- Interactive charts
- Detailed drug information modal

### DeadlinessChart

Radar chart displaying:
- Transmissibility
- Immune Evasion
- Mortality Rate
- Infection Severity

### DrugRankingsChart

Horizontal bar chart showing top 10 drug candidates by predicted affinity.

## 🌐 API Integration

All API calls are handled through `src/services/api.js`:

```javascript
import { viroAI } from './services/api';

// Health check
const health = await viroAI.healthCheck();

// List viruses
const viruses = await viroAI.listViruses();

// Predict binding
const results = await viroAI.predictBinding({
  virus_id: 'SARS-CoV-2',
  protein_pdb_id: '6VXX',
  top_n: 10
});

// Quick screening
const topDrugs = await viroAI.getTopDrugs('SARS-CoV-2', 10);
```

## 🎨 Styling

The application uses Tailwind CSS with custom utility classes:

- `.card` - White card with shadow
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.badge` - Small label badge
- `.input-field` - Styled input field

Custom colors are defined in `tailwind.config.js`:
- Primary (Blue): `primary-500`, `primary-600`
- Success (Green): `success-500`, `success-600`
- Warning (Orange): `warning-500`, `warning-600`
- Danger (Red): `danger-500`, `danger-600`

## 🔍 Error Handling

The application handles:
- API connection errors
- Invalid input validation
- Network timeouts
- Server errors

All errors are displayed using toast notifications.

## 📱 Responsive Design

The UI is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Build

```bash
npm run build
```

The optimized build will be in the `dist/` directory.

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Deploy with Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
EXPOSE 3000
```

## 🐛 Troubleshooting

### API Connection Failed

**Problem:** "Unable to connect to server" error

**Solution:**
1. Ensure backend is running on port 8000
2. Check `src/services/api.js` for correct baseURL
3. Verify CORS is enabled in backend

### Chart Not Displaying

**Problem:** Charts don't render

**Solution:**
1. Ensure Chart.js dependencies are installed
2. Check browser console for errors
3. Verify data format matches expected structure

### Build Errors

**Problem:** `npm run build` fails

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📝 Development Tips

### Hot Reload

Vite provides instant hot module replacement (HMR). Changes are reflected immediately without full page reload.

### Code Formatting

Recommended VS Code extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense

### Browser DevTools

Use React DevTools extension for component inspection and debugging.

## 🤝 Contributing

To add new features:

1. Create component in `src/components/`
2. Add API method in `src/services/api.js`
3. Import and use in `App.jsx`
4. Update this README

## 📄 License

Research and educational purposes only. Not for clinical use.

## 🆘 Support

For issues or questions:
- Check backend API documentation
- Review browser console for errors
- Ensure all dependencies are installed
- Verify Node.js version compatibility

---

**Viro-AI Frontend v1.0.0**  
Built with React, Vite, and Tailwind CSS

