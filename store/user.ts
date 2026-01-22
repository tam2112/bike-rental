import { create } from 'zustand';
import { getCurrentUser, getUserById, getUsers } from '@/lib/actions/user.action';
import { UserType } from '@/types/customer';

type UserStore = {
    users: UserType[] | null;
    currentUser: UserType | null;
    userById: UserType | null;
    isLoading: boolean;
    fetchUsers: () => Promise<void>;
    fetchCurrentUser: () => Promise<void>;
    fetchUserById: (id: string) => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => {
    return {
        users: [],
        isLoading: false,
        fetchUsers: async () => {
            set({ isLoading: true });
            try {
                const data = await getUsers();
                set({ users: data, isLoading: false });
            } catch (error) {
                console.error('Error fetching users:', error);
                set({ isLoading: false });
            }
        },
        currentUser: null,
        fetchCurrentUser: async () => {
            set({ isLoading: true });
            try {
                const data = await getCurrentUser();
                set({ currentUser: data, isLoading: false });
            } catch (error) {
                console.error('Error fetching currentUser:', error);
                set({ isLoading: false });
            }
        },
        userById: null,
        fetchUserById: async (id: string) => {
            set({ isLoading: true });
            try {
                const data = await getUserById(id);
                set({ userById: data, isLoading: false });
            } catch (error) {
                console.error('Error fetching userById:', error);
                set({ isLoading: false });
            }
        },
    };
});
