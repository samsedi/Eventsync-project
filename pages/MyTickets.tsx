import React, { useRef, useState } from 'react';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Calendar, MapPin, Ticket as TicketIcon, Clock, CheckCircle, Smartphone } from 'lucide-react';

const Ticket3D = ({ ticket, event }: { ticket: any, event: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-10 to 10 degrees)
    const xPct = (x / rect.width) - 0.5;
    const yPct = (y / rect.height) - 0.5;
    
    setRotate({ x: -yPct * 12, y: xPct * 12 });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  const bgImage = event?.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000';

  return (
    <div className="relative w-full max-w-4xl mx-auto my-12 perspective-container px-4">
        <style>{`
            .perspective-container {
                perspective: 1200px;
            }
        `}</style>
        <div 
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="relative w-full flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transition-transform duration-200 ease-out transform-gpu group"
            style={{ 
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` 
            }}
        >
            {/* 3D Thickness Effect (Right Edge) - Only visible when rotated left */}
            <div 
                className="absolute inset-y-0 -right-1 w-2 bg-gray-300 dark:bg-gray-900 origin-left skew-y-6 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block"
                style={{ transform: 'rotateY(90deg)' }}
            />

            {/* Left Side: Event Art & Info */}
            <div className="flex-1 relative overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none min-h-[240px]">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105" style={{ backgroundImage: `url(${bgImage})` }} />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-gray-900/40" />
                
                <div className="relative p-6 md:p-8 h-full flex flex-col justify-between text-white z-10 pointer-events-none">
                    <div>
                        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-500/20 text-primary-200 border border-primary-500/30 mb-4 backdrop-blur-sm">
                            {event?.category || 'Event Ticket'}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight drop-shadow-md">{event?.title || ticket.eventTitle}</h3>
                        <p className="text-gray-200 text-sm line-clamp-2 mb-4 drop-shadow">{event?.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center text-gray-100 font-medium">
                            <Calendar className="h-4 w-4 mr-2 text-primary-400" />
                            <span>{ticket.eventDate}</span>
                        </div>
                        <div className="flex items-center text-gray-100 font-medium">
                            <Clock className="h-4 w-4 mr-2 text-primary-400" />
                            <span>{event?.time || 'TBD'}</span>
                        </div>
                        <div className="flex items-center text-gray-200 col-span-2 mt-1">
                            <MapPin className="h-4 w-4 mr-2 text-primary-400" />
                            <span className="truncate">{ticket.eventLocation}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Perforation Line for Mobile (Horizontal) */}
            <div className="relative h-1 w-full bg-gray-100 dark:bg-gray-700 md:hidden flex items-center justify-between px-2 overflow-hidden">
                 <div className="w-5 h-5 bg-gray-50 dark:bg-gray-900 rounded-full -ml-3" />
                 <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-600 w-full" />
                 <div className="w-5 h-5 bg-gray-50 dark:bg-gray-900 rounded-full -mr-3" />
            </div>

            {/* Perforation Line for Desktop (Vertical) */}
            <div className="hidden md:flex flex-col items-center justify-between relative w-0 z-20">
                <div className="absolute top-0 -mt-3 w-6 h-6 bg-gray-50 dark:bg-gray-900 rounded-full shadow-inner" />
                <div className="h-full border-l-2 border-dashed border-gray-300 dark:border-gray-600 mx-auto opacity-50" />
                <div className="absolute bottom-0 -mb-3 w-6 h-6 bg-gray-50 dark:bg-gray-900 rounded-full shadow-inner" />
            </div>

            {/* Right Side: QR & Stub */}
            <div className="md:w-80 bg-white dark:bg-gray-800 p-6 md:p-8 flex flex-col items-center justify-center text-center rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none border-l-0 md:border-l border-gray-100 dark:border-gray-700 relative">
                {/* Holographic Strip hint */}
                <div className="absolute top-0 right-4 w-2 h-full bg-gradient-to-b from-transparent via-gray-100 dark:via-gray-700 to-transparent opacity-30"></div>
                
                <div className="mb-4 p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticket.id}`} 
                        alt="Ticket QR" 
                        className="w-32 h-32 md:w-36 md:h-36 object-contain pointer-events-none"
                    />
                </div>
                
                <div className="w-full space-y-3 relative z-10">
                    <div className="flex flex-col">
                         <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Ticket ID</span>
                        <code className="bg-gray-50 dark:bg-gray-900/50 px-3 py-1 rounded-md text-xs font-mono text-gray-500 dark:text-gray-400">
                            {ticket.id}
                        </code>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700 w-full">
                        <div className="flex justify-between items-center text-sm mb-1">
                            <span className="text-gray-500">Class</span>
                            <span className="font-bold text-gray-900 dark:text-white uppercase tracking-wide">{ticket.type}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Attendee</span>
                            <span className="font-medium text-gray-900 dark:text-white truncate max-w-[120px]">{ticket.holderName.split(' ')[0]}</span>
                        </div>
                    </div>
                </div>

                <div className={`mt-4 flex items-center text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    ticket.status === 'valid' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                    {ticket.status === 'valid' ? (
                        <><CheckCircle className="w-3 h-3 mr-1.5" /> Valid for Entry</>
                    ) : (
                        <><Smartphone className="w-3 h-3 mr-1.5" /> Already Scanned</>
                    )}
                </div>
            </div>

            {/* Glare Overlay */}
            <div 
                className="absolute inset-0 pointer-events-none rounded-2xl z-30 mix-blend-overlay md:rounded-r-2xl"
                style={{
                    background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`,
                    opacity: glare.opacity,
                    transition: 'opacity 0.2s ease-out'
                }}
            />
        </div>
    </div>
  );
};

export const MyTickets: React.FC = () => {
  const { currentUser } = useAuth();
  const { getTicketsByUser, events } = useData();

  if (!currentUser) return null;

  const tickets = getTicketsByUser(currentUser.uid);

  return (
    <div className="space-y-6 pb-20">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Tickets</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your event access. Hover over tickets to interact.</p>
        </div>
        <div className="text-sm text-gray-500 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-800">
             Show these QR codes at the event entrance
        </div>
      </div>

      {tickets.length === 0 ? (
        <Card className="text-center py-16 mt-8">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <TicketIcon className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No tickets yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                You haven't purchased any tickets yet. Explore upcoming events to get started.
            </p>
        </Card>
      ) : (
        <div className="flex flex-col items-center">
            {tickets.map((ticket) => {
                const event = events.find(e => e.id === ticket.eventId);
                return <Ticket3D key={ticket.id} ticket={ticket} event={event} />;
            })}
        </div>
      )}
    </div>
  );
};