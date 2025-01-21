import { useState } from 'react';
import CalendarComponent from './components/Calendar';
import UpcomingEvent from './components/Event';

const Dashboardpage = ({ className, ...props }) =>{
    const [events, setEvents] = useState([]);
    const [nearestEvent, setNearestEvent] = useState(null);

    const handleDateSelect = (date) =>{
        const eventTitle = prompt('Enter event title:');
        if(eventTitle) {
            const newEvent = { title: eventTitle, date: date.toISOString()};
            const updatedEvents = [...events, newEvent];

            setEvents(updatedEvents);

            //update nearest event
            const upcoming = updatedEvents.reduce((nearest, event) => {
                const eventDate = new Date(event.date);
                const now = new Date();
                const isUpcoming = eventDate >= now;
                const isCloser = 
                    !nearest || 
                    (isUpcoming && eventDate < new Date(nearest.date));
                return isCloser ? event : nearest;
            }, null);

            setNearestEvent(upcoming);
        }
    }
    return (
        <div className='dashboard'>
          <h1>Welcome to Your Dashboard</h1>
          <div className='dashboard content'>
            <div className='calendar-section'>
              <h2>Your Calendar</h2>
              <CalendarComponent onDateSelect={handleDateSelect} />
            </div>
            <div className='event-section'>
              {nearestEvent ? (
                <UpcomingEvent nearestEvent={nearestEvent} />
              ) : (
                <p>No upcoming events</p>
              )}  
            </div>
          </div>
        </div>
      );
    };

export default Dashboardpage;
