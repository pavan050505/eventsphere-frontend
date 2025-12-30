import React from 'react';
import { Hero } from '../components/Hero';
import { EventCard } from '../components/EventCard';
import { useEvents } from '../context/EventContext';
import { categories } from '../data/events';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const Home = () => {
  const { events } = useEvents();
  const featuredEvents = events.filter(event => event.isFeatured);
  const upcomingEvents = events.slice(0, 4); 

  return (
    <div className="pb-20">
      <Hero />

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              Featured Events
            </h2>
            <p className="text-slate-500 mt-1">Curated top picks for you</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Browse By Category - Simple Pill List */}
      <section className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.slice(1).map((cat) => ( // Skip "All"
              <Link 
                key={cat} 
                to={`/events?category=${encodeURIComponent(cat)}`}
                className="px-6 py-3 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-medium hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Upcoming Events</h2>
            <p className="text-slate-500 mt-1">Don't miss out on these happenings</p>
          </div>
          <Link to="/events">
            <Button variant="ghost" className="gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-blue-600 rounded-2xl p-12 text-center text-white relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to Host Your Own Event?</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of organizers who use EventSphere to create, promote, and sell tickets for their events.
              </p>
              <Link to="/create-event">
                <Button variant="secondary" size="lg" className="border-none shadow-lg text-blue-600">
                  Create Your Event
                </Button>
              </Link>
           </div>
           
           {/* Decorative circles */}
           <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
           <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-blue-400 rounded-full opacity-50 blur-3xl"></div>
        </div>
      </section>
    </div>
  );
};
