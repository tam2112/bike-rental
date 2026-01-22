'use server';

import { cookies } from 'next/headers';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import prisma from '../prisma';

import {
    BasicInfoSchema,
    ChangePasswordSchema,
    loginSchema,
    LoginSchema,
    RecoverSchema,
    recoverSchema,
    signUpSchema,
    SignUpSchema,
    verifyCodeSchema,
} from '../validation/user.form';

import { customerRole } from '@/constants/role';

import { generateToken } from '../auth';
import { sendMail } from '../gmail';

type CurrentState = { success: boolean; error: boolean };

export const initiateSignupOTP = async (
    email: string,
): Promise<{
    success: boolean;
    error: boolean;
    message?: string;
}> => {
    try {
        // Validate email
        const schema = z.object({
            email: z.string().nonempty({ message: 'Vui lòng nhập email' }).email({ message: 'Email không hợp lệ' }),
        });
        schema.parse({ email });

        // Check for existing active OTP to prevent spam
        const existingOTP = await prisma.oTP.findFirst({
            where: {
                email,
                type: 'SIGNUP',
                expiresAt: { gte: new Date() },
            },
        });

        if (existingOTP) {
            return {
                success: false,
                error: true,
                message: 'OTP đã được gửi gần đây. Vui lòng đợi nó hết hạn.',
            };
        }

        // Generate 6-digit verification code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        // Store verification code
        await prisma.oTP.create({
            data: {
                code,
                email,
                type: 'SIGNUP',
                expiresAt,
            },
        });

        // Send verification code via email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Mã xác minh đăng ký của bạn',
            text: `Mã xác minh đăng ký của bạn là: ${code}. Nó hết hạn sau 10 phút.`,
            html: `<p>Mã xác minh đăng ký của bạn là: <strong>${code}</strong>. Nó hết hạn sau 10 phút.</p>`,
        };

        await sendMail(mailOptions);
        console.log(`Đăng ký OTP cho ${email}: ${code}`); // Remove in prod

        return {
            success: true,
            error: false,
            message: 'OTP đã được gửi tới email của bạn',
        };
    } catch (error) {
        console.error('Error in initiateSignupOTP:', error);
        if (error instanceof z.ZodError) {
            return { success: false, error: true, message: error.errors[0].message };
        }
        return { success: false, error: true, message: 'Failed to send OTP' };
    }
};

export const verifySignupOTP = async (
    email: string,
    otp: string,
): Promise<{
    success: boolean;
    error: boolean;
    message?: string;
}> => {
    try {
        if (!otp) {
            return { success: false, error: true, message: 'Vui lòng nhập mã OTP' };
        }

        const verificationOtp = await prisma.oTP.findFirst({
            where: {
                email,
                code: otp,
                type: 'SIGNUP',
                expiresAt: { gte: new Date() },
            },
        });

        if (!verificationOtp) {
            return { success: false, error: true, message: 'Mã OTP không hợp lệ hoặc đã hết hạn' };
        }

        // Không delete OTP ở đây, chỉ verify (delete khi tạo user thành công)
        return { success: true, error: false, message: 'Đã xác minh OTP' };
    } catch (error) {
        console.error('Error in verifySignupOTP:', error);
        return { success: false, error: true, message: 'Verification failed' };
    }
};

// auth session
async function setAuthSession(token: string, userId: string, role: string, fullName: string, email: string) {
    const cookieStore = await cookies();

    // 1. Token hết hạn đúng sau 24 giờ
    const TOKEN_AGE = 24 * 60 * 60;

    // 2. Cookie định danh sống lâu hơn (ví dụ 25 giờ - thêm 1h đệm để cleanup)
    const IDENTITY_AGE = 25 * 60 * 60;

    const baseOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
    };

    // Set Token
    cookieStore.set('token', token, { ...baseOptions, maxAge: TOKEN_AGE });

    // Set các thông tin khác với thời gian sống lâu hơn
    cookieStore.set('userId', userId, { ...baseOptions, maxAge: IDENTITY_AGE });
    cookieStore.set('role', role, { ...baseOptions, maxAge: IDENTITY_AGE });
    cookieStore.set('fullName', fullName, { ...baseOptions, maxAge: IDENTITY_AGE });
    cookieStore.set('email', email, { ...baseOptions, maxAge: IDENTITY_AGE });
}

