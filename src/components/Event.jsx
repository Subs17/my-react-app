import PropTypes from "prop-types";

const UpcomingEvent = ({ nearestEvent }) =>{
    
      return (
        <div className='upcoming-event'>
          <h3>{nearestEvent.title}</h3>
          <p>{new Date(nearestEvent.date).toLocaleString()}</p>
        </div>
      );
};

UpcomingEvent.propTypes ={
    nearestEvent: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
    }),
};

export default UpcomingEvent;
