/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMotorBookings } from '@/lib/actions/booking.action';
import { getMotorById, getMotorBySlug, getMotors } from '@/lib/actions/motor.action';
import { BookingType } from '@/types/booking';
import { MotorType } from '@/types/motor';
import { create } from 'zustand';

type FilterState = {
    search: string;
    models: string[];
    brands: string[];
    priceRange: number[];
    sort: string;
    pickupDate: string | null;
    returnDate: string | null;
};

type MotorStore = {
    motors: MotorType[] | null;
    motor: MotorType | null;
    motorBySlug: MotorType | null;
    motorBookings: BookingType[] | null;
    filteredMotors: MotorType[] | null; // Danh sách sau khi lọc
    filters: FilterState;
    isLoading: boolean;
    fetchMotors: () => Promise<void>;
    fetchMotor: (id: string) => Promise<void>;
    fetchMotorBySlug: (slug: string) => Promise<void>;
    fetchMotorBookings: (motorId: string) => Promise<void>;
    setFilter: (key: keyof FilterState, value: any) => void;
    applyFilters: () => void;
    resetFilters: () => void;
};

export const useMotorStore = create<MotorStore>((set, get) => ({
    motors: [],
    filteredMotors: [],
    isLoading: false,
    filters: {
        search: '',
        models: [],
        brands: [],
        priceRange: [0, 1000000], // Mặc định rộng hơn
        sort: 'Mới nhất',
        pickupDate: null,
        returnDate: null,
    },
    fetchMotors: async () => {
        set({ isLoading: true });
        try {
            const data = await getMotors();
            set({ motors: data, filteredMotors: data, isLoading: false });
            get().applyFilters();
        } catch (error) {
            console.error('Error fetching motors:', error);
            set({ isLoading: false });
        }
    },
    motor: null,
    fetchMotor: async (id: string) => {
        set({ isLoading: true });
        try {
            const data = await getMotorById(id);
            set({ motor: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching motor:', error);
            set({ isLoading: false });
        }
    },
    motorBySlug: null,
    fetchMotorBySlug: async (slug: string) => {
        set({ isLoading: true });
        try {
            const data = await getMotorBySlug(slug);
            set({ motorBySlug: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching motorBySlug:', error);
            set({ isLoading: false });
        }
    },
    motorBookings: [],
    fetchMotorBookings: async (motorId: string) => {
        set({ isLoading: true });
        try {
            const data = await getMotorBookings(motorId);
            set({ motorBookings: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching motorBookings:', error);
            set({ isLoading: false });
        }
    },
    setFilter: (key, value) => {
        set((state) => ({
            filters: { ...state.filters, [key]: value },
        }));
        // if (key !== 'search' && key !== 'priceRange') {
        // }
        get().applyFilters();
    },
    applyFilters: () => {
        const { motors, filters } = get();
        if (!motors) return;

        const result = motors.filter((m) => {
            const matchSearch = m.name.toLowerCase().includes(filters.search.toLowerCase());
            const matchModel = filters.models.length === 0 || filters.models.includes(m.model);
            const matchBrand = filters.brands.length === 0 || filters.brands.includes(m.brand);
            const matchPrice = m.pricePerDay >= filters.priceRange[0] && m.pricePerDay <= filters.priceRange[1];

            // Logic lọc theo ngày (Chuyển từ MotorbikeList vào đây)
            let matchDate = true;
            if (filters.pickupDate && filters.returnDate) {
                const searchPickup = new Date(filters.pickupDate);
                const searchReturn = new Date(filters.returnDate);

                matchDate = !m.bookings
                    .filter((booking) => booking.status.name !== 'Đã hủy')
                    .some((booking) => {
                        const pickup = new Date(booking.pickupDate);
                        const returnDt = new Date(booking.returnDate);
                        return !(searchReturn <= pickup || searchPickup >= returnDt);
                    });
            }

            return matchSearch && matchModel && matchBrand && matchPrice && matchDate;
        });

        if (filters.sort === 'Giá: Thấp đến Cao') result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        if (filters.sort === 'Giá: Cao đến Thấp') result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        if (filters.sort === 'Mới nhất')
            result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        set({ filteredMotors: result });
    },
    resetFilters: () => {
        const { motors } = get();
        set({
            filters: {
                search: '',
                models: [],
                brands: [],
                priceRange: [0, 1000000],
                sort: 'Mới nhất',
                pickupDate: null,
                returnDate: null,
            },
            filteredMotors: motors,
        });
    },
}));