export async function checkAuthStatus() {
    const cookieStore = await cookies();
    return !!cookieStore.get('token');
}

// Hàm helper cập nhật trạng thái Offline
async function markUserAsOffline(userId: string) {
    const offlineStatus = await prisma.status.findFirst({
        where: { name: 'Ngoại tuyến' },
    });

    if (offlineStatus) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                isActive: false,
                lastLoginAt: new Date(),
                statusId: offlineStatus.id,
            },
        });
    }
}

// Action xử lý dọn dẹp khi Token hết hạn
export const handleExpiredSession = async () => {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('userId')?.value;

        console.log('Đang dọn dẹp phiên cho UserId:', userId);

        if (userId) {
            await markUserAsOffline(userId); // Hàm update DB bạn đã viết
            console.log('Cập nhật DB thành công');
        }

        // Sau khi update DB xong mới xóa sạch dấu vết
        cookieStore.delete('token');
        cookieStore.delete('userId');
        cookieStore.delete('role');
        cookieStore.delete('fullName');
        cookieStore.delete('email');
    } catch (error) {
        console.error('Lỗi khi dọn dẹp phiên:', error);
    }
};

export const signUpUser = async (
    currentState: CurrentState,
    data: SignUpSchema,
): Promise<{
    success: boolean;
    error: boolean;
    message?: string;
    role?: string;
}> => {
    try {
        signUpSchema().parse(data);

        if (data.otp) {
            console.log(`Xác minh OTP cho ${data.email}: ${data.otp}`); // Remove in prod
        } else {
            return {
                success: false,
                error: true,
                message: 'Vui lòng nhập mã OTP',
            };
        }

        // check email exists
        const existingEmail = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingEmail) {
            return {
                success: false,
                error: true,
                message: 'Email đã tồn tại',
            };
        }

        // Lấy role Guest từ database
        const guestRole = await prisma.role.findUnique({
            where: { name: customerRole },
        });

        if (!guestRole) {
            console.error('Guest role not found in database');
            return {
                success: false,
                error: true,
                message: 'Guest role not found',
            };
        }

        // Hash mật khẩu
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Tạo người dùng mới với role Guest
        const newUser = await prisma.user.create({
            data: {
                fullName: data.fullName,
                password: hashedPassword,
                email: data.email,
                roleId: guestRole.id, // Sử dụng ID của role Guest
            },
            include: {
                role: true, // Include role information in the response
            },
        });

        // Find online status
        const onlineStatus = await prisma.status.findFirst({
            where: { name: 'Đang hoạt động' },
        });

        if (!onlineStatus) {
            return {
                success: false,
                error: true,
                message: 'Không tìm thấy trạng thái Đang hoạt động',
            };
        }

        await prisma.user.update({
            where: { id: newUser.id },
            data: {
                isActive: true,
                statusId: onlineStatus.id,
            },
        });

        // Tạo token cho người dùng
        const token = generateToken(newUser.id, newUser.role.name);

        await setAuthSession(token, newUser.id, newUser.role.name, newUser.fullName, newUser.email);

        const result = {
            success: true,
            error: false,
            message: 'Đăng ký thành công',
            role: newUser.role.name,
        };
        console.log('signUpUser result:', result);

        // --- GỬI CHO KHÁCH HÀNG ---
        try {
            await sendMail({
                to: newUser.email,
                subject: `Chào mừng bạn đến với hệ thống, ${newUser.fullName}!`,
                html: `<h3>Đăng ký thành công</h3><p>Chào ${newUser.fullName}, tài khoản của bạn đã sẵn sàng sử dụng.</p>`,
            });
        } catch (e) {
            console.error('Lỗi mail khách:', e);
        }

        // --- GỬI CHO ADMIN (LÀ BẠN) ---
        try {
            await sendMail({
                to: process.env.SENDER_EMAIL,
                subject: `[Admin] Người dùng mới: ${newUser.fullName}`,
                html: `<p>Có thành viên mới: <b>${newUser.fullName}</b> (${newUser.email}) vừa đăng ký vào hệ thống.</p>`,
            });
        } catch (e) {
            console.error('Lỗi mail admin:', e);
        }

        return result;
    } catch (error) {
        console.error('Error in signUpUser:', error);

        return { success: false, error: true };
    }
};

