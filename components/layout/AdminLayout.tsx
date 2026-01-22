'use client';

import { usePathname } from 'next/navigation';

import { useAdmin } from '@/context/AdminContext';

import Navbar from '../admin/common/Navbar';
import Sidebar from '../admin/common/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isDashboard = pathname === '/quan-tri-vien';
    const { isSidebarOpen, toggleSidebar, isDarkMode, toggleDarkMode } = useAdmin();

    return (
        <div className="bg-background-light dark:bg-background-dark font-sans text-neutral-dark dark:text-white antialiased overflow-hidden">
            <div className="flex h-screen w-full">
                <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                />
                <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                    {isDashboard && <Navbar toggleSidebar={toggleSidebar} />}
                    {children}
                </div>
            </div>
        </div>
    );
}
