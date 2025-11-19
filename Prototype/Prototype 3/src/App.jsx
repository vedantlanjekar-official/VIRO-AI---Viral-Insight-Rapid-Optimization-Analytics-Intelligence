import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Analyze from './components/Analyze';
import DrugAntidotePage from './pages/DrugAntidotePage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/drug-antidote" element={<DrugAntidotePage />} />
      </Routes>
    </Router>
  );
}

export default App;