import React from 'react';
import { Search } from 'lucide-react';

export const Filters = ({ filters, setFilters, categories }) => {
  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleTypeChange = (type) => {
    setFilters(prev => ({ ...prev, type }));
  };

  return (
    <div className="space-y-8">
      {/* Search */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Search</h3>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={filters.category === category}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className={`text-sm ${filters.category === category ? 'text-blue-600 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Location / Type */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Event Type</h3>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {['All', 'Online', 'Offline'].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${
                filters.type === type
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range (Mock) */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Price Range</h3>
        <div className="space-y-4">
           <input type="range" className="w-full accent-blue-600" />
           <div className="flex justify-between text-xs text-slate-500">
             <span>Free</span>
             <span>₹5000+</span>
           </div>
        </div>
      </div>
    </div>
  );
};
