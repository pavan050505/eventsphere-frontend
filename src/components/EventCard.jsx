import React from 'react';
import { Calendar, MapPin, Users, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Badge } from './Badge';

export const EventCard = ({ event }) => {
  // Helper to format date in Indian format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", { 
        day: "numeric", 
        month: "short", 
        year: "numeric" 
    });
  };

  return (
    <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/800x600?text=Event+Image';
          }}
        />
        <div className="absolute top-4 left-4">
          <Badge variant="primary" className="bg-white/90 backdrop-blur-sm shadow-sm">
            {event.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
             <Badge variant={event.type === 'Online' ? 'success' : 'secondary'} className="bg-white/90 backdrop-blur-sm shadow-sm">
                {event.type}
             </Badge>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(event.date)} • {event.time}</span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <User className="w-4 h-4 text-slate-400" />
            <span className="truncate">by {event.organizer}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
            <Users className="w-4 h-4" />
            <span>{event.attendees} going</span>
          </div>
          <div className="text-lg font-bold text-blue-600">
            {event.price === 0 ? 'Free' : `₹${event.price}`}
          </div>
        </div>
        
        <div className="mt-4">
            <Link to={`/events/${event.id}`} className="block">
                <Button variant="secondary" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                    View Details
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
};
