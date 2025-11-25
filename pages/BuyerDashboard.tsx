import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export const BuyerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { events } = useData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Events</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Discover trending events and secure your spot today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                    {event.category || 'Event'}
                </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center text-primary-600 text-sm font-medium mb-2">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    {event.date} • {event.time}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
                    {event.title}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1.5" />
                    {event.location}
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-6 flex-1">
                    {event.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-gray-900 dark:text-white font-bold">
                        {event.priceRange || '$50'}
                    </div>
                    <Button 
                        size="sm" 
                        onClick={() => navigate(`/event/${event.id}`)}
                        className="group-hover:translate-x-1 transition-transform"
                    >
                        Get Tickets <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};