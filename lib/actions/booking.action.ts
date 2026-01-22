'use server';

import { cookies } from 'next/headers';
import prisma from '../prisma';
import { deliveryFee, isBookingCancellable, raincoatFee, scratchInsurance } from '../utils';
import { BookingSchema, UpdateBookingSchema } from '../validation/booking.form';

import { upcomingStatuses } from '@/constants/booking';

import { sendMail } from '../gmail';

type CheckReadyState = { success: boolean; error: boolean; message?: string; ready?: boolean };
type CreateBookingState = { success: boolean; error: boolean; message?: string };

export type BookingStatus = 'Đang chờ' | 'Đã xác nhận' | 'Đang thuê' | 'Hoàn thành' | 'Đã hủy';

export const getBookings = async () => {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                motorbike: {
                    select: {
                        id: true,
                        slug: true,
                        name: true,
                        images: { select: { url: true } },
                        licensePlateNum: true,
                        model: true,
                        color: true,
                        weight: true,
                        fuelType: true,
                        engineCapacity: true,
                        pricePerDay: true,
                        status: { select: { name: true } },
                    },
                },
                status: { select: { id: true, name: true } },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        avatar: { select: { url: true } },
                        role: { select: { name: true } },
                    },
                },
                customerInfo: true,
                rating: {
                    select: { rating: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return bookings;
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        throw error;
    }
};

