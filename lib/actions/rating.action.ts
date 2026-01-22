'use server';

import prisma from '../prisma';
import { RatingFeedbackSchema, RatingSchema } from '../validation/rating.form';

type CurrentState = { success: boolean; error: boolean; message?: string };

export const getRatings = async () => {
    try {
        const ratings = await prisma.rating.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        avatar: { select: { url: true } },
                        phone: true,
                        idCard: true,
                        role: { select: { name: true } },
                    },
                },
                motorbike: {
                    select: {
                        id: true,
                        name: true,
                        model: true,
                        licensePlateNum: true,
                        images: { select: { url: true } },
                    },
                },
                status: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return ratings;
    } catch (error) {
        console.error(error);
    }
};

export const getRatingById = async (id: string) => {
    try {
        const ratings = await prisma.rating.findFirst({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        avatar: { select: { url: true } },
                        phone: true,
                        idCard: true,
                        role: { select: { name: true } },
                    },
                },
                motorbike: {
                    select: {
                        id: true,
                        name: true,
                        model: true,
                        licensePlateNum: true,
                        images: { select: { url: true } },
                    },
                },
                status: { select: { id: true, name: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return ratings;
    } catch (error) {
        console.error(error);
    }
};

export const getRatingCount = async () => {
    try {
        const count = await prisma.rating.count({});
        return count;
    } catch (error) {
        console.error(error);
    }
};

export const createRating = async (currentState: CurrentState, data: RatingSchema) => {
    try {
        const hideStatus = await prisma.status.findFirst({
            where: { name: 'Đã ẩn' },
        });

        if (!hideStatus) {
            return {
                success: false,
                error: true,
                message: 'Không tìm thấy trạng thái Đã ẩn',
            };
        }

        const newRating = await prisma.rating.create({
            data: {
                rating: Number(data.rating),
                review: data.review,
                userId: data.userId,
                motorbikeId: data.motorbikeId,
                bookingId: data.bookingId,
                statusId: hideStatus.id,
            },
        });

        const motorbike = await prisma.motorbike.findFirst({
            where: { id: newRating.motorbikeId },
        });

        if (motorbike) {
            await prisma.notification.create({
                data: {
                    type: 'RATING',
                    ratingId: newRating.id,
                },
            });
        }

        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        // Kiểm tra lỗi unique constraint từ Prisma
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
            return {
                success: false,
                error: true,
                message: 'review is already exists',
            };
        }
        return { success: false, error: true, message: 'Create failed' };
    }
};

export const sendFeedback = async (currentState: CurrentState, data: RatingFeedbackSchema) => {
    try {
        const hideStatus = await prisma.status.findFirst({
            where: { name: 'Đã ẩn' },
        });
        if (!hideStatus) {
            return {
                success: false,
                error: true,
                message: 'Không tìm thấy trạng thái Đã ẩn',
            };
        }
        const showStatus = await prisma.status.findFirst({
            where: { name: 'Hiển thị' },
        });
        if (!showStatus) {
            return {
                success: false,
                error: true,
                message: 'Không tìm thấy trạng thái Hiển thị',
            };
        }

        await prisma.rating.update({
            where: { id: data.id },
            data: {
                feedback: data.feedback,
                isPublic: data.isPublic || false,
                statusId: data.isPublic ? showStatus.id : hideStatus.id,
            },
        });

        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        return { success: false, error: true, message: 'Create failed' };
    }
};

export const updateRatingPublic = async (id: string, isPublic: boolean) => {
    try {
        const hideStatus = await prisma.status.findFirst({
            where: { name: 'Đã ẩn' },
        });
        if (!hideStatus) {
            return {
                success: false,
                error: true,
                message: 'Không tìm thấy trạng thái Đã ẩn',
            };
        }
        const showStatus = await prisma.status.findFirst({
            where: { name: 'Hiển thị' },
        });
        if (!showStatus) {
            return {
                success: false,
                error: true,
                message: 'Không tìm thấy trạng thái Hiển thị',
            };
        }

        await prisma.rating.update({
            where: { id },
            data: { isPublic, statusId: isPublic ? showStatus.id : hideStatus.id },
        });
        return { success: true, error: false };
    } catch (error) {
        console.error('Error updating rating public:', error);
        return { success: false, error: true, message: 'Failed to update rating public' };
    }
};

export const deleteRatingById = async (id: string) => {
    try {
        await prisma.rating.delete({
            where: {
                id,
            },
        });
        return { success: true, error: false, message: '' };
    } catch (error) {
        console.log(error);
    }
};
