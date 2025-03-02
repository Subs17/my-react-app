import PropTypes from 'prop-types';

const Navbar = ({tabs = []}) => {
    return (
      <div className="navbar">
        <div className='navbar-logo-title'>
        <img 
        src='/src/assets/icons/Elderlycare-logo.png'
        alt='Elderly Care Logo'
        className='navbar-logo'
        />
      <h1 className='navbar-title'>Elderly Care Portal</h1>
      </div>
      <div className="navbar-links-container">
        <ul className="navbar-links">
          {tabs.map((tab, index) => (
            <li key={index} className="navbar-link"> 
              <a href={tab.link}
              onClick={(e) => {
                if (tab.action) {
                  e.preventDefault();
                  tab.action();
                }
              }}>{tab.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
  };

Navbar.propTypes = {
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        action: PropTypes.func, //Optional action for logout
      })
    ).isRequired,
};

Navbar.defaultProps = {
    tabs: [],
};

  export default Navbar;
