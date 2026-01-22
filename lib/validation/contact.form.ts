import { z } from 'zod';

export const contactSchema = () => {
    return z.object({
        fullName: z.string().min(1, { message: 'Vui lòng nhập họ tên' }),
        phone: z
            .string()
            .transform((val) => val.replace(/\s/g, '')) // Xóa khoảng trắng trước khi gửi lên server
            .refine((val) => /^(0[3|5|7|8|9])([0-9]{8})$/.test(val), {
                message: 'Số điện thoại không hợp lệ',
            }),
        email: z.string().optional(),
        content: z.string().min(1, { message: 'Vui lòng nhập nội dung cần hỗ trợ' }),
    });
};

export type ContactSchema = z.infer<ReturnType<typeof contactSchema>>;
