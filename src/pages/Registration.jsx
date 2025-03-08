import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
//import "./styles/Page.css";

const Registrationpage = ({ setIsLoggedIn }) =>{
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

    const handleRegistration = async (e) =>{
      e.preventDefault(); //Prevent form submission

      // Define the required fields of the form
      const requiredFields = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        month: 'Month',
        day: 'Day',
        year: 'Year',
        gender: 'gender',
        phone: 'Phone Number',
        password: 'Password',
      };

      // Find missing fields
      const missingFields = Object.keys(requiredFields).filter(
        (field) => !formData[field]
      );

      if (missingFields.length > 0) {
        const missingFieldNames = missingFields.map((field) => requiredFields[field]).join(', ');

        // Display error code in console and UI
        console.error('Missing fields:', missingFieldNames);
        setErrorMessage(`Missing fields: ${missingFieldNames}`);
        return;
      }

        if(formData.password !== formData.confirmPassword){
            setErrorMessage('Passwords do not match!');
            console.log('Passwords do not match...');
            return;
        }

        try{
          // Build the date string
          const dob = `${formData.year}-${formData.month.padStart(2, '0')}-${formData.day.padStart(2, '0')}`;

          // Prepare the data to be sent to the server
          const requestData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            altemail: formData.altemail || '', // Optional
            dob,
            gender: formData.gender,
            phone: formData.phone,
            altPhone: formData.altPhone || '', // Optional
            password: formData.password,
        };

        // Send the data to the server and API call
        console.log('Registering user:', requestData);

        const response = await fetch('http://localhost:3000/api/v1/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Registration successful:', data);
          setErrorMessage('');
          await fetch("http://localhost:3000/api/v1/auth/logout", {
            method: "POST",
            credentials: "include"
          });
          setIsLoggedIn(true); // Set login state
          //console.log('Registering user:', formData);
          navigate('/dashboard')
        } else {
          console.error('Registration failed:', data.error);
          setErrorMessage(data.message || 'Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
       
    };

    const handleBackToLogin = () =>{
        console.log('Redirecting to login page...');
        //Handle back to login page
        navigate('/login');
    }

    return (
        <div className="page">

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
                <label>Alt. E-mail (Optional)</label>
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
              <label>Alt. Number (Optional)</label>
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
    </div>
    );
};

Registrationpage.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
};

export default Registrationpage;