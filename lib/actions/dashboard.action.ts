'use server';

import prisma from '../prisma';
import { formatLeadingZero } from '../utils';

import { customerRole } from '@/constants/role';

const getMonthRevenue = async (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 1);
    end.setMilliseconds(-1); // bao gồm ngày cuối tháng

    const bookings = await prisma.booking.findMany({
        where: {
            status: { name: 'Hoàn thành' },
            createdAt: {
                gte: start,
                lte: end,
            },
        },
        select: { price: true },
    });

    return bookings.reduce((acc, booking) => acc + (booking.price ?? 0), 0);
};

// Doanh thu + phần trăm so sánh + title động cho card doanh thu
export const getDashboardRevenue = async () => {
    const now = new Date();

    const currentRevenue = await getMonthRevenue(now);

    const previousDate = new Date(now);
    previousDate.setMonth(now.getMonth() - 1);
    const previousRevenue = await getMonthRevenue(previousDate);

    let percentChange = 0;
    if (previousRevenue > 0) {
        percentChange = ((currentRevenue - previousRevenue) / previousRevenue) * 100;
    } else if (currentRevenue > 0) {
        percentChange = 100;
    }

    const percentStr = percentChange > 0 ? `+${percentChange.toFixed(0)}` : percentChange.toFixed(0);

    const monthTitle = now.toLocaleString('vi-VN', { month: 'long' }); // ví dụ: "tháng 1"
    const previousMonthTitle = previousDate.toLocaleString('vi-VN', { month: 'long' });

    return {
        revenue: currentRevenue,
        percent: percentStr,
        monthTitle,
        description: `so với ${previousMonthTitle}`,
    };
};

export const getBookingCount = async () => {
    try {
        const count = await prisma.booking.count();
        return count;
    } catch (error) {
        console.error('Error fetching booking count:', error);
        return 0;
    }
};

// Đơn mới hôm nay
export const getNewBookingsToday = async () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(start);
    end.setDate(start.getDate() + 1);

    return await prisma.booking.count({
        where: {
            createdAt: {
                gte: start,
                lt: end,
            },
        },
    });
};

export const getCustomerCount = async () => {
    try {
        const count = await prisma.user.count({
            where: { role: { name: customerRole } },
        });
        return count;
    } catch (error) {
        console.error('Error fetching user count:', error);
        return 0;
    }
};

// Khách mới tháng này
export const getNewCustomersThisMonth = async () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    return await prisma.user.count({
        where: {
            role: { name: customerRole },
            createdAt: {
                gte: start,
                lt: end,
            },
        },
    });
};

export const getMotorCount = async () => {
    try {
        const count = await prisma.motorbike.count({});
        return count;
    } catch (error) {
        console.error('Error fetching motorbike count:', error);
        return 0;
    }
};

export const getBookingStatusCount = async () => {
    try {
        const pending = await prisma.booking.count({
            where: { status: { name: 'Đang chờ' } },
        });
        const confirmed = await prisma.booking.count({
            where: { status: { name: 'Đã xác nhận' } },
        });
        const renting = await prisma.booking.count({
            where: { status: { name: 'Đang thuê' } },
        });
        const finish = await prisma.booking.count({
            where: { status: { name: 'Hoàn thành' } },
        });
        const cancel = await prisma.booking.count({
            where: { status: { name: 'Đã hủy' } },
        });

        return { pending, confirmed, renting, finish, cancel };
    } catch (error) {
        console.error('Error fetching booking count:', error);
        return 0;
    }
};

// Data cho LineChart theo khoảng thời gian
export const getRevenueChartData = async (period: '7 ngày' | '30 ngày' | 'Năm nay') => {
    const now = new Date();
    let startDate = new Date(now);
    let isYear = false;

    if (period === 'Năm nay') {
        startDate = new Date(now.getFullYear(), 0, 1);
        isYear = true;
    } else {
        const days = period === '7 ngày' ? 7 : 30;
        startDate.setDate(now.getDate() - days);
    }

    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    const bookings = await prisma.booking.findMany({
        where: {
            status: { name: 'Hoàn thành' },
            createdAt: {
                // nếu không có updatedAt thì thay bằng createdAt
                gte: startDate,
                lte: endDate,
            },
        },
        select: { price: true, createdAt: true },
    });

    const groups: Record<string, number> = {};
    bookings.forEach((booking) => {
        const d = new Date(booking.createdAt);
        const key = isYear
            ? `Tháng ${d.getMonth() + 1}`
            : `${formatLeadingZero(d.getDate())}/${formatLeadingZero(d.getMonth() + 1)}`;
        groups[key] = (groups[key] || 0) + (booking.price ?? 0);
    });

    const data: { name: string; revenue: number }[] = [];

    if (isYear) {
        for (let m = 1; m <= now.getMonth() + 1; m++) {
            const key = `Tháng ${m}`;
            data.push({ name: key, revenue: groups[key] || 0 });
        }
    } else {
        const current = new Date(startDate);
        while (current <= now) {
            const key = `${formatLeadingZero(current.getDate())}/${formatLeadingZero(current.getMonth() + 1)}`;
            data.push({ name: key, revenue: groups[key] || 0 });
            current.setDate(current.getDate() + 1);
        }
    }

    return data;
};
