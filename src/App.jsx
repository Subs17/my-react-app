import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/user", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          // user is logged in
          setIsLoggedIn(true);
        } else {
          // not logged in
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoadingAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (loadingAuth) {
    return <div>Loading...</div>;
  }
  // Define tabs for logged in and logged out states 
  const tabsLoggedIn = [
    { name: 'Home', link: '/dashboard' },
    { name: 'Archives', link: '/archives' },
    { name: 'Utilities', link: '/help' },
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
