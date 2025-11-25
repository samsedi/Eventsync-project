export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: 'organizer' | 'buyer';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  status: 'Upcoming' | 'Ongoing' | 'Past' | 'Draft' | 'Cancelled';
  revenue: number;
  ticketsSold: number;
  totalTickets: number;
  image?: string;
  category?: string;
  priceRange?: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  userId: string;
  holderName: string;
  type: string; // VIP, General
  price: number;
  status: 'valid' | 'used' | 'refunded';
  purchaseDate: string;
  qrCodeData: string;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  sold: number;
  capacity: number;
  color: string;
}

export interface AnalyticsData {
  name: string;
  value: number;
}

export interface NavItem {
  label: string;
  icon: any;
  path: string;
}