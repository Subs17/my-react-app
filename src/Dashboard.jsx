import Navbar from "./components/Navbar";
import { useState } from 'react';
import CalendarComponent from './components/Calendar';
import UpcomingEvent from './components/Event';
import Footer from "./components/Footer";
//import './styles/Page.css';

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
        }
    }
    return (
        <div>
          <Navbar />
          <h1>Welcome to Your Dashboard</h1>
          <div>
            <div>
              <CalendarComponent onDateSelect={handleDateSelect} />
            </div>
            <div>
              <UpcomingEvent nearestEvent={nearestEvent} />
            </div>
          </div>
          <Footer />
        </div>
      );
    };

export default Dashboardpage;
