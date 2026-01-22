import { z } from 'zod';

export const bookingSchema = () => {
    return z.object({
        id: z.string().optional(),
        motorbikeId: z.string().min(1, { message: 'ID của xe máy là bắt buộc' }),
        pickupDate: z.string().min(1, { message: 'Vui lòng chọn ngày nhận' }),
        returnDate: z.string().min(1, { message: 'Vui lòng chọn ngày trả' }),
        pickupPoint: z.string().min(1, { message: 'Vui lòng nhập điểm nhận xe' }),
        returnPoint: z.string().min(1, { message: 'Vui lòng nhập điểm trả xe' }),
        coupon: z.string().optional(),
        isCouponUsed: z.coerce.boolean().default(false),
        isHelmet: z.coerce.boolean().default(true),
        isScratch: z.coerce.boolean().default(false),
        isRaincoat: z.coerce.boolean().default(false),
        price: z.coerce.number().min(1, { message: 'Tổng giá là bắt buộc' }),
        // Customer info fields
        fullName: z.string().min(1, { message: 'Vui lòng nhập họ tên' }),
        phone: z
            .string()
            .transform((val) => val.replace(/\s/g, '')) // Xóa khoảng trắng trước khi gửi lên server
            .refine((val) => /^(0[3|5|7|8|9])([0-9]{8})$/.test(val), {
                message: 'Số điện thoại không hợp lệ',
            }),
        email: z.string().min(1, { message: 'Vui lòng nhập email' }).email({ message: 'Email không hợp lệ' }),
        idCard: z
            .string()
            .transform((val) => val.replace(/\s/g, '')) // Xóa khoảng trắng trước khi validate/lưu
            .refine((val) => val === '' || /^\d{9}$|^\d{12}$/.test(val), {
                message: 'Số CCCD/CMND phải là 9 hoặc 12 chữ số',
            }),
        note: z.string().optional(),
    });
};

export type BookingSchema = z.infer<ReturnType<typeof bookingSchema>>;

export const updateBookingSchema = () => {
    return z.object({
        id: z.string().optional(),
        motorbikeId: z.string().min(1, { message: 'ID của xe máy là bắt buộc' }),
        pickupDate: z.string().min(1, { message: 'Vui lòng chọn ngày nhận' }),
        returnDate: z.string().min(1, { message: 'Vui lòng chọn ngày trả' }),
        pickupPoint: z.string().min(1, { message: 'Vui lòng nhập điểm nhận xe' }),
        returnPoint: z.string().min(1, { message: 'Vui lòng nhập điểm trả xe' }),
        coupon: z.string().optional(),
        isCouponUsed: z.coerce.boolean().default(false),
        isHelmet: z.coerce.boolean().default(true),
        isScratch: z.coerce.boolean().default(false),
        isRaincoat: z.coerce.boolean().default(false),
    });
};

export type UpdateBookingSchema = z.infer<ReturnType<typeof updateBookingSchema>>;
