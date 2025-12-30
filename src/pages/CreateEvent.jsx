import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Upload, Calendar, MapPin, DollarSign, Type, AlignLeft } from 'lucide-react';
import { categories } from '../data/events';
import { useEvents } from '../context/EventContext';
import { useAuth } from '../context/AuthContext';

export const CreateEvent = () => {
  const navigate = useNavigate();
  const { addEvent } = useEvents();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    time: '',
    location: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newEvent = {
        ...formData,
        price: Number(formData.price),
        organizer: user ? `${user.firstName} ${user.lastName}` : 'Anonymous',
        // Random image for demo purposes
        image: `https://picsum.photos/seed/${Date.now()}/800/600`, 
        type: formData.location.toLowerCase().includes('online') ? 'Online' : 'Offline',
        city: formData.location.split(',')[0].trim(),
        attendees: 0,
        isFeatured: false,
    };

    addEvent(newEvent);
    // alert('Event Created Successfully!');
    navigate('/events');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Create New Event</h1>
        <p className="text-slate-500 mt-2">Fill in the details to publish your event.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
        
        {/* Basic Info */}
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Basic Information</h2>
            
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Event Title</label>
                <div className="relative">
                    <Type className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                        type="text"
                        name="title"
                        required
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                        placeholder="e.g. Pune Tech Summit 2025"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Category</label>
                    <select
                        name="category"
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        {categories.slice(1).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                
                <div className="space-y-2">
                     <label className="block text-sm font-medium text-slate-700">Ticket Price (₹)</label>
                     <div className="relative">
                        <span className="absolute left-3 top-2 text-slate-400 font-semibold">₹</span>
                        <input
                            type="number"
                            name="price"
                            min="0"
                            className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                            placeholder="0"
                            value={formData.price}
                            onChange={handleChange}
                        />
                     </div>
                </div>
            </div>
        </div>

        {/* Date & Location */}
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Date & Location</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Date</label>
                    <div className="relative">
                        <Calendar className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                            type="date"
                            name="date"
                            required
                            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Time (IST)</label>
                    <input
                        type="time"
                        name="time"
                        required
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                        value={formData.time}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Location</label>
                <div className="relative">
                    <MapPin className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                        type="text"
                        name="location"
                        required
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                        placeholder="e.g. Pune, Maharashtra"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>

        {/* Description & Media */}
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-2">Description & Media</h2>
            
            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <div className="relative">
                    <AlignLeft className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
                    <textarea
                        name="description"
                        rows="4"
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                        placeholder="Tell people what your event is about..."
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Banner Image</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-400 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                </div>
            </div>
        </div>

        <div className="pt-4 flex justify-end gap-4">
            <Button variant="ghost" type="button">Cancel</Button>
            <Button type="submit" size="lg">Publish Event</Button>
        </div>
      </form>
    </div>
  );
};
