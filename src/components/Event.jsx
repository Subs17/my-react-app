import PropTypes from "prop-types";

const UpcomingEvent = ({ nearestEvent }) =>{
    if (!nearestEvent) {
        return (
          <div>
            <h2>Upcoming Event</h2>
            <p>No upcoming events</p>
          </div>
        );
      }
    
      return (
        <div>
          <h2>Upcoming Event</h2>
          <div>
            <h3>{nearestEvent.title}</h3>
            <p>Date: {new Date(nearestEvent.date).toLocaleDateString()}</p>
          </div>
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