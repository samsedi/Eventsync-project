import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const ticketData = [
  { name: 'Week 1', vip: 400, general: 2400 },
  { name: 'Week 2', vip: 300, general: 1398 },
  { name: 'Week 3', vip: 200, general: 9800 },
  { name: 'Week 4', vip: 278, general: 3908 },
  { name: 'Week 5', vip: 189, general: 4800 },
];

const conversionData = [
    { name: 'Mon', value: 2.1 },
    { name: 'Tue', value: 3.4 },
    { name: 'Wed', value: 2.8 },
    { name: 'Thu', value: 4.5 },
    { name: 'Fri', value: 5.8 },
    { name: 'Sat', value: 6.2 },
    { name: 'Sun', value: 5.9 },
];

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Event Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400">Detailed insights for 'Annual Tech Summit'</p>
        </div>
        <div className="flex space-x-2">
            <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm px-3 py-2 text-gray-700 dark:text-gray-200 focus:outline-none">
                <option>Annual Tech Summit</option>
                <option>Design Forward 2024</option>
            </select>
            <Button variant="secondary"><Download className="h-4 w-4 mr-2" /> Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card>
            <div className="text-gray-500 text-sm mb-1">Page Visits</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">12,450</div>
            <div className="text-green-500 text-sm mt-1">↑ +12.5%</div>
         </Card>
         <Card>
            <div className="text-gray-500 text-sm mb-1">Conversion Rate</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">5.8%</div>
            <div className="text-red-500 text-sm mt-1">↓ -1.2%</div>
         </Card>
         <Card>
            <div className="text-gray-500 text-sm mb-1">CTR</div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">2.1%</div>
            <div className="text-green-500 text-sm mt-1">↑ +0.8%</div>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-96">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Revenue by Ticket Type</h3>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={ticketData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" tick={{fill: '#9CA3AF'}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: '#9CA3AF'}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                    <Legend />
                    <Bar dataKey="vip" fill="#8b5cf6" name="VIP Pass" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="general" fill="#6366f1" name="General Admission" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </Card>

        <Card className="h-96">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Conversion Trend (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={conversionData}>
                    <defs>
                        <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} opacity={0.3} />
                    <XAxis dataKey="name" tick={{fill: '#9CA3AF'}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: '#9CA3AF'}} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                    <Area type="monotone" dataKey="value" stroke="#10B981" fillOpacity={1} fill="url(#colorConv)" strokeWidth={3} />
                </AreaChart>
            </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Attendance Demographics</h3>
        <div className="space-y-4">
             <DemoBar country="USA" percent={65} color="bg-blue-600" />
             <DemoBar country="Canada" percent={15} color="bg-purple-600" />
             <DemoBar country="UK" percent={12} color="bg-indigo-600" />
             <DemoBar country="Germany" percent={5} color="bg-pink-600" />
             <DemoBar country="Japan" percent={3} color="bg-orange-600" />
        </div>
      </Card>
    </div>
  );
};

const DemoBar: React.FC<{ country: string, percent: number, color: string }> = ({ country, percent, color }) => (
    <div className="flex items-center">
        <span className="w-20 text-sm text-gray-500 dark:text-gray-400">{country}</span>
        <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mx-3">
            <div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div>
        </div>
        <span className="w-12 text-sm text-right font-medium text-gray-900 dark:text-white">{percent}%</span>
    </div>
);