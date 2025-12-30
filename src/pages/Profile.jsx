import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/Button';
import { User, Mail, MapPin, AlignLeft, Camera, Check } from 'lucide-react';

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    city: user?.city || '',
    bio: user?.bio || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-slate-500 mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar / Avatar Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-lg mx-auto overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-slate-400">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors shadow-md">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <h2 className="text-xl font-bold text-slate-900">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-slate-500 text-sm mb-4">{user?.email}</p>
            
            <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold inline-block">
              Member
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Personal Information
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
                <Input
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>

              <div className="relative">
                <Input
                  label="Email Address"
                  value={user?.email}
                  disabled
                  className="opacity-75"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-[34px]" />
              </div>

              <div className="relative">
                 <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai"
                 />
                 <MapPin className="w-4 h-4 text-slate-400 absolute right-3 top-[34px]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
                <div className="relative">
                    <textarea
                        name="bio"
                        rows="4"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="Tell us a little about yourself..."
                        value={formData.bio}
                        onChange={handleChange}
                    ></textarea>
                    <AlignLeft className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              {success && (
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium animate-in fade-in">
                    <Check className="w-4 h-4" /> Changes saved successfully
                </div>
              )}
              <Button type="submit" disabled={loading} className="ml-auto min-w-[120px]">
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
