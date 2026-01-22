'use client';

import { useAdmin } from '@/context/AdminContext';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Link from 'next/link';

interface SidebarItemProps {
    icon: ReactNode;
    label: string;
    href: string;
    isOpen: boolean;
}

export default function SidebarItem({ icon, label, href, isOpen }: SidebarItemProps) {
    const { closeSidebar } = useAdmin();

    const handleNavigation = () => {
        // Kiểm tra nếu là mobile (width < 768px) thì mới tự động đóng
        if (window.innerWidth < 768) {
            closeSidebar();
        }
    };

    const pathname = usePathname();
    const active = pathname === href || (href !== '/quan-tri-vien' && pathname.startsWith(`${href}/`));

    return (
        <Link
            href={href}
            onClick={handleNavigation}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                active
                    ? 'bg-primary text-white'
                    : 'text-neutral-dark dark:text-slate-300 hover:bg-neutral-light dark:hover:bg-slate-700'
            }`}
        >
            <span className="shrink-0">{icon}</span>
            <span
                className={`text-sm font-medium whitespace-nowrap transition-all duration-300 md:origin-left ${
                    isOpen ? 'opacity-100 scale-100' : 'opacity-100 md:opacity-0 md:scale-0 md:w-0'
                }`}
            >
                {label}
            </span>
        </Link>
    );
}
