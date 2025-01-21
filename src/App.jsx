import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

// Component Imports 
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Imports
import Registrationpage from './Registration';
import Helppage from './Help';
import Dashboardpage from './Dashboard';
import Login from './Login';


const App = () => {
  // track User login state 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Define tabs for logged in and logged out states 
  const tabsLoggedIn = [
    { name: 'Home', link: '/dashboard' },
    { name: 'Archives', link: '/archives' },
    { name: 'Calendars', link: '/calendars' },
    { name: 'FAQ', link: '/help' },
    { name: 'Log Out', link: '/login', action: () => setIsLoggedIn(false) }, //Logout logic
  ];

  const tabsLoggedOut = [
    { name: 'About Us', link: '/about' },
    { name: 'FAQ', link: '/help' },
    { name: 'Support', link: '/support' },
    { name: 'Log In', link: '/login' },
  ];
  
  return (
    <Router>
      { /* Pass tabs based on login state */}
      <Navbar tabs={isLoggedIn ? tabsLoggedIn : tabsLoggedOut} />
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/register" element={<Registrationpage setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/help" element={<Helppage />} />
        <Route path="/dashboard" 
          element=
          {<ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboardpage />
          </ProtectedRoute>} 
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
