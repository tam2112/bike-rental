import { getRatingById, getRatings } from '@/lib/actions/rating.action';
import { RatingType } from '@/types/rating';
import { create } from 'zustand';

type RatingStore = {
    ratings: RatingType[] | null;
    rating: RatingType | null;
    isLoading: boolean;
    fetchRatings: () => Promise<void>;
    fetchRating: (id: string) => Promise<void>;
};

export const useRatingStore = create<RatingStore>((set) => ({
    ratings: null,
    isLoading: false,
    fetchRatings: async () => {
        set({ isLoading: true });
        try {
            const data = await getRatings();
            set({ ratings: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching ratings:', error);
            set({ isLoading: false });
        }
    },
    rating: null,
    fetchRating: async (id: string) => {
        set({ isLoading: true });
        try {
            const data = await getRatingById(id);
            set({ rating: data, isLoading: false });
        } catch (error) {
            console.error('Error fetching rating:', error);
            set({ isLoading: false });
        }
    },
}));
