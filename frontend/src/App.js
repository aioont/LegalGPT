import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LegalAssist from './pages/LegalAssist';
import SimilaritySearch from './pages/SimilaritySearch';
import LegalCitations from './pages/LegalCitations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="legal-assist" element={<LegalAssist />} />
          <Route path="similarity-search" element={<SimilaritySearch />} />
          <Route path="legal-citations" element={<LegalCitations />} />
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;