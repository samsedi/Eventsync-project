import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Ticket, BarChart3, Megaphone, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export const Landing: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">EventSync</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Features</a>
              <a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Pricing</a>
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">About</a>
            </div>
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <Link to={currentUser.role === 'buyer' ? '/browse' : '/dashboard'}>
                  <Button variant="primary" size="md">Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 dark:text-gray-200 font-medium hover:text-primary-600">Log In</Link>
                  <Link to="/signup">
                    <Button variant="primary" size="md">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center pt-10 pb-20">
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full bg-gradient-to-b from-primary-50 to-white dark:from-gray-800 dark:to-gray-900 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            Everything You Need to Run a <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Successful Event</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300 mb-10">
            From seamless ticketing to powerful analytics, EventSync simplifies every step of your event management journey.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {currentUser ? (
               <Link to={currentUser.role === 'buyer' ? '/browse' : '/dashboard'}>
                  <Button size="lg" className="w-full sm:w-auto px-8">Continue to Dashboard</Button>
               </Link>
            ) : (
               <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto px-8">Get Started for Free</Button>
               </Link>
            )}
            <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8">Watch a Demo</Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-gray-50 dark:bg-gray-800" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Ticket className="h-6 w-6 text-primary-600" />}
              title="Smart Ticketing"
              desc="Create customizable ticket types, early-bird pricing, and secure online payments."
            />
            <FeatureCard 
              icon={<BarChart3 className="h-6 w-6 text-primary-600" />}
              title="Attendee Analytics"
              desc="Track sales, demographics, and engagement with our real-time dashboard."
            />
            <FeatureCard 
              icon={<Megaphone className="h-6 w-6 text-primary-600" />}
              title="Event Promotion"
              desc="Utilize built-in marketing tools, email campaigns, and social media integrations."
            />
             <FeatureCard 
              icon={<Calendar className="h-6 w-6 text-primary-600" />}
              title="Agenda Management"
              desc="Easily build and manage event schedules, sessions, and speaker profiles."
            />
          </div>
          <div className="mt-16 text-center">
            <Button variant="primary" size="lg">Explore All Features</Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 dark:text-gray-400">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="#" className="hover:text-primary-600">Features</a>
            <a href="#" className="hover:text-primary-600">Pricing</a>
            <a href="#" className="hover:text-primary-600">Terms</a>
            <a href="#" className="hover:text-primary-600">Privacy</a>
          </div>
          <p>© 2025 EventSync. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div className="h-12 w-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
  </div>
);