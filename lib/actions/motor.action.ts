'use server';

import prisma from '../prisma';
import { generateSlug } from '../utils';
import { MotorSchema } from '../validation/motor.form';

type CurrentState = { success: boolean; error: boolean; message?: string };

export const getMotors = async () => {
    try {
        const motors = await prisma.motorbike.findMany({
            include: {
                images: {
                    select: { url: true },
                },
                status: { select: { id: true, name: true } },
                ratings: {
                    select: {
                        id: true,
                        rating: true,
                        review: true,
                        user: { select: { fullName: true, avatar: { select: { url: true } } } },
                        createdAt: true,
                    },
                },
                bookings: {
                    select: {
                        pickupDate: true,
                        returnDate: true,
                        status: { select: { id: true, name: true } },
                    },
                },
            },
        });
        return motors;
    } catch (error) {
        console.error(error);
    }
};

export const getMotorById = async (id: string) => {
    try {
        const motorbike = await prisma.motorbike.findUnique({
            where: { id },
            include: {
                images: {
                    select: { url: true },
                },
                status: { select: { id: true, name: true } },
                ratings: {
                    select: {
                        id: true,
                        rating: true,
                        review: true,
                        user: { select: { fullName: true, avatar: { select: { url: true } } } },
                        createdAt: true,
                    },
                },
                bookings: {
                    select: {
                        pickupDate: true,
                        returnDate: true,
                        status: { select: { id: true, name: true } },
                    },
                },
            },
        });
        if (!motorbike) {
            throw new Error('motorbike not found');
        }

        return motorbike;
    } catch (error) {
        console.error('Error fetching motorbike by id:', error);
        return null;
    }
};

export const getMotorBySlug = async (slug: string) => {
    try {
        const motorbike = await prisma.motorbike.findFirst({
            where: { slug },
            include: {
                images: {
                    select: { url: true },
                },
                status: { select: { id: true, name: true } },
                ratings: {
                    select: {
                        id: true,
                        rating: true,
                        review: true,
                        user: { select: { fullName: true, avatar: { select: { url: true } } } },
                        createdAt: true,
                    },
                },
                bookings: {
                    select: {
                        pickupDate: true,
                        returnDate: true,
                        status: { select: { id: true, name: true } },
                    },
                },
            },
        });
        if (!motorbike) {
            throw new Error('motorbike not found');
        }

        return motorbike;
    } catch (error) {
        console.error('Error fetching motorbike by id:', error);
        return null;
    }
};

export const createMotor = async (currentState: CurrentState, data: MotorSchema & { imageUrls?: string[] }) => {
    try {
        const slug = generateSlug(data.name);

        // status
        const readyStatus = await prisma.status.findFirst({
            where: { name: 'Sẵn sàng' },
        });
        if (!readyStatus) {
            return {
                success: false,
                error: true,
                message: 'Không tìm thấy trạng thái sẵn sàng',
            };
        }
        const notReadyStatus = await prisma.status.findFirst({
            where: { name: 'Chưa sẵn sàng' },
        });
        if (!notReadyStatus) {
            return {
                success: false,
                error: true,
                message: 'Không tìm thấy trạng thái chưa sẵn sàng',
            };
        }

        const newMotor = await prisma.motorbike.create({
            data: {
                name: data.name,
                slug,
                brand: data.brand,
                model: data.model,
                year: Number(data.year),
                licensePlateNum: data.licensePlateNum,
                color: data.color,
                engineCapacity: Number(data.engineCapacity),
                fuelType: data.fuelType,
                consume: data.consume || null,
                fuelCapacity: data.fuelCapacity || null,
                weight: Number(data.weight),
                pricePerDay: data.pricePerDay,
                description: data.description,
                odoNum: Number(data.odoNum),
                seat: Number(data.seat) || 2,
                situation: data.situation || null,
                isReady: data.isReady || false,
                maintenanceAt: data.maintenanceAt || null,
                statusId: data.isReady ? readyStatus.id : notReadyStatus.id,
            },
        });

        if (data.imageUrls && data.imageUrls.length > 0) {
            await prisma.image.createMany({
                data: data.imageUrls.map((url) => ({
                    url,
                    motorbikeId: newMotor.id,
                    createdAt: new Date(),
                })),
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
                message: 'Biển số xe đã tồn tại',
            };
        }
        return { success: false, error: true, message: 'Update failed' };
    }
};

export const updateMotor = async (currentState: CurrentState, data: MotorSchema & { imageUrls?: string[] }) => {
    try {
        if (!data.id) {
            throw new Error('Motor ID is required for update');
        }

        const slug = generateSlug(data.name);

        const updatedMotor = await prisma.motorbike.update({
            where: { id: data.id },
            data: {
                name: data.name,
                slug,
                brand: data.brand,
                model: data.model,
                year: Number(data.year),
                licensePlateNum: data.licensePlateNum,
                color: data.color,
                engineCapacity: Number(data.engineCapacity),
                fuelType: data.fuelType,
                consume: data.consume || '',
                fuelCapacity: data.fuelCapacity || '',
                weight: Number(data.weight),
                pricePerDay: data.pricePerDay,
                description: data.description,
                odoNum: Number(data.odoNum),
                seat: Number(data.seat) || 2,
                situation: data.situation || '',
                statusId: data.statusId,
                maintenanceAt: data.maintenanceAt || null,
            },
        });

        await prisma.image.deleteMany({
            where: { motorbikeId: updatedMotor.id },
        });

        if (data.imageUrls && data.imageUrls.length > 0) {
            await prisma.image.createMany({
                data: data.imageUrls.map((url) => ({
                    url,
                    motorbikeId: updatedMotor.id,
                    createdAt: new Date(),
                })),
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
                message: 'Biển số xe đã tồn tại',
            };
        }
        return { success: false, error: true, message: 'Update failed' };
    }
};

export const deleteMotorById = async (id: string) => {
    try {
        await prisma.motorbike.delete({
            where: {
                id,
            },
        });
        return { success: true };
    } catch (error) {
        console.log(error);
    }
};

export async function deleteSelectedMotors(selectedIds: string[]) {
    try {
        const count = await prisma.motorbike.deleteMany({
            where: {
                id: {
                    in: selectedIds,
                },
            },
        });

        await prisma.image.deleteMany({
            where: {
                motorbikeId: {
                    in: selectedIds,
                },
            },
        });

        return { success: true, count: count.count };
    } catch (error) {
        console.error('Error deleting motorbikes:', error);
        return { success: false, error: 'Failed to delete motorbikes' };
    }
}
