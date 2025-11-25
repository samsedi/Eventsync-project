import React, { createContext, useContext, useState, useEffect } from 'react';
import { Event, Ticket } from '../types';

interface DataContextType {
  events: Event[];
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, 'id' | 'status' | 'purchaseDate' | 'qrCodeData'>) => Promise<string>;
  validateTicket: (ticketId: string) => { valid: boolean; message: string; ticket?: Ticket };
  getTicketsByUser: (userId: string) => Ticket[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const INITIAL_EVENTS: Event[] = [
  {
      id: '1',
      title: "Starlight Music Festival",
      date: "Aug 15-17, 2024",
      time: "12:00 PM",
      location: "Central Park, NY",
      description: "A three-day musical extravaganza featuring top artists from around the globe.",
      status: "Upcoming",
      revenue: 45230,
      ticketsSold: 85,
      totalTickets: 500,
      image: "https://images.unsplash.com/photo-1459749411177-0473ef716175?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Music",
      priceRange: "$50 - $150"
  },
  {
      id: '2',
      title: "Annual Tech Summit 2024",
      date: "Oct 26, 2024",
      time: "9:00 AM",
      location: "Moscone Center, CA",
      description: "Join over 5,000 developers, designers, and innovators for the biggest tech conference of the year.",
      status: "Upcoming",
      revenue: 125980,
      ticketsSold: 92,
      totalTickets: 2000,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Technology",
      priceRange: "$299 - $599"
  },
  {
      id: '3',
      title: "Artisan Craft Fair",
      date: "Jun 05, 2024",
      time: "10:00 AM",
      location: "Portland, OR",
      status: "Past",
      revenue: 8650,
      ticketsSold: 100,
      totalTickets: 100,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Lifestyle",
      priceRange: "$15"
  },
  {
      id: '4',
      title: "Innovate & Create Workshop",
      date: "Sep 01, 2024",
      time: "2:00 PM",
      location: "Austin, TX",
      status: "Upcoming",
      revenue: 3400,
      ticketsSold: 25,
      totalTickets: 50,
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "Education",
      priceRange: "$120"
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with some data, persist to localStorage in a real app or just memory here
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Load from local storage on mount to persist across reloads
  useEffect(() => {
    const storedTickets = localStorage.getItem('es_tickets');
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets));
    }
  }, []);

  // Save to local storage whenever tickets change
  useEffect(() => {
    localStorage.setItem('es_tickets', JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = async (ticketData: Omit<Ticket, 'id' | 'status' | 'purchaseDate' | 'qrCodeData'>): Promise<string> => {
    const newId = 'TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const newTicket: Ticket = {
      ...ticketData,
      id: newId,
      status: 'valid',
      purchaseDate: new Date().toISOString(),
      qrCodeData: newId // In reality this might be a signed JWT
    };
    
    setTickets(prev => [...prev, newTicket]);
    
    // Update event stats (mocking db update)
    setEvents(prev => prev.map(e => {
        if (e.id === ticketData.eventId) {
            return { ...e, ticketsSold: e.ticketsSold + 1, revenue: e.revenue + ticketData.price };
        }
        return e;
    }));

    return newId;
  };

  const validateTicket = (ticketId: string): { valid: boolean; message: string; ticket?: Ticket } => {
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);
    
    if (ticketIndex === -1) {
      return { valid: false, message: 'Ticket not found.' };
    }

    const ticket = tickets[ticketIndex];

    if (ticket.status === 'used') {
      return { valid: false, message: 'Ticket has already been used.', ticket };
    }

    if (ticket.status === 'refunded') {
      return { valid: false, message: 'Ticket was refunded/cancelled.', ticket };
    }

    // Mark as used
    const updatedTickets = [...tickets];
    updatedTickets[ticketIndex] = { ...ticket, status: 'used' };
    setTickets(updatedTickets);

    return { valid: true, message: 'Check-in successful!', ticket: updatedTickets[ticketIndex] };
  };

  const getTicketsByUser = (userId: string) => {
    return tickets.filter(t => t.userId === userId);
  };

  return (
    <DataContext.Provider value={{ events, tickets, addTicket, validateTicket, getTicketsByUser }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};