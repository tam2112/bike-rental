import { create } from 'zustand';
import {
    getBookingById,
    getBookings,
    getUpcomingTrips,
    getCustomerBookings,
    getUserBookings,
    getUserSpending,
    getUserBookingCount,
} from '@/lib/actions/booking.action';
import { BookingType } from '@/types/booking';

type BookingStore = {
    bookings: BookingType[] | null;
    booking: BookingType | null;
    customerBookings: BookingType[] | null;
    upcomingTrips: BookingType[] | null;
    userBookings: BookingType[] | null;
    userSpending: number;
    userBookingCount: number;
    isLoading: boolean;
    fetchBookings: () => Promise<void>;
    fetchBooking: (id: string) => Promise<void>;
    fetchCustomerBookings: () => Promise<void>;
    fetchUpcomingTrips: () => Promise<void>;
    fetchUserBookings: (userId: string) => Promise<void>;
    fetchUserSpending: (userId: string) => Promise<void>;
    fetchUserBookingCount: (userId: string) => Promise<void>;
};

export const useBookingStore = create<BookingStore>((set) => ({
    bookings: [],
    isLoading: false,
    fetchBookings: async () => {
        set({ isLoading: true });
        try {
            const data = await getBookings();
            set({ bookings: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching bookings:', error);
            set({ isLoading: false });
        }
    },
    booking: null,
    fetchBooking: async (id: string) => {
        set({ isLoading: true });
        try {
            const data = await getBookingById(id);
            set({ booking: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching booking:', error);
            set({ isLoading: false });
        }
    },
    customerBookings: [],
    fetchCustomerBookings: async () => {
        set({ isLoading: true });
        try {
            const data = await getCustomerBookings();
            set({ customerBookings: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching customerBookings:', error);
            set({ isLoading: false });
        }
    },
    upcomingTrips: [],
    fetchUpcomingTrips: async () => {
        set({ isLoading: true });
        try {
            const data = await getUpcomingTrips();
            set({ upcomingTrips: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching upcomingTrips:', error);
            set({ isLoading: false });
        }
    },
    userBookings: [],
    fetchUserBookings: async (userId: string) => {
        set({ isLoading: true });
        try {
            const data = await getUserBookings(userId);
            set({ userBookings: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching userBookings:', error);
            set({ isLoading: false });
        }
    },
    userSpending: 0,
    fetchUserSpending: async (userId: string) => {
        try {
            const data = await getUserSpending(userId);
            set({ userSpending: data });
        } catch (error) {
            console.error('Error fetching userSpending:', error);
        }
    },
    userBookingCount: 0,
    fetchUserBookingCount: async (userId: string) => {
        try {
            const data = await getUserBookingCount(userId);
            set({ userBookingCount: data });
        } catch (error) {
            console.error('Error fetching userBookingCount:', error);
        }
    },
}));
