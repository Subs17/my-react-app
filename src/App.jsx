//import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginpage from './Login';
import Registrationpage from './Registration';
import Helppage from './Help';
import Dashboardpage from './Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/register" element={<Registrationpage />} />
        <Route path="/help" element={<Helppage />} />
        <Route path="/dashboard" element={<Dashboardpage />} />
      </Routes>
    </Router>
  );
};

export default App;