import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Bảo mật: Kiểm tra Secret Key để chỉ Cron Job mới được gọi API này
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const twentyFiveHoursAgo = new Date(Date.now() - 25 * 60 * 60 * 1000);

        // Tìm trạng thái Ngoại tuyến
        const offlineStatus = await prisma.status.findFirst({
            where: { name: 'Ngoại tuyến' },
        });

        // Cập nhật tất cả User đang Active nhưng không hoạt động > 24h
        const result = await prisma.user.updateMany({
            where: {
                isActive: true,
                // Giả sử bạn đã thêm cột lastActivityAt
                // Nếu chưa có, tạm dùng lastLoginAt nhưng sẽ không chính xác bằng
                lastLoginAt: { lt: twentyFiveHoursAgo },
            },
            data: {
                isActive: false,
                statusId: offlineStatus?.id,
            },
        });

        return NextResponse.json({
            success: true,
            message: `Đã dọn dẹp ${result.count} người dùng treo.`,
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Cleanup failed' }, { status: 500 });
    }
}
