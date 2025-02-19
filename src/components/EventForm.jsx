// EventForm.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EventForm = ({ onSubmit, onClose, initialEvent }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title || "");
      setDate(initialEvent.date || "");
      setTime(initialEvent.time || "");
      setDescription(initialEvent.description || "");
    }
  }, [initialEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !time) {
      alert("Title, date, and time are required!");
      return;
    }

    // Only include eventId if editing
    const updatedEvent = {
      eventId: initialEvent?.eventId,
      title,
      date,
      time,
      description,
    };

    onSubmit(updatedEvent);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{initialEvent ? "Edit Event" : "Add Event"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Save Event</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

EventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialEvent: PropTypes.object,
};

export default EventForm;
