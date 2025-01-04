import { useNavigate } from "react-router-dom";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import "./styles/Page.css";

const Loginpage = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="login-page">
        <Navbar />

        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome to the Elderly Care Portal!</h1>
          <p>Stay organized, stay on track, and keep everything important in one place!</p>
        </div>

        <div className='form'>
          <div className='container'>
            <h2 className='title1'>Login</h2>
            <p>Enter your credentials to access your account.</p>
          </div>
          <div className='form-list'>
            <div className= 'form-row'>
              <label htmlFor='email'>Email</label>
              <input 
                id='email'
                type="email"
                size='30'
                maxLength='100'
                name="email"
                placeholder="Enter your email"
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Loginpage;
