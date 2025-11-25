import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Mail, Share2, LayoutTemplate, Plus, Send } from 'lucide-react';

export const Marketing: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Marketing Tools</h1>
           <p className="text-gray-500 dark:text-gray-400">Create and manage your promotional activities all in one place.</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> New Campaign</Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button className="border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Email Campaigns
          </button>
          <button className="border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center">
            <Share2 className="h-4 w-4 mr-2" />
            Social Media
          </button>
          <button className="border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center">
            <LayoutTemplate className="h-4 w-4 mr-2" />
            Landing Page
          </button>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Campaign Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" placeholder="e.g. Early Bird Announcement" />
            </div>
             <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Subject</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" placeholder="Don't miss out on tickets!" />
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50">
               <span className="text-gray-400">WYSIWYG Editor Canvas</span>
            </div>

            <div className="mt-6 flex justify-between">
                <Button variant="secondary">Save Draft</Button>
                <div className="flex space-x-3">
                    <Button variant="secondary">Send Test</Button>
                    <Button>Schedule Campaign</Button>
                </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Templates */}
        <div className="space-y-6">
            <Card>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Templates</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div className="aspect-square bg-orange-100 dark:bg-orange-900/20 rounded-lg border-2 border-primary-500 cursor-pointer flex items-center justify-center relative overflow-hidden group">
                        <Mail className="h-8 w-8 text-orange-500" />
                        <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs font-medium">Select</div>
                    </div>
                    <div className="aspect-square bg-blue-100 dark:bg-blue-900/20 rounded-lg border border-transparent hover:border-gray-300 cursor-pointer flex items-center justify-center">
                        <LayoutTemplate className="h-8 w-8 text-blue-500" />
                    </div>
                </div>
            </Card>

             <Card>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Campaigns</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Announcement #1</div>
                            <div className="text-xs text-gray-500">Sent 2 days ago</div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-full">Sent</span>
                    </div>
                    <div className="flex items-center justify-between">
                         <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">Speaker Reveal</div>
                            <div className="text-xs text-gray-500">Scheduled for tomorrow</div>
                        </div>
                        <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 px-2 py-1 rounded-full">Scheduled</span>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};