export const getBookingById = async (id: string) => {
    try {
        const bookings = await prisma.booking.findFirst({
            where: { id },
            include: {
                motorbike: {
                    select: {
                        id: true,
                        slug: true,
                        name: true,
                        images: { select: { url: true } },
                        licensePlateNum: true,
                        model: true,
                        color: true,
                        weight: true,
                        fuelType: true,
                        engineCapacity: true,
                        pricePerDay: true,
                        status: { select: { name: true } },
                    },
                },
                status: { select: { id: true, name: true } },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        avatar: { select: { url: true } },
                        role: { select: { name: true } },
                    },
                },
                customerInfo: true,
                rating: {
                    select: { rating: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return bookings;
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        throw error;
    }
};

export const getCustomerBookings = async () => {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('userId')?.value;

        const bookings = await prisma.booking.findMany({
            where: { userId },
            include: {
                motorbike: {
                    select: {
                        id: true,
                        slug: true,
                        name: true,
                        images: { select: { url: true } },
                        licensePlateNum: true,
                        model: true,
                        color: true,
                        weight: true,
                        fuelType: true,
                        engineCapacity: true,
                        pricePerDay: true,
                        status: { select: { name: true } },
                    },
                },
                status: { select: { id: true, name: true } },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        avatar: { select: { url: true } },
                        role: { select: { name: true } },
                    },
                },
                customerInfo: true,
                rating: {
                    select: { rating: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return bookings;
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        throw error;
    }
};

export const getUpcomingTrips = async () => {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('userId')?.value;

        const bookings = await prisma.booking.findMany({
            where: { userId, status: { name: { in: upcomingStatuses } } },
            include: {
                motorbike: {
                    select: {
                        id: true,
                        slug: true,
                        name: true,
                        images: { select: { url: true } },
                        licensePlateNum: true,
                        model: true,
                        color: true,
                        weight: true,
                        fuelType: true,
                        engineCapacity: true,
                        pricePerDay: true,
                        status: { select: { name: true } },
                    },
                },
                status: { select: { id: true, name: true } },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        avatar: { select: { url: true } },
                        role: { select: { name: true } },
                    },
                },
                customerInfo: true,
                rating: {
                    select: { rating: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return bookings;
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        throw error;
    }
};

export const getMotorBookings = async (motorbikeId: string) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { motorbikeId },
            include: {
                motorbike: {
                    select: {
                        id: true,
                        slug: true,
                        name: true,
                        images: { select: { url: true } },
                        licensePlateNum: true,
                        model: true,
                        color: true,
                        weight: true,
                        fuelType: true,
                        engineCapacity: true,
                        pricePerDay: true,
                        status: { select: { name: true } },
                    },
                },
                status: { select: { id: true, name: true } },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        avatar: { select: { url: true } },
                        role: { select: { name: true } },
                    },
                },
                customerInfo: true,
                rating: {
                    select: { rating: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return bookings;
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        throw error;
    }
};

export const getUserBookings = async (userId: string) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { userId },
            include: {
                motorbike: {
                    select: {
                        id: true,
                        slug: true,
                        name: true,
                        images: { select: { url: true } },
                        licensePlateNum: true,
                        model: true,
                        color: true,
                        weight: true,
                        fuelType: true,
                        engineCapacity: true,
                        pricePerDay: true,
                        status: { select: { name: true } },
                    },
                },
                status: { select: { id: true, name: true } },
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        avatar: { select: { url: true } },
                        role: { select: { name: true } },
                    },
                },
                customerInfo: true,
                rating: {
                    select: { rating: true },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return bookings;
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        throw error;
    }
};

// stats user
export const getUserSpending = async (userId: string) => {
    const bookings = await prisma.booking.findMany({
        where: {
            userId,
            status: { name: 'Hoàn thành' },
        },
        select: { price: true },
    });

    return bookings.reduce((acc, booking) => acc + (booking.price ?? 0), 0);
};

export const getUserBookingCount = async (userId: string) => {
    try {
        const count = await prisma.booking.count({
            where: { userId },
        });
        return count;
    } catch (error) {
        console.error('Error fetching user booking count:', error);
        return 0;
    }
};

export const checkReady = async (prevState: CheckReadyState, formData: FormData) => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return {
                success: false,
                error: true,
                message: 'Vui lòng đăng nhập/đăng ký tài khoản để thực hiện đặt xe',
            };
        }

        const motorbikeId = formData.get('motorbikeId') as string;
        const pickupDate = formData.get('pickupDate') as string;
        const returnDate = formData.get('returnDate') as string;

        if (!motorbikeId || !pickupDate || !returnDate) {
            return { success: false, error: true, message: 'Thiếu các trường bắt buộc' };
        }

        // Parse dates
        const pickup = new Date(pickupDate);
        const returnDt = new Date(returnDate);

        if (pickup >= returnDt) {
            return { success: false, error: true, message: 'Ngày nhận phải lớn hơn ngày trả về' };
        }

        // Check motor ready
        const motor = await prisma.motorbike.findUnique({
            where: { id: motorbikeId },
            select: { isReady: true },
        });

        if (!motor || !motor.isReady) {
            return { success: false, error: true, message: 'Xe máy đang bảo dưỡng' };
        }

        const cancelStatus = await prisma.status.findFirst({
            where: { name: 'Đã hủy' },
        });

        if (!cancelStatus) {
            return { success: false, error: true, message: 'Không tìm thấy trạng thái Đã hủy' };
        }

        // Check for overlapping bookings
        const overlappingBookings = await prisma.booking.findMany({
            where: {
                motorbikeId,
                statusId: { not: cancelStatus.id },
                AND: [
                    {
                        OR: [
                            { pickupDate: { lte: returnDt }, returnDate: { gte: pickup } }, // Overlap condition
                        ],
                    },
                ],
            },
        });

        if (overlappingBookings.length > 0) {
            return { success: false, error: true, message: 'Xe đã được đặt vào ngày đã chọn' };
        }

        return { success: true, error: false, message: 'Xe đã sẵn sàng', ready: true };
    } catch (error) {
        console.error('Error checking availability:', error);
        return { success: false, error: true, message: 'Failed to check availability' };
    }
};

export const createBooking = async (prevState: CreateBookingState, data: BookingSchema) => {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('userId')?.value;

        if (!userId) {
            return {
                success: false,
                error: true,
                message: 'ID khách hàng là bắt buộc',
            };
        }

        const {
            fullName,
            phone,
            email,
            idCard,
            note,
            coupon,
            isScratch,
            isRaincoat,
            pickupDate,
            returnDate,
            motorbikeId,
            pickupPoint,
            returnPoint,
        } = data;

        const pickup = new Date(pickupDate);
        const returnDt = new Date(returnDate);

        if (pickup >= returnDt) {
            return { success: false, error: true, message: 'Ngày nhận phải trước ngày trả' };
        }

        // Check motorbike ready & overlapping (same as checkReady)
        const motorbike = await prisma.motorbike.findUnique({
            where: { id: motorbikeId },
            select: { isReady: true, pricePerDay: true, name: true },
        });

        if (!motorbike || !motorbike.isReady) {
            return { success: false, error: true, message: 'Xe máy đang bảo dưỡng hoặc không tồn tại' };
        }

        const cancelStatus = await prisma.status.findFirst({
            where: { name: 'Đã hủy' },
        });

        if (!cancelStatus) {
            return { success: false, error: true, message: 'Không tìm thấy trạng thái Đã hủy' };
        }

        const overlapping = await prisma.booking.findMany({
            where: {
                motorbikeId,
                statusId: { not: cancelStatus.id },
                AND: [
                    {
                        OR: [{ pickupDate: { lte: returnDt }, returnDate: { gte: pickup } }],
                    },
                ],
            },
        });

        if (overlapping.length > 0) {
            return { success: false, error: true, message: 'Xe đã được đặt trong khoảng thời gian này' };
        }

        // Calculate days
        const days = Math.ceil((returnDt.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));

        // Base rental
        let totalPrice = motorbike.pricePerDay * days;

        // Additional services
        if (isScratch) totalPrice += scratchInsurance * days;
        if (isRaincoat) totalPrice += raincoatFee;

        // Delivery fee
        totalPrice += deliveryFee;

        // Coupon handling (server-side validation)
        let isCouponUsed = false;
        if (coupon) {
            const foundCoupon = await prisma.coupon.findFirst({
                where: { code: coupon },
            });

            if (!foundCoupon || (foundCoupon.expiredAt && new Date() > foundCoupon.expiredAt)) {
                return { success: false, error: true, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn' };
            }

            // Check forNewUser
            const bookingCount = await prisma.booking.count({ where: { userId } });
            if (foundCoupon.forNewUser && bookingCount > 0) {
                return { success: false, error: true, message: 'Mã giảm giá chỉ dành cho khách hàng mới' };
            }

            // Apply discount (percent)
            const discountAmount = totalPrice * (foundCoupon.discount / 100);
            totalPrice -= discountAmount;
            isCouponUsed = true;
        }

        // Get pending status
        const pendingStatus = await prisma.status.findUnique({
            where: { name: 'Đang chờ' },
        });

        if (!pendingStatus) {
            return { success: false, error: true, message: 'Không tìm thấy trạng thái Đang chờ' };
        }

        // Create booking
        const newBooking = await prisma.booking.create({
            data: {
                motorbikeId,
                userId,
                pickupDate: pickup,
                returnDate: returnDt,
                pickupPoint,
                returnPoint,
                coupon: coupon || null,
                isCouponUsed,
                isHelmet: true,
                isScratch,
                isRaincoat,
                statusId: pendingStatus.id,
                price: totalPrice,
            },
        });

        // Create customer info
        await prisma.customerInfo.create({
            data: {
                fullName,
                phone,
                email,
                idCard,
                note,
                bookingId: newBooking.id,
            },
        });

        // create notifications
        await prisma.notification.create({
            data: {
                type: 'BOOKING',
                bookingId: newBooking.id,
            },
        });

        // 1. GỬI XÁC NHẬN CHO KHÁCH HÀNG
        try {
            await sendMail({
                to: email, // Email khách nhập trong form
                subject: `[Xác nhận] Đơn đặt xe #${newBooking.id.slice(-6).toUpperCase()}`,
                html: `
            <div style="font-family: Arial, sans-serif;">
                <h2 style="color: #2563eb;">Cảm ơn bạn đã đặt xe!</h2>
                <p>Chào ${fullName}, đơn hàng của bạn đã được nhận và đang chờ xử lý.</p>
                <table style="width: 100%; border: 1px solid #ddd; border-collapse: collapse;">
                    <tr style="background: #f8fafc;"><td style="padding: 8px; border: 1px solid #ddd;">Mã đơn</td><td style="padding: 8px; border: 1px solid #ddd;">${newBooking.id}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #ddd;">Tổng tiền</td><td style="padding: 8px; border: 1px solid #ddd;"><b>${totalPrice.toLocaleString('vi-VN')} VNĐ</b></td></tr>
                </table>
                <p>Chúng tôi sẽ gọi cho bạn qua số <b>${phone}</b> sớm nhất có thể.</p>
            </div>
        `,
            });
        } catch (e) {
            console.error('Lỗi mail khách:', e);
        }

        // 2. GỬI THÔNG BÁO CHO ADMIN
        try {
            await sendMail({
                to: process.env.SENDER_EMAIL,
                subject: `[ĐƠN MỚI] Từ khách hàng: ${fullName}`,
                html: `
            <div style="background: #fffbe6; padding: 20px; border: 1px solid #ffe58f;">
                <h2>Có đơn đặt xe mới cần duyệt!</h2>
                <p><b>Khách hàng:</b> ${fullName}</p>
                <p><b>SĐT:</b> ${phone}</p>
                <p><b>Dòng xe:</b> ID ${motorbike.name}</p>
                <p><b>Thời gian:</b> ${new Date(pickupDate).toLocaleDateString('vi-VN')} - ${new Date(returnDate).toLocaleDateString('vi-VN')}</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/quan-tri-vien/don-dat-xe" style="background: #faad14; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Xem trên Dashboard</a>
            </div>
        `,
            });
        } catch (e) {
            console.error('Lỗi mail admin:', e);
        }

        return { success: true, error: false, message: 'Đặt xe thành công!' };
    } catch (error) {
        console.error('Error creating booking:', error);
        return { success: false, error: true, message: 'Đặt xe thất bại, vui lòng thử lại' };
    }
};

export const cancelBooking = async (bookingId: string) => {
    try {
        // Get the status ID for the new status
        const status = await prisma.status.findUnique({
            where: { name: 'Đã hủy' },
        });

        if (!status) {
            return {
                success: false,
                error: true,
                message: 'Không tìm thấy trạng thái "Đã hủy"',
            };
        }

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { status: true },
        });

        if (!booking) {
            throw new Error('Không tìm thấy đơn hàng');
        }

        const canCancel = isBookingCancellable(booking.pickupDate);

        if (!canCancel) {
            return {
                success: false,
                error: true,
                message: 'Không thể hủy đơn hàng do đã quá hạn (ít nhất 24h trước khi nhận xe).',
            };
        }

        await prisma.booking.update({
            where: { id: bookingId },
            data: { statusId: status.id },
        });

        const customer = await prisma.customerInfo.findFirst({ where: { bookingId } });

        if (customer?.email) {
            // 1. GỬI CHO KHÁCH HÀNG
            try {
                await sendMail({
                    to: customer.email,
                    subject: `[Thông báo] Đơn hàng #${bookingId.slice(-6).toUpperCase()} đã được hủy`,
                    html: `<p>Chào ${customer.fullName}, chúng tôi xác nhận đơn hàng của bạn đã được hủy thành công theo yêu cầu.</p>`,
                });
            } catch (e) {
                console.error('Lỗi mail khách:', e);
            }

            // 2. GỬI CHO ADMIN
            try {
                await sendMail({
                    to: process.env.SENDER_EMAIL,
                    subject: `[HỦY ĐƠN] Khách hàng ${customer.fullName} đã hủy đơn`,
                    html: `
                <div style="color: #721c24; background-color: #f8d7da; padding: 15px;">
                    <h3>Cảnh báo: Đơn hàng bị hủy</h3>
                    <p><b>Mã đơn:</b> ${bookingId}</p>
                    <p><b>Khách hàng:</b> ${customer.fullName}</p>
                    <p><b>Lý do:</b> Khách chủ động hủy trên hệ thống.</p>
                </div>
            `,
                });
            } catch (e) {
                console.error('Lỗi mail admin:', e);
            }
        }

        return {
            success: true,
            error: false,
            message: ``,
        };
    } catch (error) {
        console.error('Error updating booking status:', error);
        return {
            success: false,
            error: true,
            data: null,
            message: error instanceof Error ? error.message : 'Update booking status failed',
        };
    }
};

