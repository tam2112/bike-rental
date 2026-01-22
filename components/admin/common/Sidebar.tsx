'use client';

import {
    CalendarDays,
    ChevronsLeft,
    ChevronsRight,
    LayoutDashboard,
    LogOut,
    Motorbike,
    Star,
    TicketPercent,
    Users,
    X,
} from 'lucide-react';

import { useAuth } from '@/context/AuthContext';
import { adminPath, couponPath, customerPath, motorPath, orderPath, ratingPath } from '@/constants/path';

import SidebarItem from './helper/SidebarItem';
import ThemeToggler from './helper/ThemeToggler';

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
    const { logout } = useAuth();

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={toggleSidebar}
            />
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-850 border-r border-slate-200 dark:border-slate-800 
                    transition-all duration-300 ease-in-out
                    md:relative md:translate-x-0 
                    ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'}
                `}
            >
                <div className="flex flex-col h-full p-4 justify-between">
                    <div className="flex flex-col gap-6">
                        {/* Header: Logo & Toggle Button */}
                        <div className="flex items-center justify-between overflow-hidden">
                            <div
                                className={`flex items-center gap-3 px-2 transition-opacity duration-300 ${
                                    !isOpen && 'opacity-0 w-0'
                                }`}
                            >
                                <div
                                    className={`flex items-center gap-3 px-2 transition-opacity duration-300 ${
                                        !isOpen && 'md:opacity-0 md:w-0'
                                    }`}
                                >
                                    <Motorbike size={28} className="text-primary shrink-0" />
                                    <div className="flex flex-col whitespace-nowrap">
                                        <h2 className="text-neutral-dark dark:text-white text-xl font-bold whitespace-nowrap">
                                            Aitho
                                        </h2>
                                        <span className="text-[10px] font-bold text-accent uppercase">Quản trị</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={toggleSidebar}
                                className="-translate-x-2 cursor-pointer size-8 rounded-full bg-neutral-light dark:bg-slate-800 text-neutral-dark dark:text-white flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            >
                                <div className="md:hidden">
                                    <X size={20} />
                                </div>
                                <div className="hidden md:block">
                                    {isOpen ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
                                </div>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex flex-col gap-2">
                            <SidebarItem
                                icon={<LayoutDashboard size={20} />}
                                label="Tổng quan"
                                href={adminPath}
                                isOpen={isOpen}
                            />
                            <SidebarItem
                                icon={<CalendarDays size={20} />}
                                label="Đơn đặt xe"
                                href={orderPath}
                                isOpen={isOpen}
                            />
                            <SidebarItem
                                icon={<Motorbike size={20} />}
                                label="Kho xe"
                                href={motorPath}
                                isOpen={isOpen}
                            />
                            <SidebarItem
                                icon={<TicketPercent size={20} />}
                                label="Phiếu giảm giá"
                                href={couponPath}
                                isOpen={isOpen}
                            />
                            <SidebarItem
                                icon={<Users size={20} />}
                                label="Khách hàng"
                                href={customerPath}
                                isOpen={isOpen}
                            />
                            <SidebarItem
                                icon={<Star size={20} />}
                                label="Đánh giá xe"
                                href={ratingPath}
                                isOpen={isOpen}
                            />
                            {/* <SidebarItem
                                icon={<ReceiptText size={20} />}
                                label="Báo cáo"
                                href="/quan-tri-vien/bao-cao"
                                isOpen={isOpen}
                            /> */}
                        </nav>
                    </div>

                    {/* Footer Section */}
                    <div className="flex flex-col gap-2 border-t border-slate-200 dark:border-slate-800 pt-4 overflow-hidden">
                        {isOpen && (
                            <div className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-2 transition-opacity duration-300">
                                <p className="text-xs font-semibold text-primary mb-1">Giờ hoạt động</p>
                                <p className="text-xs text-slate-600 dark:text-slate-400">07:00 AM - 10:00 PM</p>
                            </div>
                        )}
                        <ThemeToggler isOpen={isOpen} />
                        {/* <SidebarItem
                            icon={<Settings size={20} />}
                            label="Cài đặt"
                            href="/quan-tri-vien/cai-dat"
                            isOpen={isOpen}
                        /> */}
                        <button
                            onClick={logout}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-red-600 hover:bg-red-50`}
                        >
                            <span className="shrink-0">
                                <LogOut />
                            </span>
                            <span
                                className={`text-sm font-medium whitespace-nowrap transition-all duration-300 md:origin-left ${
                                    isOpen ? 'opacity-100 scale-100' : 'opacity-100 md:opacity-0 md:scale-0 md:w-0'
                                }`}
                            >
                                Đăng xuất
                            </span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
