import React from 'react';
import { Search, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { cities } from '../data/events';

export const Hero = () => {
  return (
    <div className="relative bg-slate-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/hero1/1920/1080"
          alt="Event Crowd"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Discover & Manage <span className="text-blue-500">Amazing Events</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
            The all-in-one platform to find, host, and manage events. Join millions of people discovering their next experience.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-2 rounded-2xl shadow-xl max-w-4xl mx-auto transform translate-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div className="relative border-b md:border-b-0 md:border-r border-slate-200 p-2">
              <label className="block text-xs font-semibold text-slate-500 mb-1 ml-9">Looking for</label>
              <div className="flex items-center">
                <Search className="w-5 h-5 text-blue-600 absolute left-3" />
                <input
                  type="text"
                  placeholder="Event name or category"
                  className="w-full pl-9 pr-4 py-1 text-slate-900 placeholder-slate-400 focus:outline-none font-medium bg-transparent"
                />
              </div>
            </div>

            <div className="relative border-b md:border-b-0 md:border-r border-slate-200 p-2">
              <label className="block text-xs font-semibold text-slate-500 mb-1 ml-9">Location</label>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-600 absolute left-3" />
                <select className="w-full pl-9 pr-8 py-1 text-slate-900 bg-transparent focus:outline-none font-medium appearance-none cursor-pointer">
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
              </div>
            </div>

            <div className="relative border-b md:border-b-0 md:border-r border-slate-200 p-2">
              <label className="block text-xs font-semibold text-slate-500 mb-1 ml-9">When</label>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-blue-600 absolute left-3" />
                <input
                  type="date"
                  className="w-full pl-9 pr-4 py-1 text-slate-900 bg-transparent focus:outline-none font-medium"
                />
              </div>
            </div>

            <div className="p-2">
              <Button size="lg" className="w-full h-full text-base shadow-lg">
                Search Events
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
