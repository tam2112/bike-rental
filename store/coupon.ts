import { getCouponById, getCoupons } from '@/lib/actions/coupon.action';
import { CouponType } from '@/types/coupon';
import { create } from 'zustand';

type CouponStore = {
    coupons: CouponType[] | null;
    coupon: CouponType | null;
    isLoading: boolean;
    fetchCoupons: () => Promise<void>;
    fetchCoupon: (id: string) => Promise<void>;
};

export const useCouponStore = create<CouponStore>((set) => ({
    coupons: [],
    isLoading: false,
    fetchCoupons: async () => {
        set({ isLoading: true });
        try {
            const data = await getCoupons();
            set({ coupons: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching coupons:', error);
            set({ isLoading: false });
        }
    },
    coupon: null,
    fetchCoupon: async (id: string) => {
        set({ isLoading: true });
        try {
            const data = await getCouponById(id);
            set({ coupon: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching coupon:', error);
            set({ isLoading: false });
        }
    },
}));
