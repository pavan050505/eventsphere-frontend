import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import { Calendar, MapPin, Clock, Share2, Heart, User, ArrowLeft, CreditCard, Smartphone } from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

export const EventDetails = () => {
  const { id } = useParams();
  const { getEvent } = useEvents();
  const event = getEvent(id);

  // Helper to format date in Indian format
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", { 
        day: "numeric", 
        month: "long", 
        year: "numeric" 
    });
  };

  if (!event) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Event not found</h2>
            <Link to="/events">
                <Button>Back to Events</Button>
            </Link>
        </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Banner */}
      <div className="h-[400px] w-full relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/800x600?text=Event+Banner';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        <div className="absolute top-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/events" className="inline-flex items-center text-white/80 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Browse
            </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                   <Badge variant="primary" className="mb-4">{event.category}</Badge>
                   <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{event.title}</h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary" size="sm"><Share2 className="w-4 h-4" /></Button>
                    <Button variant="secondary" size="sm"><Heart className="w-4 h-4" /></Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-y border-slate-100 py-6">
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Date</p>
                        <p className="text-slate-900 font-semibold">{formatDate(event.date)}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Time</p>
                        <p className="text-slate-900 font-semibold">{event.time}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Location</p>
                        <p className="text-slate-900 font-semibold">{event.location}</p>
                    </div>
                 </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">About this Event</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {event.description}
                  <br /><br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Organizer</h2>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
                        <User className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{event.organizer}</h3>
                        <p className="text-slate-500 text-sm">Member since 2021</p>
                    </div>
                    <Button variant="secondary" size="sm" className="ml-auto">Contact</Button>
                </div>
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:w-1/3">
             <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Ticket Information</h3>
                
                <div className="flex justify-between items-center mb-6 p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-600 font-medium">Standard Ticket</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {event.price === 0 ? 'Free' : `₹${event.price}`}
                    </span>
                </div>

                <Button size="lg" className="w-full mb-6 shadow-blue-200 shadow-lg">
                    Book Now
                </Button>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-500 text-sm">
                     <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                       <Smartphone className="w-4 h-4" />
                     </div>
                     <span>Secure payments via UPI, Cards & Wallets</span>
                  </div>
                  <div className="flex items-center gap-2 pl-11">
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">UPI</span>
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">GPay</span>
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">Paytm</span>
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">Cards</span>
                  </div>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6">
                    No booking fees • 100% Secure Payment
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
