import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 5000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 6390 },
  { name: 'Sun', value: 8490 },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Alex!</h1>
          <p className="text-gray-500 dark:text-gray-400">Here's a summary of your event activities.</p>
        </div>
        <div className="flex space-x-3">
            <Button variant="secondary" onClick={() => navigate('/ticketing')}>Manage Tickets</Button>
            <Button onClick={() => navigate('/events/create')}><Plus className="h-4 w-4 mr-2" /> Create New Event</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Events" 
          value="12" 
          trend="+5.2%" 
          trendUp={true} 
        />
        <StatsCard 
          label="Tickets Sold" 
          value="8,456" 
          trend="+12.1%" 
          trendUp={true} 
        />
        <StatsCard 
          label="Revenue Generated" 
          value="$125,980" 
          trend="+8.9%" 
          trendUp={true} 
        />
        <StatsCard 
          label="Upcoming Events" 
          value="3" 
          subLabel="Next: TechSummit 2024"
        />
      </div>

      {/* Chart & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card className="h-full">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ticket Sales Trend</h3>
                        <p className="text-sm text-gray-500">As of today</p>
                    </div>
                    <select className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2">
                        <option>Last 30 Days</option>
                        <option>Last 7 Days</option>
                    </select>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#1F2937', 
                                border: 'none', 
                                borderRadius: '8px', 
                                color: '#fff' 
                              }} 
                              itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                    <EventListItem title="Annual Tech Summit" date="Oct 26, 2024" status="Published" />
                    <EventListItem title="Design Forward 2024" date="Nov 15, 2024" status="Draft" />
                    <EventListItem title="Music Fest Midwest" date="Dec 01, 2024" status="Cancelled" />
                </div>
                <Button variant="ghost" className="w-full mt-4 text-primary-600">View All Events</Button>
            </Card>
        </div>
      </div>
    </div>
  );
};

const StatsCard: React.FC<{ label: string, value: string, trend?: string, trendUp?: boolean, subLabel?: string }> = ({ label, value, trend, trendUp, subLabel }) => (
    <Card>
        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">{label}</div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
        {trend && (
            <div className={`flex items-center text-sm ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
                {trendUp ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                {trend}
            </div>
        )}
        {subLabel && <div className="text-sm text-gray-400">{subLabel}</div>}
    </Card>
);

const EventListItem: React.FC<{ title: string, date: string, status: string }> = ({ title, date, status }) => {
    const statusColors: any = {
        Published: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        Draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
        Cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };

    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <div className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mr-3">
                    <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">{title}</div>
                    <div className="text-xs text-gray-500">{date}</div>
                </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>{status}</span>
        </div>
    );
};
