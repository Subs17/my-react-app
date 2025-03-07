import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        // Redirect if user is not logged in
        return <Navigate to="/login" replace/>;
    }
    
    return children;
};

ProtectedRoute.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
