import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
//import "./styles/Page.css";

const Registrationpage = () =>{
  {/* Form Data */}
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        altemail: '',
        month: '',
        day: '',
        year: '',
        gender: '',
        phone: '',
        altPhone: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword((prev) => !prev);
    }


    const navigate = useNavigate(); 

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleRegistration = (e) =>{
      e.preventDefault(); //Prevent form submission

        //Basic user validation
        if(!formData.firstName || !formData.lastName 
          || !formData.email || !formData.password
          || !formData.month || !formData.day || !formData.year
          || !formData.gender || !formData.phone){
            setErrorMessage('Please fill out all required fields.');
            console.log('Missing required fields...');
            return;
        }

        if(formData.password !== formData.confirmPassword){
            setErrorMessage('Passwords do not match!');
            console.log('Passwords do not match...');
            return;
        }

        console.log('Registering user:', formData);
        navigate('/dashboard')
        //Call Backend API registration logic here
    };

    const handleBackToLogin = () =>{
        console.log('Redirecting to login page...');
        //Handle back to login page
        navigate('/login');
    }

    return (
        <div className="page">
        <Navbar />

       {/* Form Section */}
       <div className="form-section">
        <div className="form-content">
          <h2>Create an account</h2>
          <p>Sign up to access our personalized services</p>
          <form onSubmit={handleRegistration}>
            {/* Name form-row */}
            <div className='form-row'>
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  placeholder="Enter your first name"
                  maxLength={20}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  placeholder="Enter your last name" 
                  maxLength={32}
                />
              </div> 
            </div> {/* Name form-row */}

            {/*Email form-row*/}
            <div className='form-row'> 
              <div className="form-group">
                <label>E-mail</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="JohnDoe@example.com"
                  maxLength={100} 
                />
              </div>
              <div className="form-group">
                <label>Alt. E-mail</label>
                <input 
                  type="altemail" 
                  name="altemail" 
                  value={formData.altemail} 
                  onChange={handleChange} 
                  placeholder="JohnDoe@example.com" 
                  maxLength={100}
                />
              </div>
            </div> {/* Email form-row */}

            {/* Phone# form-row */}
            <div className='form-row'> 
            <div className="form-group">
                  <label>Date of Birth</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    name="month" 
                    value={formData.month} 
                    onChange={handleChange} 
                    placeholder="MM" 
                    maxLength="2"
                    style={{ width: '50px' }}
                  />
                  <input 
                    type="text" 
                    name="day" 
                    value={formData.day} 
                    onChange={handleChange} 
                    placeholder="DD" 
                    maxLength="2"
                    style={{ width: '50px' }}
                  />
                  <input 
                    type="text" 
                    name="year" 
                    value={formData.year} 
                    onChange={handleChange} 
                    placeholder="YYYY" 
                    maxLength="4"
                    style={{ width: '70px' }}
                  />
                  </div>
                </div>
              <div className="form-group">
                <label>Gender</label>
                <select 
                  name="gender" 
                  value={formData.gender} 
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  </select>
              </div>
              <div className="form-group">
              <label>Phone Number</label>
              <input className='phonenumber-field'
                type="tel" 
                id='phone'
                name="phone" 
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="123-456-7890"
              />
              </div>
              <div className="form-group">
              <label>Alt. Phone Number</label>
              <input className='phonenumber-field'
                type="tel" 
                id='altPhone'
                name="altPhone" 
                value={formData.altPhone} 
                onChange={handleChange} 
                placeholder="123-456-7890" 
              />
              </div>
            </div> {/* Phone# form-row */}

            {/* Password form-row */}
            <div className='form-row'> 
              <div className="form-group">
              <label>Password</label>
                <div className='input-wrapper'>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Enter your password" 
                  />
                  <button 
                    type='button'
                    onClick={togglePasswordVisibility}
                    className='password-toggle'
                  >
                    <img
                      src={showPassword ? '/src/assets/icons/view.png' : '/src/assets/icons/hide.png'}
                      alt={showPassword ? 'Hide' : 'Show'}
                    />
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <div className='input-wrapper'>
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    placeholder="Re-enter your password" 
                  />
                  <button 
                    type='button'
                    onClick={toggleConfirmPasswordVisibility}
                    className='password-toggle'
                  >
                    <img
                      src={showConfirmPassword ? '/src/assets/icons/view.png' : '/src/assets/icons/hide.png'}
                      alt={showConfirmPassword ? 'Hide' : 'Show'}
                    />
                  </button>
               </div>
              </div>
            </div> {/* Password form-row */}

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="form-buttons">
              <button
                type="button"
                className="button signup-button"
                onClick={handleBackToLogin}>
                Back to Login
              </button>
              <button type="submit" className="button login-button"
                onClick={handleRegistration}>
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
