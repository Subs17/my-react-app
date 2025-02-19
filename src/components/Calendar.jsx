import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarComponent = ({ events, onEventClick, selectedEvent }) => {
  return (
    <div className='calendar-container'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        events={events}
        height="auto"
        
        // Remove the default browser alert. We'll just call the parent callback.
        eventClick={(info) => {
          if (onEventClick) {
            onEventClick(info.event);
          }
        }}

        // Highlight the selected event by adding a custom CSS class
        eventClassNames={(arg) => {
          // If the event's ID matches the selectedEvent's ID, return a highlight class
          if (selectedEvent && arg.event.id === selectedEvent.eventId?.toString()) {
            return ['selected-event'];
          }
          return [];
        }}
      />
    </div>
  );
};

CalendarComponent.propTypes = {
  events: PropTypes.array.isRequired,
  onEventClick: PropTypes.func,
  selectedEvent: PropTypes.object,
};

export default CalendarComponent;
