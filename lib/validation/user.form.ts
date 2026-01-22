import { z } from 'zod';

export const signUpSchema = () => {
    return z
        .object({
            id: z.string().optional(),
            fullName: z.string().nonempty({ message: 'Vui lòng nhập họ tên' }),
            email: z.string().nonempty({ message: 'Vui lòng nhập email' }).email({ message: 'Email không hợp lệ' }),
            password: z.string().nonempty({ message: 'Vui lòng nhập mật khẩu' }),
            confirmPassword: z.string().min(1, { message: 'Vui lòng nhập xác nhận mật khẩu' }),
            otp: z.string().optional(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Mật khẩu không khớp!',
            path: ['confirmPassword'], // Specify which field this error applies to
        });
};

export type SignUpSchema = z.infer<ReturnType<typeof signUpSchema>>;

export const loginSchema = () => {
    return z.object({
        email: z.string().nonempty({ message: 'Vui lòng nhập email' }).email({ message: 'Email không hợp lệ' }),
        password: z.string().nonempty({ message: 'Vui lòng nhập mật khẩu' }),
    });
};

export type LoginSchema = z.infer<ReturnType<typeof loginSchema>>;

export const userSchema = () => {
    return z.object({
        id: z.string().optional(),
        avatar: z.array(z.string()).optional(),
        fullName: z.string().min(1, { message: 'Vui lòng nhập họ tên' }),
        email: z.string().nonempty({ message: 'Vui lòng nhập email' }).email({ message: 'Email không hợp lệ' }),
        password: z.string().nonempty({ message: 'Vui lòng nhập mật khẩu' }),
        phone: z.string().optional(),
        idCard: z.string().optional(),
        location: z.string().optional(),
        roleId: z.string().min(1, { message: 'Vui lòng chọn quyền truy cập' }),
    });
};

export type UserSchema = z.infer<ReturnType<typeof userSchema>>;

export const basicInfoSchema = () => {
    return z.object({
        avatarUrls: z.array(z.string()).optional(),
        fullName: z.string().min(1, { message: 'Vui lòng nhập họ tên' }),
        phone: z
            .string()
            .transform((val) => val.replace(/\s/g, '')) // Xóa khoảng trắng trước khi gửi lên server
            .refine((val) => /^(0[3|5|7|8|9])([0-9]{8})$/.test(val), {
                message: 'Số điện thoại không hợp lệ',
            })
            .optional(),
        idCard: z
            .string()
            .transform((val) => val.replace(/\s/g, '')) // Xóa khoảng trắng trước khi validate/lưu
            .refine((val) => val === '' || /^\d{9}$|^\d{12}$/.test(val), {
                message: 'Số CCCD/CMND phải là 9 hoặc 12 chữ số',
            })
            .optional(),
        location: z.string().optional(),
    });
};

export type BasicInfoSchema = z.infer<ReturnType<typeof basicInfoSchema>>;

export const changePasswordSchema = () => {
    return z
        .object({
            oldPassword: z.string().min(1, { message: 'Vui lòng nhập mật khẩu cũ' }),
            newPassword: z.string().min(1, { message: 'Vui lòng nhập mật khẩu mới' }),
            confirmNewPassword: z.string().min(1, { message: 'Vui lòng nhập xác nhận mật khẩu mới' }),
        })
        .refine((data) => !data.newPassword || data.newPassword === data.confirmNewPassword, {
            message: 'Mật khẩu không khớp',
            path: ['confirmNewPassword'],
        });
};

export type ChangePasswordSchema = z.infer<ReturnType<typeof changePasswordSchema>>;

export const recoverSchema = () => {
    return z
        .object({
            email: z.string().nonempty({ message: 'Vui lòng nhập email' }).email({ message: 'Email không hợp lệ' }),
            verificationCode: z
                .string()
                .optional()
                .refine((value) => !value || /^\d{6}$/.test(value), { message: 'Invalid OTP' }),
            newPassword: z.string().optional(),
            confirmNewPassword: z.string().optional(),
        })
        .refine((data) => !data.newPassword || data.newPassword === data.confirmNewPassword, {
            message: 'Mật khẩu không khớp',
            path: ['confirmNewPassword'],
        });
};

export type RecoverSchema = z.infer<ReturnType<typeof recoverSchema>>;

export const verifyCodeSchema = () => {
    return z.object({
        verificationCode: z
            .string()
            .nonempty({ message: 'OTP is required' })
            .refine((value) => /^\d{6}$/.test(value), { message: 'Invalid OTP' }),
    });
};

export type VerifyCodeSchema = z.infer<ReturnType<typeof verifyCodeSchema>>;
