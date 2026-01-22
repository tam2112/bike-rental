import { create } from 'zustand';
import {
    cleanupExpiredNotifications,
    getNewNotificationCount,
    getNotifications,
    getUnreadNotificationCount,
} from '@/lib/actions/notification.action';
import { NotificationType } from '@/types/notification';

type NotificationStore = {
    notifyUnreadCount: number;
    notifyNewCount: number;
    notifications: NotificationType[] | null;
    totalPages: number;
    isLoading: boolean;
    fetchNotifyUnreadCount: () => Promise<void>;
    fetchNotifyNewCount: () => Promise<void>;
    fetchNotifications: (page?: number, limit?: number, tab?: string) => Promise<void>;
};

export const useNotificationStore = create<NotificationStore>((set) => {
    return {
        notifyUnreadCount: 0,
        fetchNotifyUnreadCount: async () => {
            try {
                const data = await getUnreadNotificationCount();
                set({ notifyUnreadCount: data });
            } catch (error) {
                console.error('Error fetching notifyUnreadCount:', error);
            }
        },
        notifyNewCount: 0,
        fetchNotifyNewCount: async () => {
            try {
                const data = await getNewNotificationCount();
                set({ notifyNewCount: data });
            } catch (error) {
                console.error('Error fetching notifyNewCount:', error);
            }
        },
        notifications: [],
        totalPages: 1,
        isLoading: false,
        fetchNotifications: async (page = 1, limit = 3, tab = 'all') => {
            set({ isLoading: true });
            try {
                // Giả sử API của bạn hỗ trợ query params: page, limit, type
                const data = await getNotifications(page, limit, tab);
                await cleanupExpiredNotifications();
                // Cập nhật tùy theo cấu trúc trả về của API bạn
                set({
                    notifications: data.notifications,
                    totalPages: data.totalPages || 1,
                    isLoading: false,
                });
            } catch (error) {
                set({ isLoading: false });
                console.error(error);
            }
        },
    };
});
