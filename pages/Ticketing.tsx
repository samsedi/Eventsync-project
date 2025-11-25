import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Ticket, Plus, QrCode, Download, Edit2, ScanLine, Camera, XCircle, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const tickets = [
  { id: 1, name: "General Admission", price: 50.00, sold: 350, capacity: 500, color: "bg-blue-600" },
  { id: 2, name: "VIP Pass", price: 150.00, sold: 90, capacity: 200, color: "bg-purple-600" },
  { id: 3, name: "Early Bird Special", price: 35.00, sold: 100, capacity: 100, color: "bg-green-600", status: "Sold Out" },
];

export const Ticketing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'types' | 'scan'>('types');
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState<{valid: boolean; message: string} | null>(null);
  
  const { validateTicket } = useData();

  const handleScan = (e: React.FormEvent) => {
      e.preventDefault();
      if (!scanInput) return;
      
      const result = validateTicket(scanInput);
      setScanResult(result);
      setScanInput(''); // Clear input for next scan but keep result visible
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Event Ticketing</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage ticket types, check-in attendees, and export data.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> Create Ticket</Button>
      </div>

      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button 
            onClick={() => setActiveTab('types')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'types' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
        >
            Ticket Types
        </button>
        <button 
            onClick={() => setActiveTab('scan')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center ${activeTab === 'scan' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
        >
            <ScanLine className="h-4 w-4 mr-2" />
            Scan & Check-in
        </button>
      </div>

      {activeTab === 'types' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tickets.map((ticket) => (
                <Card key={ticket.id} className="relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{ticket.name}</h3>
                        <p className="text-gray-500">Price: ${ticket.price.toFixed(2)}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                            <Edit2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                            <QrCode className="h-4 w-4" />
                        </button>
                    </div>
                    </div>

                    <div className="space-y-2 mb-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{ticket.sold} / {ticket.capacity} Sold</span>
                        {ticket.sold === ticket.capacity && (
                            <span className="text-green-600 dark:text-green-400 font-medium">Sold Out</span>
                        )}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                            className={`${ticket.color} h-2.5 rounded-full`} 
                            style={{ width: `${(ticket.sold / ticket.capacity) * 100}%` }}
                        ></div>
                    </div>
                    </div>
                </Card>
                ))}
            </div>

            <Card className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Export</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button variant="secondary" className="justify-between">
                        Export Sales Report
                        <Download className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="secondary" className="justify-between">
                        Export Attendee List
                        <Download className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="secondary" className="justify-between">
                        Export Check-in Data
                        <Download className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            </Card>
          </>
      ) : (
          <div className="max-w-xl mx-auto">
             <Card className="p-6">
                <div className="text-center mb-6">
                    <div className="mx-auto h-16 w-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                        <Camera className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Scan Ticket QR</h2>
                    <p className="text-gray-500 text-sm">Use your camera or enter the Ticket ID manually below.</p>
                </div>

                {/* Mock Camera Viewfinder */}
                <div className="aspect-video bg-gray-900 rounded-lg mb-6 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-primary-500/50 m-8 rounded-lg animate-pulse"></div>
                    <span className="text-gray-400 text-sm">Camera Feed Simulation</span>
                </div>

                <form onSubmit={handleScan} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Manual Entry</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={scanInput}
                                onChange={(e) => setScanInput(e.target.value)}
                                placeholder="Enter Ticket ID (e.g. TKT-X82...)" 
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none" 
                            />
                            <Button type="submit">Check-in</Button>
                        </div>
                    </div>
                </form>

                {scanResult && (
                    <div className={`mt-6 p-4 rounded-lg flex items-center ${scanResult.valid ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'}`}>
                        {scanResult.valid ? (
                            <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                        ) : (
                            <XCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                        )}
                        <div>
                            <div className="font-bold">{scanResult.valid ? 'Valid Ticket' : 'Invalid Ticket'}</div>
                            <div className="text-sm opacity-90">{scanResult.message}</div>
                        </div>
                    </div>
                )}
             </Card>
          </div>
      )}
    </div>
  );
};