'use client';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { checkAuthStatus, logoutUser } from '@/lib/actions/user.action';

import { usePopup } from '@/hooks/usePopup';

type AuthContextType = {
    isLoggedIn: boolean;
    setIsLoggedIn: (status: boolean) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const popup = usePopup();

    useEffect(() => {
        // Gọi action để kiểm tra trạng thái từ Server
        checkAuthStatus().then((status) => setIsLoggedIn(status));
    }, []);

    const logout = async () => {
        try {
            await logoutUser();

            popup.success('Đăng xuất thành công!!', 'Tuyệt vời');
            router.push('/dang-nhap');
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Logout error:', error);
            popup.error('Đăng xuất thất bại!!', 'OOPS');
            setIsLoggedIn(false);
        }
    };

    return <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
