import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filters } from '../components/Filters';
import { EventCard } from '../components/EventCard';
import { useEvents } from '../context/EventContext';
import { categories } from '../data/events';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/Button';

export const BrowseEvents = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { events } = useEvents();
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || 'All',
    type: searchParams.get('type') || 'All',
  });
  
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update URL when filters change
  useEffect(() => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.category && filters.category !== 'All') params.category = filters.category;
    if (filters.type && filters.type !== 'All') params.type = filters.type;
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const filteredEvents = events.filter(event => {
    const matchSearch = event.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                        event.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchCategory = filters.category === 'All' || event.category === filters.category;
    const matchType = filters.type === 'All' || event.type === filters.type;
    
    return matchSearch && matchCategory && matchType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Browse Events</h1>
          <p className="text-slate-500 mt-1">Find the perfect event for you</p>
        </div>
        
        <div className="md:hidden">
            <Button variant="secondary" onClick={() => setShowMobileFilters(!showMobileFilters)}>
                <SlidersHorizontal className="w-4 h-4" /> Filters
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-slate-200 sticky top-24">
            <Filters filters={filters} setFilters={setFilters} categories={categories} />
          </div>
        </div>

        {/* Mobile Filters Overlay */}
        {showMobileFilters && (
            <div className="fixed inset-0 z-50 bg-black/50 lg:hidden flex justify-end">
                <div className="bg-white w-80 h-full p-6 overflow-y-auto animate-in slide-in-from-right">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-bold text-lg">Filters</h2>
                        <button onClick={() => setShowMobileFilters(false)} className="text-slate-500">Close</button>
                    </div>
                    <Filters filters={filters} setFilters={setFilters} categories={categories} />
                </div>
            </div>
        )}

        {/* Event Grid */}
        <div className="lg:col-span-3">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                <p className="text-slate-500 text-lg">No events found matching your criteria.</p>
                <Button variant="outline" className="mt-4" onClick={() => setFilters({ search: '', category: 'All', type: 'All' })}>
                    Clear Filters
                </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