export const updateBookingStatus = async (bookingId: string, statusId: BookingStatus) => {
    try {
        const status = await prisma.status.findUnique({
            where: { id: statusId },
        });

        if (!status) {
            throw new Error(`Không tìm thấy trạng thái`);
        }

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { status: true },
        });

        if (!booking) {
            throw new Error('booking not found');
        }

        // Update the booking with the new status
        await prisma.booking.update({
            where: { id: bookingId },
            data: { statusId },
        });

        return {
            success: true,
            error: false,
            message: `Cập nhật trạng thái đơn hàng thành ${status.name} thành công`,
        };
    } catch (error) {
        console.error('Error updating order status:', error);
        return {
            success: false,
            error: true,
            data: null,
            message: error instanceof Error ? error.message : 'Update order status failed',
        };
    }
};

export const updateBooking = async (currentState: CreateBookingState, data: UpdateBookingSchema) => {
    try {
        if (!data.id) {
            throw new Error('Booking ID is required for update');
        }

        const pickup = new Date(data.pickupDate);
        const returnDt = new Date(data.returnDate);

        if (pickup >= returnDt) {
            return { success: false, error: true, message: 'Ngày nhận phải trước ngày trả' };
        }

        // Check motorbike ready & overlapping (same as checkReady)
        const motorbike = await prisma.motorbike.findUnique({
            where: { id: data.motorbikeId },
            select: { isReady: true, pricePerDay: true },
        });

        if (!motorbike || !motorbike.isReady) {
            return { success: false, error: true, message: 'Xe máy đang bảo dưỡng hoặc không tồn tại' };
        }

        const cancelStatus = await prisma.status.findFirst({
            where: { name: 'Đã hủy' },
        });

        if (!cancelStatus) {
            return { success: false, error: true, message: 'Không tìm thấy trạng thái Đã hủy' };
        }

        const overlapping = await prisma.booking.findMany({
            where: {
                motorbikeId: data.motorbikeId,
                id: { not: data.id },
                statusId: { not: cancelStatus.id },
                AND: [
                    {
                        OR: [{ pickupDate: { lte: returnDt }, returnDate: { gte: pickup } }],
                    },
                ],
            },
        });

        if (overlapping.length > 0) {
            return { success: false, error: true, message: 'Xe đã được đặt trong khoảng thời gian này' };
        }

        // Calculate days
        const days = Math.ceil((returnDt.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24));

        // Base rental
        let totalPrice = motorbike.pricePerDay * days;

        // Additional services
        if (data.isScratch) totalPrice += scratchInsurance * days;
        if (data.isRaincoat) totalPrice += raincoatFee;

        // Delivery fee
        totalPrice += deliveryFee;

        if (data.coupon && data.isCouponUsed) {
            const foundCoupon = await prisma.coupon.findFirst({
                where: { code: data.coupon },
            });

            if (!foundCoupon || (foundCoupon.expiredAt && new Date() > foundCoupon.expiredAt)) {
                return { success: false, error: true, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn' };
            }

            // Apply discount (percent)
            const discountAmount = totalPrice * (foundCoupon.discount / 100);
            totalPrice -= discountAmount;
        }

        await prisma.booking.update({
            where: { id: data.id },
            data: {
                pickupDate: pickup,
                returnDate: returnDt,
                pickupPoint: data.pickupPoint,
                returnPoint: data.returnPoint,
                price: totalPrice,
            },
        });

        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        // Kiểm tra lỗi unique constraint từ Prisma
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
            return {
                success: false,
                error: true,
                message: 'Mã giảm giá đã tồn tại',
            };
        }
        return { success: false, error: true, message: 'Update failed' };
    }
};
