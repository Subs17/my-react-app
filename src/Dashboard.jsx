import { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import CalendarComponent from "./components/Calendar";
import EventForm from "./components/EventForm";
import ProfilePictureModal from "./components/ProfilePictureModal";

const Dashboardpage = () => {
  // ──────────────────────────────────────────────────────────────────────────
  // User-related state
  // ──────────────────────────────────────────────────────────────────────────
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // ──────────────────────────────────────────────────────────────────────────
  // Event-related state
  // ──────────────────────────────────────────────────────────────────────────
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ──────────────────────────────────────────────────────────────────────────
  // Fetch user & events on mount
  // ──────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchUser();
    fetchEvents();
  }, []);

  // Fetch user details (name, profilePicture, etc.)
  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user details!");
      }
      const data = await response.json();
      // data might look like { name: "Daryl Zambrana-Feliciano", profilePicture: "/some/path.jpg" }
      setUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  // Fetch events for the calendar
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/events", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch events.");

      const data = await response.json();
      console.log("✅ Events fetched:", data);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };


  const handleProfileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
  
      const response = await fetch("http://localhost:3000/api/v1/user/profile-picture", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
  
      // The server now returns the full updated user
      const updatedUser = await response.json();
      console.log("✅ Updated user from server:", updatedUser);
  
      // Overwrite local user with the updated one
      setUser(updatedUser);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload profile picture.");
    }
  };
  


  const handleEventAdd = async (newEvent) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/events", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });
      if (!response.ok) throw new Error("Failed to add event.");

      const eventData = await response.json();
      console.log("✅ Newly created event data:", eventData);

      // Merge new event into local state
      setEvents((prevEvents) => [
        ...prevEvents,
        {
          eventId: eventData.eventId, // from your backend's insertId
          title: newEvent.title,
          date: newEvent.date,
          time: newEvent.time,
          description: newEvent.description || "",
        },
      ]);

      setShowEventForm(false);
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    }
  };

  const handleEventUpdate = async (updatedEvent) => {
    console.log("Updating event ID:", updatedEvent.eventId);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/events/${updatedEvent.eventId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedEvent),
        }
      );
      if (!response.ok) throw new Error("Failed to update event.");

      const updatedData = await response.json();
      console.log("✅ Updated event from server:", updatedData);

      // Merge changes in local state
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.eventId === updatedData.eventId ? updatedData : evt
        )
      );

      setSelectedEvent(null);
      setShowEventForm(false);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event.");
    }
  };

  const handleEventDelete = async () => {
    if (!selectedEvent) {
      alert("Please select an event to delete.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/events/${selectedEvent.eventId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to delete event.");

      // Remove from state
      setEvents((prevEvents) =>
        prevEvents.filter((e) => e.eventId !== selectedEvent.eventId)
      );
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  const handleEventClick = (clickedEvent) => {
    const foundEvent = events.find(
      (e) => e.eventId.toString() === clickedEvent.id
    );
    if (foundEvent) {
      setSelectedEvent(foundEvent);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Convert DB events to FullCalendar format
  // ──────────────────────────────────────────────────────────────────────────
  const finalEvents = events
    .map((event) => {
      if (!event.date || !event.time) {
        return null;
      }
      const dateTime = new Date(`${event.date}T${event.time}`);
      if (isNaN(dateTime.getTime())) {
        return null;
      }
      return {
        id: event.eventId,
        title: event.title,
        start: dateTime.toISOString(),
        description: event.description || "",
      };
    })
    .filter(Boolean);

  // ──────────────────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────────────────
  if (loadingUser) {
    return <h1>Loading user data...</h1>;
  }

  return (
    <div className="dashboard">
      {/* HeroSection: show name + picture, with an Edit button that toggles showProfileModal */}
      <HeroSection
        user={user}
        onEditPicture={() => setShowProfileModal(true)}
      />

      <div className="dashboard-container">
        <div className="sidebar">
          <h3>Event Controls</h3>
          <button
            className="menu-btn"
            onClick={() => {
              setIsEditMode(false);
              setSelectedEvent(null);
              setShowEventForm(true);
            }}
          >
            + Add Event
          </button>
          <button
            className="menu-btn"
            onClick={() => {
              if (!selectedEvent) {
                alert("Please select an event to edit.");
                return;
              }
              setIsEditMode(true);
              setShowEventForm(true);
            }}
          >
            ✏️ Edit Event
          </button>
          <button className="menu-btn delete" onClick={handleEventDelete}>
            🗑️ Delete Event
          </button>
        </div>

        <div className="calendar-wrapper">
          <CalendarComponent
            events={finalEvents}
            onEventClick={handleEventClick}
            selectedEvent={selectedEvent}
          />
        </div>
      </div>

      {/* Conditionally render Event Form (Add/Edit) */}
      {showEventForm && (
        <EventForm
          onSubmit={isEditMode ? handleEventUpdate : handleEventAdd}
          onClose={() => {
            setShowEventForm(false);
            setIsEditMode(false);
          }}
          initialEvent={isEditMode ? selectedEvent : null}
        />
      )}

      {/* Conditionally render Profile Picture Modal */}
      {showProfileModal && (
        <ProfilePictureModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          currentImageUrl={user?.profilePicture}
          onUpload={handleProfileUpload}
        />
      )}
    </div>
  );
};

export default Dashboardpage;
