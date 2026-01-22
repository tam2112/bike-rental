import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';
import { adminPath } from './constants/path';
import { adminRole } from './constants/role';

// Paths that don't require authentication
const publicPaths = ['/dang-nhap', '/dang-ky', '/khoi-phuc'];

interface DecodedToken {
    userId: string;
    role: string;
}

export async function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const userId = request.cookies.get('userId')?.value;
    let isExpired = false;

    if (token) {
        try {
            const decoded = jwtDecode<DecodedToken & { exp: number }>(token);
            // Kiểm tra thời gian hết hạn (exp tính bằng giây, Date.now() tính bằng miligiây)
            if (decoded.exp * 1000 < Date.now()) {
                isExpired = true;
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            isExpired = true;
        }
    }

    // Nếu token hết hạn hoặc không có token
    const hasNoValidToken = !token || isExpired;
    const sessionExpired = isExpired || (!token && userId);

    // 1. Nếu đang vào trang public mà có token hợp lệ -> về home
    if (!hasNoValidToken && publicPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 2. Nếu vào trang bảo mật mà token không hợp lệ/hết hạn -> về đăng nhập
    if ((!token || isExpired) && !publicPaths.includes(request.nextUrl.pathname)) {
        const loginUrl = new URL('/dang-nhap', request.url);

        if (sessionExpired) {
            loginUrl.searchParams.set('reason', 'expired');
            const response = NextResponse.redirect(loginUrl);
            response.cookies.delete('token'); // Đảm bảo xóa token cũ
            return response;
        }

        return NextResponse.redirect(loginUrl);
    }

    // 3. Kiểm tra Role cho Admin (chỉ khi token còn hạn)
    if (!hasNoValidToken) {
        const decoded = jwtDecode<DecodedToken>(token!);
        if (request.nextUrl.pathname.startsWith(adminPath) && decoded.role !== adminRole) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

// Update matcher to include admin paths
export const config = {
    matcher: [
        '/dang-nhap',
        '/dang-ky',
        '/khoi-phuc',
        '/quan-tri-vien/:path*', // Match all paths starting with /admin
    ],
};
