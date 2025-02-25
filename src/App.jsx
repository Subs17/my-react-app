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
import ArchivesPage from './ArchivePage';
import UtilitiesPage from './UtilitiesPage';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';


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
          headers: { "Content-Type": "application/json" },
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
    { name: 'Utilities', link: '/utilities' },
    { name: 'Log Out',
      link: '/logout',
      action: async () => {
        // call logout endpoint, update isLoggedIn
        await fetch("http://localhost:3000/api/v1/auth/logout", {
          method: "POST",
          credentials: "include"
        });
        setIsLoggedIn(false); }
      }, //Logout logic
  ];

  const tabsLoggedOut = [
    { name: 'About Us', link: '/about' },
    { name: 'Support', link: '/support' },
    { name: 'Log In', link: '/login' },
  ];
  
  return (
    <div className='app-container'>
    <Router>
      { /* Pass tabs based on login state */}
      <Navbar tabs={isLoggedIn ? tabsLoggedIn : tabsLoggedOut} />
      <div className='main-content'>
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/register" element={<Registrationpage setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/support" element={<Helppage />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path="/dashboard" 
          element=
          {<ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboardpage />
          </ProtectedRoute>} 
        />

        <Route 
          path="/archives"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ArchivesPage />
            </ProtectedRoute> }
        />

        <Route
          path="/utilities"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <UtilitiesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      </div>
      <Footer />
    </Router>
    </div>
  );
};

export default App;
