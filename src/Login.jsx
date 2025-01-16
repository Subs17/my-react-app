import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
//import './styles/PageStyles.css'; // Ensure this CSS file includes the provided styles

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const handleSignupClick = () => {
    console.log('Redirecting to registration page...');
    navigate('/register');
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();

    // Basic login validation
    if(!formData.email || !formData.password){
      setErrorMessage('Please fill out all required fields.');
      console.log('Missing required fields...');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        setErrorMessage('');
        navigate('/dashboard');
      } else {
        console.error('Login failed:', data.error);
        setErrorMessage(data.error || 'Failed to login. Please try again.');
      } 
    } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
  };
  

  return (
    <div className="page">
      <div className="login-page">
        <Navbar />
        <div className="login-header">
         <div className="header-container"> 
           <h1 className="header-title">Welcome to the Elderly Care Portal!</h1>
           <p className="description">
            Stay organized, stay on track, and keep everything important in one place!
           </p>
         </div>
            <img className="vector-200" src="vector-2000.svg" alt="Background" />
        </div>

        <div className="login-form">
         <div className="login-container">
            <h1>Login</h1>
            <p className="form-description">
            Enter your credentials to access your account
            </p>
         </div>

         <div className="list">
          <div className="row">
            <div className="input">
              <label className="email-label title5" htmlFor='email'>E-mail</label>
                  <input className="textfield"
                    id='email'
                    type='email'
                    size='30'
                    maxLength='100'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
            </div>
          </div>

          <div className="row">
            <div className="input">
              <label className="password-label title5" htmlFor='password'>Password</label>
              <a className="tab3 hyperlink-style">Forgot Password?</a>
                  <input className="textfield"
                    id='password'
                    size='30'
                    maxLength='100'
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"    
                  />
              <p className="info">Minimum 8 characters</p>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="button-row">
              <button className="button login-button" type='submit'
               onClick={handleLoginClick}>Login</button> 
               <p>Or</p>
               <button className="button signup-button" type='button'
               onClick={handleSignupClick}>Sign Up</button>          
            </div>
         </div>
            <img className="vector-2002" src="vector-2001.svg" alt="Background" />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