export const signInUser = async (currentState: CurrentState, data: LoginSchema) => {
    try {
        loginSchema().parse(data);

        const user = await prisma.user.findUnique({
            where: { email: data.email },
            include: { role: true }, // Include role information
        });

        if (!user) {
            return {
                success: false,
                error: true,
                message: 'Email không tồn tại',
            };
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                error: true,
                message: 'Mật khẩu không đúng',
            };
        }

        // Find online status
        const onlineStatus = await prisma.status.findFirst({
            where: { name: 'Đang hoạt động' },
        });

        if (!onlineStatus) {
            return {
                success: false,
                error: true,
                message: 'Không tìm thấy trạng thái Đang hoạt động',
            };
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { isActive: true, statusId: onlineStatus.id },
        });

        // Generate token with role information
        const token = generateToken(user.id, user.role.name);

        await setAuthSession(token, user.id, user.role.name, user.fullName, user.email);

        return {
            success: true,
            error: false,
            role: user.role.name, // Include role in response
        };
    } catch (error) {
        console.error('Error in signInUser:', error);
        return { success: false, error: true, message: 'Sign in failed' };
    }
};

export const logoutUser = async (): Promise<{
    success: boolean;
    error: boolean;
    message?: string;
}> => {
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

        // Find offline status
        const offlineStatus = await prisma.status.findFirst({
            where: { name: 'Ngoại tuyến' },
        });

        if (!offlineStatus) {
            return {
                success: false,
                error: true,
                message: 'Không tìm thấy trạng thái Ngoại tuyến',
            };
        }

        await markUserAsOffline(userId);

        // 2. Xóa sạch Cookies
        cookieStore.delete('token');
        cookieStore.delete('userId');
        cookieStore.delete('role');
        cookieStore.delete('fullName');
        cookieStore.delete('email');

        return {
            success: true,
            error: false,
            message: 'Đăng xuất thành công',
        };
    } catch (error) {
        console.error('Error in logoutUser:', error);
        return { success: false, error: true, message: 'Logout failed' };
    }
};

// Password Recovery Actions
export const initiatePasswordRecovery = async (currentState: CurrentState, data: { email: string }) => {
    try {
        // Validate email
        const schema = recoverSchema();
        schema.parse({ email: data.email });

        // Check if email exists
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            return {
                success: false,
                error: true,
                message: 'Email không tồn tại',
            };
        }

        // Generate 6-digit verification code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        // Store verification code
        await prisma.oTP.create({
            data: {
                code,
                userId: user.id,
                email: data.email,
                type: 'RECOVER',
                expiresAt,
            },
        });

        // Send verification code via email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: data.email,
            subject: 'Mã khôi phục mật khẩu của bạn',
            text: `Mã khôi phục mật khẩu của bạn là: ${code}`,
            html: `<p>OTP: <strong>${code}</strong></p>`,
        };

        await sendMail(mailOptions);
        console.log(`Verification code for ${data.email}: ${code}`);

        return {
            success: true,
            error: false,
            userId: user.id,
            message: 'OTP đã gửi tới email',
        };
    } catch (error) {
        console.error('Error in initiatePasswordRecovery:', error);
        if (error instanceof z.ZodError) {
            return { success: false, error: true, message: error.message };
        }
        return { success: false, error: true, message: 'Recovery failed' };
    }
};

export const verifyRecoveryCode = async (
    currentState: CurrentState,
    data: { userId: string; verificationCode: string },
) => {
    try {
        // Validate code
        const schema = verifyCodeSchema();
        schema.parse({ verificationCode: data.verificationCode });

        // Find verification code
        const verificationCode = await prisma.oTP.findFirst({
            where: {
                userId: data.userId,
                type: 'RECOVER',
                code: data?.verificationCode,
                expiresAt: { gte: new Date() },
            },
        });

        if (!verificationCode) {
            return {
                success: false,
                error: true,
                message: 'Mã OTP không hợp lệ hoặc đã hết hạn',
            };
        }

        // Code is valid, delete it to prevent reuse
        await prisma.oTP.delete({
            where: { id: verificationCode.id },
        });

        return {
            success: true,
            error: false,
            message: 'OTP đã được xác minh thành công',
        };
    } catch (error) {
        console.error('Error in verifyRecoveryCode:', error);
        if (error instanceof z.ZodError) {
            return { success: false, error: true, message: error.message };
        }
        return { success: false, error: true, message: 'Recovery failed' };
    }
};

