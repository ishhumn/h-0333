export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  message: string;
  date: string;
}

export type InquiryStatus = 'New' | 'In Progress' | 'Pending' | 'Done';

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  message: string;
  date: string;
  status: InquiryStatus;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface EventRegistration {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventName: string;
  numberOfTickets: string;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
}

const STORAGE_KEYS = {
  PRODUCTS: 'products',
  GALLERY: 'gallery',
  BLOG_POSTS: 'blogPosts',
  TESTIMONIALS: 'testimonials',
  INQUIRIES: 'contactInquiries',
  EVENTS: 'events',
  EVENT_REGISTRATIONS: 'eventRegistrations'
};

export const getStorageItem = <T>(key: string): T[] => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : [];
};

export const setStorageItem = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getProducts = (): Product[] => getStorageItem(STORAGE_KEYS.PRODUCTS);
export const setProducts = (products: Product[]) => setStorageItem(STORAGE_KEYS.PRODUCTS, products);

export const getGalleryItems = (): GalleryItem[] => getStorageItem(STORAGE_KEYS.GALLERY);
export const setGalleryItems = (items: GalleryItem[]) => setStorageItem(STORAGE_KEYS.GALLERY, items);

export const getBlogPosts = (): BlogPost[] => getStorageItem(STORAGE_KEYS.BLOG_POSTS);
export const setBlogPosts = (posts: BlogPost[]) => setStorageItem(STORAGE_KEYS.BLOG_POSTS, posts);

export const getTestimonials = (): Testimonial[] => getStorageItem(STORAGE_KEYS.TESTIMONIALS);
export const setTestimonials = (testimonials: Testimonial[]) => setStorageItem(STORAGE_KEYS.TESTIMONIALS, testimonials);

export const getInquiries = (): ContactInquiry[] => getStorageItem(STORAGE_KEYS.INQUIRIES);
export const setInquiries = (inquiries: ContactInquiry[]) => setStorageItem(STORAGE_KEYS.INQUIRIES, inquiries);

export const getEvents = (): Event[] => getStorageItem(STORAGE_KEYS.EVENTS);
export const setEvents = (events: Event[]) => setStorageItem(STORAGE_KEYS.EVENTS, events);

export const getEventRegistrations = (): EventRegistration[] => getStorageItem(STORAGE_KEYS.EVENT_REGISTRATIONS);
export const setEventRegistrations = (registrations: EventRegistration[]) => setStorageItem(STORAGE_KEYS.EVENT_REGISTRATIONS, registrations);
