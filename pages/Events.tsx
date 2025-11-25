import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, Filter, MoreVertical, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const events = [
    {
        id: 1,
        title: "Starlight Music Festival",
        date: "Aug 15-17, 2024",
        status: "Upcoming",
        revenue: "$45,230",
        ticketsSold: 85,
        color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300"
    },
    {
        id: 2,
        title: "TechSummit 2024",
        date: "Jul 20, 2024",
        status: "Ongoing",
        revenue: "$125,980",
        ticketsSold: 92,
        color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300"
    },
    {
        id: 3,
        title: "Artisan Craft Fair",
        date: "Jun 05, 2024",
        status: "Past",
        revenue: "$8,650",
        ticketsSold: 100,
        color: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
    },
    {
        id: 4,
        title: "Innovate & Create Workshop",
        date: "Sep 01, 2024",
        status: "Upcoming",
        revenue: "$3,400",
        ticketsSold: 25,
        color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300"
    }
];

export const Events: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events Management</h1>
            <Button onClick={() => navigate('/events/create')}><Plus className="h-4 w-4 mr-2" /> Create New Event</Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="relative flex-1 min-w-[200px]">
                <input 
                    type="text" 
                    placeholder="Search events..." 
                    className="w-full pl-3 pr-10 py-2 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none"
                />
            </div>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden sm:block"></div>
            <div className="flex gap-2">
                <select className="bg-gray-50 dark:bg-gray-700 border-none text-sm rounded-md py-2 pl-3 pr-8 focus:ring-0">
                    <option>Status: Upcoming</option>
                    <option>Status: Past</option>
                    <option>Status: All</option>
                </select>
                <Button variant="ghost" size="sm" className="hidden sm:flex"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
                <Card key={event.id} className="relative group hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${event.color}`}>
                            {event.status}
                        </div>
                        <div className="flex gap-1">
                            <button 
                                onClick={() => navigate(`/event/${event.id}`)}
                                title="View Public Page"
                                className="p-1 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            >
                                <ExternalLink className="h-5 w-5" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <MoreVertical className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{event.title}</h3>
                    <p className="text-sm text-gray-500 mb-6">{event.date}</p>
                    
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">Ticket Sales</span>
                                <span className="font-medium text-gray-900 dark:text-white">{event.ticketsSold}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-primary-600 h-2 rounded-full" 
                                    style={{ width: `${event.ticketsSold}%` }}
                                ></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Revenue</div>
                            <div className="text-xl font-bold text-gray-900 dark:text-white">{event.revenue}</div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                        <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20">Manage</Button>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
};