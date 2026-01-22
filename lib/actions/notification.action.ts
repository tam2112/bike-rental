'use server';

import prisma from '../prisma';

export const getUnreadNotificationCount = async () => {
    try {
        const count = await prisma.notification.count({
            where: {
                isRead: false,
            },
        });
        return count;
    } catch (error) {
        console.error('Error fetching unread notification count:', error);
        return 0;
    }
};

export const getNewNotificationCount = async () => {
    try {
        const count = await prisma.notification.count({
            where: {
                isNew: true,
            },
        });
        return count;
    } catch (error) {
        console.error('Error fetching new notification count:', error);
        return 0;
    }
};

export const getNotifications = async (page: number = 1, limit: number = 3, tab: string = 'all') => {
    try {
        // 1. Tính toán số bản ghi cần bỏ qua
        const skip = (page - 1) * limit;

        // 2. Xây dựng điều kiện lọc (where clause)
        // Nếu tab là 'new', chỉ lấy những thông báo có isNew: true
        const whereClause = tab === 'new' ? { isNew: true } : {};

        // 3. Thực hiện truy vấn song song (Count và FindMany) để tối ưu hiệu năng
        const [totalCount, notifications] = await Promise.all([
            prisma.notification.count({
                where: whereClause,
            }),
            prisma.notification.findMany({
                where: whereClause,
                skip: skip,
                take: limit,
                include: {
                    booking: {
                        select: {
                            id: true,
                            customerInfo: true,
                            motorbike: {
                                select: { id: true, name: true, model: true, licensePlateNum: true },
                            },
                            pickupDate: true,
                            returnDate: true,
                            createdAt: true,
                        },
                    },
                    rating: {
                        select: {
                            id: true,
                            rating: true,
                            review: true,
                            createdAt: true,
                            user: { select: { fullName: true } },
                            motorbike: {
                                select: { id: true, name: true, model: true, licensePlateNum: true },
                            },
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
            }),
        ]);

        // 4. Tính toán tổng số trang
        const totalPages = Math.ceil(totalCount / limit);

        return {
            notifications,
            totalPages,
            currentPage: page,
            totalCount,
        };
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return {
            notifications: [],
            totalPages: 0,
            currentPage: 1,
            totalCount: 0,
        };
    }
};

export const markAllNotificationAsRead = async () => {
    try {
        await prisma.notification.updateMany({
            where: {
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });
        return { success: true };
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        return { success: false };
    }
};

export const markAllNotificationAsNew = async () => {
    try {
        await prisma.notification.updateMany({
            where: {
                isNew: true,
            },
            data: {
                isNew: false,
            },
        });
        return { success: true };
    } catch (error) {
        console.error('Error marking notifications as new:', error);
        return { success: false };
    }
};

export const cleanupExpiredNotifications = async () => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const deletedCount = await prisma.notification.deleteMany({
            where: {
                createdAt: {
                    lt: thirtyDaysAgo,
                },
            },
        });

        console.log(`Deleted ${deletedCount.count} expired notifications`);
        return { success: true, deleted: deletedCount.count };
    } catch (error) {
        console.error('Error cleaning up expired notifications:', error);
        return { success: false };
    }
};

export const updateNotifyNew = async (id: string) => {
    try {
        const updatedNotify = await prisma.notification.update({
            where: { id },
            data: { isNew: false },
        });
        return { success: true, error: false, doctor: updatedNotify };
    } catch (error) {
        console.error('Error updating notify new:', error);
        return { success: false, error: true, message: 'Failed to update notify new' };
    }
};
