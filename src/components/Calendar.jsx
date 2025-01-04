import { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ onDateSelect }) =>{
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onDateSelect(date); //Pass the selected date to the parent element
    };

    return(
        <div>
            <Calendar onChange={handleDateChange} value={selectedDate}/>
        </div>
    );
   
};

CalendarComponent.propTypes = {
    onDateSelect: PropTypes.func.isRequired
   };

export default CalendarComponent;