export const completePasswordRecovery = async (
    currentState: CurrentState,
    data: RecoverSchema & { userId: string },
) => {
    try {
        // Validate input
        recoverSchema().parse(data);

        // Find user
        const user = await prisma.user.findUnique({
            where: { id: data.userId },
        });

        if (!user) {
            return {
                success: false,
                error: true,
                message: 'Không tìm thấy người dùng',
            };
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(data.newPassword!, 10);

        // Update password
        await prisma.user.update({
            where: { id: data.userId },
            data: { password: hashedNewPassword },
        });

        return {
            success: true,
            error: false,
            message: 'Đặt lại mật khẩu thành công',
        };
    } catch (error) {
        console.error('Error in completePasswordRecovery:', error);
        if (error instanceof z.ZodError) {
            return { success: false, error: true, message: error.message };
        }
        return { success: false, error: true, message: 'Recovery failed' };
    }
};

export const getUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                fullName: true,
                email: true,
                avatar: { select: { url: true } },
                location: true,
                idCard: true,
                phone: true,
                isActive: true,
                lastLoginAt: true,
                role: { select: { name: true } },
                status: { select: { id: true, name: true } },
                createdAt: true,
            },
        });
        return users;
    } catch (error) {
        console.error(error);
    }
};

export const getCustomers = async () => {
    try {
        const users = await prisma.user.findMany({
            where: { role: { name: customerRole } },
            select: {
                id: true,
                fullName: true,
                email: true,
                avatar: { select: { url: true } },
                location: true,
                idCard: true,
                phone: true,
                isActive: true,
                lastLoginAt: true,
                role: { select: { name: true } },
                status: { select: { id: true, name: true } },
                createdAt: true,
            },
        });
        return users;
    } catch (error) {
        console.error(error);
    }
};

export const getCurrentUser = async () => {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('userId')?.value;

        const user = await prisma.user.findFirst({
            where: { id: userId },
            select: {
                id: true,
                fullName: true,
                email: true,
                avatar: { select: { url: true } },
                location: true,
                idCard: true,
                phone: true,
                isActive: true,
                lastLoginAt: true,
                role: { select: { name: true } },
                status: { select: { id: true, name: true } },
                createdAt: true,
            },
        });
        return user;
    } catch (error) {
        console.error(error);
    }
};

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                fullName: true,
                email: true,
                avatar: { select: { url: true } },
                location: true,
                idCard: true,
                phone: true,
                isActive: true,
                lastLoginAt: true,
                role: { select: { name: true } },
                status: { select: { id: true, name: true } },
                createdAt: true,
            },
        });
        return user;
    } catch (error) {
        console.error(error);
    }
};

export const updateBasicInfo = async (
    currentState: CurrentState,
    data: BasicInfoSchema & { avatarUrls?: string[] },
) => {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('userId')?.value;

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                fullName: data.fullName,
                phone: data.phone,
                idCard: data.idCard,
                location: data.location,
            },
        });

        await prisma.image.deleteMany({
            where: { userId: updatedUser.id },
        });

        if (data.avatarUrls && data.avatarUrls.length > 0) {
            await prisma.image.createMany({
                data: data.avatarUrls.map((url) => ({
                    url,
                    userId: updatedUser.id,
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
                message: 'Something already exists',
            };
        }
        return { success: false, error: true, message: 'Update failed' };
    }
};

export const changePassword = async (currentState: CurrentState, data: ChangePasswordSchema) => {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get('userId')?.value;

        // Find user
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return {
                success: false,
                error: true,
                message: 'ID của người dùng là bắt buộc',
            };
        }

        // Verify old password
        const isPasswordValid = await bcrypt.compare(data.oldPassword, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                error: true,
                message: 'Mật khẩu cũ không khớp',
            };
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);

        // Update password
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });

        return { success: true, error: false };
    } catch (error) {
        console.log(error);
        // Kiểm tra lỗi unique constraint từ Prisma
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
            return {
                success: false,
                error: true,
                message: 'Something already exists',
            };
        }
        return { success: false, error: true, message: 'Update failed' };
    }
};
