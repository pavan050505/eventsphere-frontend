import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';
import logo from '../img/logo.png';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="mb-4 block">
              <img src={logo} alt="EventSphere" className="h-32 w-auto" />
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              The all-in-one platform to discover, manage, and host amazing events. Connect with communities and create memories.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Linkedin} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link to="/events" className="hover:text-blue-600 transition-colors">Browse Events</Link></li>
              <li><Link to="/create-event" className="hover:text-blue-600 transition-colors">Create Event</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Features</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Community</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Partners</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-blue-600 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © 2024 EventSphere. All rights reserved.
          </p>
          <p className="text-sm text-slate-400 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
};

// eslint-disable-next-line no-unused-vars
const SocialIcon = ({ icon: IconComponent }) => (
  <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all">
    <IconComponent className="w-4 h-4" />
  </a>
);
