import React from 'react';
import { Routes, Route } from 'react-router';
import About from './About';
import LandingPage from './LandingPage';
import Office from './Office';

const RouteContent = () => {
  return (
    <div className="routes">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/office" element={<Office />} />
      </Routes>
    </div>
  );
};

export default RouteContent;
