'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Xử lý Dark Mode
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <AdminContext.Provider value={{ isSidebarOpen, toggleSidebar, closeSidebar, isDarkMode, toggleDarkMode }}>
            {children}
        </AdminContext.Provider>
    );
}

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) throw new Error('useAdmin must be used within AdminProvider');
    return context;
};
