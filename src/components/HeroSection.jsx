import PropTypes from 'prop-types';

const HeroSection = ({ user, onEditPicture }) => {
  if (!user) {
    return (
      <div className="hero-section">
        <h1>Welcome to the Elderly Care Portal!</h1>
      </div>
    );
  }

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Welcome back, {user.name}!</h1>
      </div>

      <div className="hero-profile" style={{ textAlign: 'center' }}>
        {/* Show user’s picture or a default icon */}
        {user.profilePicture ? (
          <img
            className="profile-picture"
            src={user.profilePicture}
            alt="Profile"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
        ) : (
          <img
            className="profile-picture"
            src="/src/assets/icons/default-profile.png"
            alt="Default Profile"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
        )}

        {/* Button directly under the icon */}
        <button
          style={{ marginTop: '10px' }}
          onClick={onEditPicture}
        >
          Edit Picture
        </button>
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    profilePicture: PropTypes.string,
  }),
  onEditPicture: PropTypes.func.isRequired,
};

HeroSection.defaultProps = {
  user: null,
};

export default HeroSection;
