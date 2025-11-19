# Viro-AI Landing Page (React Version)

This is the React version of the Viro-AI landing page, converted from the original HTML/CSS/JS implementation while maintaining all visuals, animations, and functionality.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the local URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 📁 Project Structure

```
├── public/
│   ├── bg_component1_viro.png    # Side images
│   ├── bg_component2_viro.png
│   └── index.html                # HTML template
├── src/
│   ├── components/
│   │   ├── SideImage.jsx         # Side image component
│   │   ├── Header.jsx            # Center title section
│   │   ├── InfoSection.jsx       # Scrollable info boxes
│   │   └── Footer.jsx            # Footer component
│   ├── App.jsx                   # Main app component
│   ├── App.css                   # All styles
│   └── main.jsx                  # React entry point
├── package.json
└── vite.config.js
```

## ✨ Features Maintained

- ✅ 3D DNA background animation (iframe)
- ✅ Side images with hover effects
- ✅ Fade-in animations on load
- ✅ Center title section
- ✅ Scrollable info boxes with hover effects
- ✅ Responsive design
- ✅ All original styling and layout

## 🧩 Components

- **SideImage**: Reusable component for left/right side images
- **Header**: Center title and subtitle
- **InfoSection**: Contains all info boxes with data-driven approach
- **Footer**: Footer with copyright information

## 🛠 Technologies

- React 18
- Vite (Fast build tool)
- CSS (Original styles maintained)

---

**Ready for further modifications and additional page development!**

