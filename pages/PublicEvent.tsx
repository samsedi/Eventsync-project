import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, Calendar, MapPin, Clock, Share2, ArrowLeft, Check, CreditCard, Lock, User, Mail } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Event } from '../types';

export const PublicEvent: React.FC = () => {
  const { id } = useParams();
  const { events, addTicket } = useData();
  const { currentUser } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({});
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Find event from DataContext
    const foundEvent = events.find(e => e.id === id);
    if (foundEvent) {
        setEvent(foundEvent);
    }
  }, [id, events]);

  // Derived tickets based on event (Mock data structure enhancement)
  const ticketTypes = [
      { id: 'gen', name: 'General Admission', price: 50, description: 'Access to main areas.' },
      { id: 'vip', name: 'VIP Access', price: 150, description: 'Priority seating & VIP lounge.' },
  ];

  const updateQuantity = (ticketId: string, delta: number) => {
    setSelectedTickets(prev => {
      const current = prev[ticketId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [ticketId]: next };
    });
  };

  const totalAmount = ticketTypes.reduce((sum, ticket) => {
    return sum + (ticket.price * (selectedTickets[ticket.id] || 0));
  }, 0);

  const totalItems = Object.values(selectedTickets).reduce((a, b) => a + b, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    setLoading(true);

    try {
        // Create tickets for each type selected
        for (const [typeId, qty] of Object.entries(selectedTickets)) {
            const typeDef = ticketTypes.find(t => t.id === typeId);
            if (!typeDef) continue;

            for (let i = 0; i < qty; i++) {
                await addTicket({
                    eventId: event.id,
                    eventTitle: event.title,
                    eventDate: event.date,
                    eventLocation: event.location,
                    userId: currentUser?.uid || 'guest',
                    holderName: currentUser?.displayName || 'Guest User',
                    type: typeDef.name,
                    price: typeDef.price
                });
            }
        }
        
        setIsSuccess(true);
    } catch (error) {
        console.error("Purchase failed", error);
    } finally {
        setLoading(false);
    }
  };

  if (!event) return <div className="p-8 text-center">Loading event...</div>;

  if (isSuccess) {
      return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
              <Card className="max-w-md w-full text-center p-8">
                  <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                      <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You're going!</h2>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                      Your tickets for <strong>{event.title}</strong> have been confirmed. You can view them in the "My Tickets" section.
                  </p>
                  <div className="space-y-3">
                    <Link to="/my-tickets">
                        <Button className="w-full">View My Tickets</Button>
                    </Link>
                    <Link to="/browse">
                        <Button variant="secondary" className="w-full">Browse More Events</Button>
                    </Link>
                  </div>
              </Card>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Sparkles className="h-6 w-6 text-primary-600 mr-2" />
            <span className="font-bold text-gray-900 dark:text-white text-lg">EventSync</span>
          </Link>
          {!currentUser && (
            <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
            </Link>
          )}
          {currentUser && (
             <Link to={currentUser.role === 'buyer' ? '/browse' : '/dashboard'}>
                <Button variant="ghost" size="sm">Back to Dashboard</Button>
             </Link>
          )}
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="relative h-64 md:h-96 w-full bg-gray-900">
        <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <span className="inline-block px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-semibold mb-4">
                    {event.category || 'Event'}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-gray-200 text-sm md:text-base">
                    <div className="flex items-center"><Calendar className="h-5 w-5 mr-2 text-primary-400" /> {event.date}</div>
                    <div className="flex items-center"><Clock className="h-5 w-5 mr-2 text-primary-400" /> {event.time || 'TBD'}</div>
                    <div className="flex items-center"><MapPin className="h-5 w-5 mr-2 text-primary-400" /> {event.location}</div>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About the Event</h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {event.description}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Agenda Highlights</h2>
                    <div className="space-y-6">
                        {[
                            { time: "Start", title: "Welcome & Check-in", speaker: "Event Team" },
                            { time: "+1 hr", title: "Main Keynote", speaker: "Guest Speaker" },
                            { time: "End", title: "Networking & Closing", speaker: "All Attendees" }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-6 group">
                                <div className="w-24 flex-shrink-0 text-sm font-semibold text-gray-500 pt-1">{item.time}</div>
                                <div className="pb-6 border-b border-gray-100 dark:border-gray-800 flex-1 group-last:border-0">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</h3>
                                    <p className="text-primary-600 dark:text-primary-400 text-sm mt-1">{item.speaker}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Right Sidebar - Tickets */}
            <div className="lg:col-span-1">
                <div className="sticky top-24">
                    <Card className="shadow-lg border-primary-100 dark:border-primary-900/50">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Get Tickets</h3>
                            <p className="text-sm text-gray-500">Sales end soon</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            {ticketTypes.map(ticket => (
                                <div key={ticket.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                    <div className="flex justify-between mb-2">
                                        <div className="font-semibold text-gray-900 dark:text-white">{ticket.name}</div>
                                        <div className="font-bold text-primary-600">${ticket.price}</div>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4">{ticket.description}</p>
                                    <div className="flex items-center justify-end gap-3">
                                        <button 
                                            onClick={() => updateQuantity(ticket.id, -1)}
                                            className="h-8 w-8 rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-primary-500 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-4 text-center text-sm font-medium text-gray-900 dark:text-white">
                                            {selectedTickets[ticket.id] || 0}
                                        </span>
                                        <button 
                                            onClick={() => updateQuantity(ticket.id, 1)}
                                            className="h-8 w-8 rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:border-primary-500 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-lg font-medium text-gray-900 dark:text-white">Total</span>
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">${totalAmount}</span>
                            </div>
                            <Button 
                                className="w-full py-3 text-lg" 
                                disabled={totalItems === 0}
                                onClick={() => setIsCheckoutOpen(true)}
                            >
                                Checkout ({totalItems})
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
                onClick={() => setIsCheckoutOpen(false)}
              />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
                  <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Checkout</h3>
                      <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-400 hover:text-gray-600">×</button>
                  </div>
                  
                  <div className="p-6 overflow-y-auto">
                      <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
                          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg mb-6">
                              <div className="flex justify-between text-sm mb-2">
                                  <span className="text-gray-500">Event</span>
                                  <span className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">{event.title}</span>
                              </div>
                              <div className="flex justify-between text-sm mb-2">
                                  <span className="text-gray-500">Tickets</span>
                                  <span className="font-medium text-gray-900 dark:text-white">{totalItems}x</span>
                              </div>
                              <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                                  <span className="text-gray-900 dark:text-white">Total</span>
                                  <span className="text-primary-600">${totalAmount}</span>
                              </div>
                          </div>

                          <div className="space-y-4">
                              <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                                  <User className="h-4 w-4 mr-2" /> Contact Information
                              </h4>
                              <div className="grid grid-cols-2 gap-4">
                                  <input type="text" required placeholder="First Name" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" defaultValue={currentUser?.displayName?.split(' ')[0]} />
                                  <input type="text" required placeholder="Last Name" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" />
                              </div>
                              <input type="email" required placeholder="Email Address" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" defaultValue={currentUser?.email || ''} />
                          </div>

                          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                               <h4 className="font-medium text-gray-900 dark:text-white flex items-center">
                                  <CreditCard className="h-4 w-4 mr-2" /> Payment Details
                              </h4>
                              <div className="relative">
                                  <input type="text" required placeholder="Card Number" className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" />
                                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                  <input type="text" required placeholder="MM/YY" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" />
                                  <input type="text" required placeholder="CVC" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent dark:text-white focus:ring-primary-500 focus:outline-none" />
                              </div>
                          </div>
                      </form>
                  </div>

                  <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-2xl">
                      <Button form="checkout-form" type="submit" className="w-full" isLoading={loading}>
                          Pay ${totalAmount}
                      </Button>
                      <p className="text-xs text-center text-gray-500 mt-3 flex items-center justify-center">
                          <Lock className="h-3 w-3 mr-1" /> Secure Payment Processing
                      </p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};