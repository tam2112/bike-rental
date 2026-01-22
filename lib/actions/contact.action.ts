'use server';

import { ContactSchema } from '../validation/contact.form';

import { sendMail } from '../gmail';

type CurrentState = { success: boolean; error: boolean };

export const sendContact = async (currentState: CurrentState, data: ContactSchema) => {
    try {
        await sendMail({
            from: `"${data.fullName}" <${data.email}>`,
            to: process.env.SENDER_EMAIL,
            subject: `[Yêu cầu hỗ trợ] Khách hàng: ${data.fullName}`,
            html: `
                <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
                    <h2 style="color: #2563eb;">Thông tin liên hệ mới</h2>
                    <p><strong>Họ tên:</strong> ${data.fullName}</p>
                    <p><strong>Số điện thoại:</strong> ${data.phone}</p>
                    <p><strong>Email:</strong> ${data.email || 'Không cung cấp'}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p><strong>Nội dung hỗ trợ:</strong></p>
                    <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
                        ${data.content.replace(/\n/g, '<br/>')}
                    </div>
                </div>
            `,
        });

        return { success: true, error: false, messgae: 'Cảm ơn bạn! Tin nhắn của bạn đã được gửi thành công.' };
    } catch (error) {
        console.log(error);
        return { success: false, error: true, message: 'Đã xảy ra lỗi khi gửi mail. Vui lòng thử lại sau.' };
    }
};
