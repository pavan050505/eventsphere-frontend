import React, { createContext, useContext, useState, useEffect } from 'react';
import { events as initialEvents } from '../data/events';

const EventContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useEvents = () => {
  return useContext(EventContext);
};

export const EventProvider = ({ children }) => {
  // Lazy initialization to avoid synchronous state update in effect
  const [events, setEvents] = useState(() => {
    try {
      const storedEvents = localStorage.getItem('eventsphere_events');
      return storedEvents ? JSON.parse(storedEvents) : initialEvents;
    } catch (error) {
      console.error("Failed to parse events from local storage", error);
      return initialEvents;
    }
  });

  const loading = false;

  // Initialize local storage if empty (handled by lazy init, but ensuring persistence)
  useEffect(() => {
    if (!localStorage.getItem('eventsphere_events')) {
      localStorage.setItem('eventsphere_events', JSON.stringify(initialEvents));
    }
  }, []);

  // Update local storage whenever events change
  useEffect(() => {
    localStorage.setItem('eventsphere_events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now(), // Simple ID generation
      attendees: 0,
      isFeatured: false,
    };
    setEvents(prev => [eventWithId, ...prev]);
    return eventWithId;
  };

  const updateEvent = (id, updatedData) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updatedData } : event
    ));
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const getEvent = (id) => {
    // Handle both string and number IDs
    return events.find(event => event.id == id);
  };

  return (
    <EventContext.Provider value={{ events, loading, addEvent, updateEvent, deleteEvent, getEvent }}>
      {children}
    </EventContext.Provider>
  );
};
