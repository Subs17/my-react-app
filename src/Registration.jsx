import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./styles/Page.css";

const Registrationpage = () =>{
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        month: '',
        day: '',
        year: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        phone: '',
        altPhone: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate(); 

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleRegistration = () =>{
        //Basic user validation
        if(!formData.firstName || !formData.lastName || !formData.email || !formData.password){
            setErrorMessage('Please fill out all required fields.');
            return;
        }

        if(formData.password !== formData.confirmPassword){
            setErrorMessage('Passwords do not match!');
            return;
        }

        console.log('Registering user:', formData);
        navigate('/dashboard')
        //Call Backend API registration logic
    };

    const handleBackToLogin = () =>{
        console.log('Redirecting to login page...');
        //Handle back to login page
        navigate('/');
    }

    return (
        <div className="page">
      <Navbar />

      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome to the Elderly Care Portal!</h1>
        <p>Stay organized, stay on track, and keep everything important in one place!</p>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <div className="form-content">
          <h2>Create an account</h2>
          <p>Sign up to access our personalized services</p>
          <form>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email address" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Re-enter your password" />
            </div>
            <div className="form-buttons">
              <button
                type="button"
                className="secondary-button"
                onClick={handleBackToLogin}>
                Back to Login
              </button>
              <button type="submit" className="primary-button">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
    );
};

export default Registrationpage;