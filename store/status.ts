import {
    getBookingStatuses,
    getMotorStatuses,
    getRatingStatuses,
    getStatuses,
    getUserStatuses,
} from '@/lib/actions/status.action';
import { StatusType } from '@/types/status';
import { create } from 'zustand';

type StatusStore = {
    statuses: StatusType[] | null;
    motorStatuses: StatusType[] | null;
    bookingStatuses: StatusType[] | null;
    userStatuses: StatusType[] | null;
    ratingStatuses: StatusType[] | null;
    fetchStatuses: () => Promise<void>;
    fetchMotorStatuses: () => Promise<void>;
    fetchBookingStatuses: () => Promise<void>;
    fetchUserStatuses: () => Promise<void>;
    fetchRatingStatuses: () => Promise<void>;
};

export const useStatusStore = create<StatusStore>((set) => {
    return {
        statuses: [],
        fetchStatuses: async () => {
            try {
                const data = await getStatuses();
                set({ statuses: data });
            } catch (error) {
                console.error('Error fetching statuses:', error);
            }
        },
        motorStatuses: [],
        fetchMotorStatuses: async () => {
            try {
                const data = await getMotorStatuses();
                set({ motorStatuses: data });
            } catch (error) {
                console.error('Error fetching motor statuses:', error);
            }
        },
        bookingStatuses: [],
        fetchBookingStatuses: async () => {
            try {
                const data = await getBookingStatuses();
                set({ bookingStatuses: data });
            } catch (error) {
                console.error('Error fetching booking statuses:', error);
            }
        },
        userStatuses: [],
        fetchUserStatuses: async () => {
            try {
                const data = await getUserStatuses();
                set({ userStatuses: data });
            } catch (error) {
                console.error('Error fetching user statuses:', error);
            }
        },
        ratingStatuses: [],
        fetchRatingStatuses: async () => {
            try {
                const data = await getRatingStatuses();
                set({ ratingStatuses: data });
            } catch (error) {
                console.error('Error fetching rating statuses:', error);
            }
        },
    };
});
