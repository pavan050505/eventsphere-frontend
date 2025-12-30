import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { MainLayout } from './layouts/MainLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { BrowseEvents } from './pages/BrowseEvents';
import { EventDetails } from './pages/EventDetails';
import { CreateEvent } from './pages/CreateEvent';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <Routes>
          {/* Public Routes with Layout */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/events" element={<MainLayout><BrowseEvents /></MainLayout>} />
          <Route path="/events/:id" element={<MainLayout><EventDetails /></MainLayout>} />
          
          {/* Auth Routes (Standalone) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes with Layout */}
          <Route 
            path="/create-event" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <CreateEvent />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
        </Routes>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
