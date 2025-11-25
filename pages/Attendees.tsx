import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Search, Filter, MoreHorizontal, CheckCircle } from 'lucide-react';

const attendees = [
    { id: 1, name: "Olivia Rhye", email: "olivia@email.com", ticket: "VIP Pass", status: "Checked-in", date: "Oct 24, 2024" },
    { id: 2, name: "Phoenix Baker", email: "phoenix@email.com", ticket: "General Admission", status: "Registered", date: "Oct 22, 2024" },
    { id: 3, name: "Lana Steiner", email: "lana@email.com", ticket: "General Admission", status: "Checked-in", date: "Oct 20, 2024" },
    { id: 4, name: "Demi Wilkinson", email: "demi@email.com", ticket: "Early Bird", status: "Registered", date: "Oct 19, 2024" },
    { id: 5, name: "Candice Wu", email: "candice@email.com", ticket: "VIP Pass", status: "Cancelled", date: "Oct 18, 2024" },
];

export const Attendees: React.FC = () => {
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Attendees</h1>
            <div className="flex gap-2">
                <Button variant="secondary">Export List</Button>
                <Button>Add Attendee</Button>
            </div>
        </div>

        <Card noPadding className="overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search by name, email, or ticket ID" 
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="secondary" size="sm" className="w-full sm:w-auto"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase text-gray-700 dark:text-gray-300">
                        <tr>
                            <th className="px-6 py-3 font-medium">Name</th>
                            <th className="px-6 py-3 font-medium">Ticket Type</th>
                            <th className="px-6 py-3 font-medium">Registration Date</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                        {attendees.map((person) => (
                            <tr key={person.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-700 dark:text-primary-300 font-bold mr-3">
                                            {person.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">{person.name}</div>
                                            <div className="text-xs text-gray-500">{person.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${
                                        person.ticket.includes('VIP') 
                                        ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800' 
                                        : 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'
                                    }`}>
                                        {person.ticket}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{person.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {person.status === 'Checked-in' && <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />}
                                        <span className={person.status === 'Checked-in' ? 'text-green-600' : ''}>{person.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-sm text-gray-500">
                <span>Showing 1-5 of 120 attendees</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Previous</button>
                    <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700">Next</button>
                </div>
            </div>
        </Card>
    </div>
  );
};