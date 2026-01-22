'use server';

import prisma from '../prisma';

import { motorStatuses } from '@/constants/motorbike';
import { bookingStatuses } from '@/constants/booking';
import { userStatuses } from '@/constants/user';
import { ratingStatuses } from '@/constants/rating';

export const getStatuses = async () => {
    try {
        const statuses = await prisma.status.findMany();
        return statuses;
    } catch (error) {
        console.error(error);
    }
};

export const getMotorStatuses = async () => {
    try {
        const statuses = await prisma.status.findMany({
            where: {
                name: {
                    in: motorStatuses,
                },
            },
        });
        return statuses;
    } catch (error) {
        console.error(error);
    }
};

export const getBookingStatuses = async () => {
    try {
        const statuses = await prisma.status.findMany({
            where: {
                name: {
                    in: bookingStatuses,
                },
            },
        });
        return statuses;
    } catch (error) {
        console.error(error);
    }
};

export const getUserStatuses = async () => {
    try {
        const statuses = await prisma.status.findMany({
            where: {
                name: {
                    in: userStatuses,
                },
            },
        });
        return statuses;
    } catch (error) {
        console.error(error);
    }
};

export const getRatingStatuses = async () => {
    try {
        const statuses = await prisma.status.findMany({
            where: {
                name: {
                    in: ratingStatuses,
                },
            },
        });
        return statuses;
    } catch (error) {
        console.error(error);
    }
};
