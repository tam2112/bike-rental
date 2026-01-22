import {
    getBookingCount,
    getBookingStatusCount,
    getCustomerCount,
    getMotorCount,
    getDashboardRevenue,
    getNewBookingsToday,
    getNewCustomersThisMonth,
} from '@/lib/actions/dashboard.action';
import { create } from 'zustand';

type DashboardStore = {
    revenue: number;
    revenueMonthTitle: string;
    revenueDescription: string;
    revenuePercent: string;
    bookingCount: number;
    newBookingsToday: number;
    motorCount: number;
    customerCount: number;
    newCustomersMonth: number;
    statusCount: { pending: number; confirmed: number; renting: number; finish: number; cancel: number };
    isLoadingDashboard: boolean;
    fetchRevenue: () => Promise<void>;
    fetchBookingCount: () => Promise<void>;
    fetchNewBookingsToday: () => Promise<void>;
    fetchMotorCount: () => Promise<void>;
    fetchCustomerCount: () => Promise<void>;
    fetchNewCustomersMonth: () => Promise<void>;
    fetchStatusCount: () => Promise<void>;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
    revenue: 0,
    revenueMonthTitle: '',
    revenueDescription: '',
    revenuePercent: '0',
    isLoadingDashboard: false,
    fetchRevenue: async () => {
        set({ isLoadingDashboard: true });
        try {
            const data = await getDashboardRevenue();
            set({
                revenue: data.revenue,
                revenueMonthTitle: data.monthTitle,
                revenueDescription: data.description,
                revenuePercent: data.percent,
                isLoadingDashboard: false,
            });
        } catch (error) {
            console.error('Error fetching revenue:', error);
            set({ isLoadingDashboard: false });
        }
    },
    bookingCount: 0,
    fetchBookingCount: async () => {
        set({ isLoadingDashboard: true });
        try {
            const data = await getBookingCount();
            set({ bookingCount: data, isLoadingDashboard: false });
        } catch (error) {
            console.error('Error fetching bookingCount:', error);
            set({ isLoadingDashboard: false });
        }
    },
    newBookingsToday: 0,
    fetchNewBookingsToday: async () => {
        set({ isLoadingDashboard: true });
        try {
            const data = await getNewBookingsToday();
            set({ newBookingsToday: data, isLoadingDashboard: false });
        } catch (error) {
            console.error('Error fetching new bookings today:', error);
            set({ isLoadingDashboard: false });
        }
    },
    motorCount: 0,
    fetchMotorCount: async () => {
        set({ isLoadingDashboard: true });
        try {
            const data = await getMotorCount();
            set({ motorCount: data, isLoadingDashboard: false });
        } catch (error) {
            console.error('Error fetching motorCount:', error);
            set({ isLoadingDashboard: false });
        }
    },
    customerCount: 0,
    fetchCustomerCount: async () => {
        set({ isLoadingDashboard: true });
        try {
            const data = await getCustomerCount();
            set({ customerCount: data, isLoadingDashboard: false });
        } catch (error) {
            console.error('Error fetching customerCount:', error);
            set({ isLoadingDashboard: false });
        }
    },
    newCustomersMonth: 0,
    fetchNewCustomersMonth: async () => {
        set({ isLoadingDashboard: true });
        try {
            const data = await getNewCustomersThisMonth();
            set({ newCustomersMonth: data, isLoadingDashboard: false });
        } catch (error) {
            console.error('Error fetching new customers month:', error);
            set({ isLoadingDashboard: false });
        }
    },
    statusCount: {
        pending: 0,
        confirmed: 0,
        renting: 0,
        finish: 0,
        cancel: 0,
    },
    fetchStatusCount: async () => {
        set({ isLoadingDashboard: true });
        try {
            const data = await getBookingStatusCount();
            if (typeof data === 'object' && data !== null) {
                set({ statusCount: data, isLoadingDashboard: false });
            }
        } catch (error) {
            console.error('Error fetching statusCount:', error);
            set({ isLoadingDashboard: false });
        }
    },
}));
