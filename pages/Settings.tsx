import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { User, Bell, Lock, CreditCard } from 'lucide-react';

export const Settings: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

      <Card>
        <div className="flex flex-col md:flex-row items-center gap-6">
           <img 
             src={currentUser?.photoURL || "https://ui-avatars.com/api/?name=User&background=random"} 
             className="h-24 w-24 rounded-full ring-4 ring-gray-50 dark:ring-gray-800"
             alt="Profile"
           />
           <div className="flex-1 text-center md:text-left">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white">{currentUser?.displayName}</h2>
             <p className="text-gray-500">{currentUser?.email}</p>
             <p className="text-sm text-primary-600 mt-1 capitalize">{currentUser?.role} Account</p>
           </div>
           <div className="flex gap-3">
              <Button variant="secondary">Remove</Button>
              <Button>Upload Image</Button>
           </div>
        </div>
      </Card>

      <div className="flex flex-col md:flex-row gap-6">
         {/* Sidebar Nav */}
         <div className="w-full md:w-64 space-y-1">
            <button className="w-full text-left px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-primary-600 font-medium shadow-sm">
                Profile
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Payment & Payouts
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Organizer Info
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Notifications
            </button>
         </div>

         {/* Form Area */}
         <div className="flex-1 space-y-6">
            <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                        <input type="text" defaultValue={currentUser?.displayName || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                        <input type="text" defaultValue="eleanor_v" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" />
                    </div>
                </div>
                <div className="mb-4">
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                     <input type="email" defaultValue={currentUser?.email || ''} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed" disabled />
                </div>
                 <div className="mb-4">
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                     <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" defaultValue="Innovating the future of event management, one seamless experience at a time." />
                </div>
            </Card>

            <Card>
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" />
                    </div>
                 </div>
            </Card>

            <div className="flex justify-end gap-3">
                <Button variant="ghost">Cancel</Button>
                <Button>Save Changes</Button>
            </div>
         </div>
      </div>
    </div>
  );
};