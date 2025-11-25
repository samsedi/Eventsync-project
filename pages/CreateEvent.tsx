import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, MapPin, Type, Image as ImageIcon, DollarSign, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const steps = [
    { number: 1, title: 'Event Details', icon: Type },
    { number: 2, title: 'Date & Location', icon: Calendar },
    { number: 3, title: 'Ticketing', icon: DollarSign },
    { number: 4, title: 'Review', icon: Check },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else navigate('/events');
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create New Event</h1>
        <p className="text-gray-500 dark:text-gray-400">Launch your next successful event in minutes.</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10" />
          {steps.map((s) => {
            const isActive = step >= s.number;
            const isCurrent = step === s.number;
            return (
              <div key={s.number} className="flex flex-col items-center bg-gray-50 dark:bg-gray-900 px-2">
                <div 
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
                    isActive ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <span className={`mt-2 text-xs font-medium ${isCurrent ? 'text-primary-600' : 'text-gray-500'}`}>
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Card>
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="e.g. Annual Tech Summit 2024" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none">
                <option>Technology</option>
                <option>Music</option>
                <option>Business</option>
                <option>Social</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="Describe your event..." />
            </div>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
              <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Click to upload event banner or drag and drop</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Date & Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                <input type="date" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time</label>
                <input type="time" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location Type</label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 p-3 border border-primary-500 bg-primary-50 dark:bg-primary-900/20 rounded-lg cursor-pointer">
                  <input type="radio" name="locationType" className="text-primary-600 focus:ring-primary-500" defaultChecked />
                  <span className="text-gray-900 dark:text-white font-medium">Venue</span>
                </label>
                <label className="flex items-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
                  <input type="radio" name="locationType" className="text-primary-600 focus:ring-primary-500" />
                  <span className="text-gray-900 dark:text-white font-medium">Online</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Venue Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input type="text" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none" placeholder="Search for a venue" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Ticket Types</h2>
              <Button size="sm" variant="outline"><DollarSign className="h-4 w-4 mr-1" /> Add Ticket Type</Button>
            </div>
            
            <div className="space-y-4">
              {['General Admission', 'VIP Access'].map((ticket, i) => (
                <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{ticket}</h3>
                    <p className="text-sm text-gray-500">Sales end 1 hour before event</p>
                  </div>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <div className="flex-1 sm:w-24">
                      <label className="text-xs text-gray-500">Price</label>
                      <input type="number" defaultValue={i === 0 ? 50 : 150} className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white" />
                    </div>
                    <div className="flex-1 sm:w-24">
                      <label className="text-xs text-gray-500">Quantity</label>
                      <input type="number" defaultValue={100} className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ready to Publish!</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
              Your event "Annual Tech Summit 2024" is ready to go live. You can still edit details later.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-w-md mx-auto text-left mb-8 border border-gray-100 dark:border-gray-700">
               <div className="flex justify-between mb-2">
                 <span className="text-gray-500">Date</span>
                 <span className="font-medium text-gray-900 dark:text-white">Oct 24, 2024</span>
               </div>
               <div className="flex justify-between mb-2">
                 <span className="text-gray-500">Venue</span>
                 <span className="font-medium text-gray-900 dark:text-white">Moscone Center</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-500">Tickets</span>
                 <span className="font-medium text-gray-900 dark:text-white">2 Types (200 Total)</span>
               </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
          <Button 
            variant="secondary" 
            onClick={handleBack} 
            disabled={step === 1}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {step === 4 ? 'Publish Event' : 'Next Step'}
          </Button>
        </div>
      </Card>
    </div>
  );
};