'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Bell, Menu } from 'lucide-react';

import { useAdmin } from '@/context/AdminContext';
import { useNotificationStore } from '@/store/notification';

import NotificationModal from './notification/NotificationModal';

interface PageListHeaderProps {
    breadcrumbs: Array<{ href: string; label: string }>;
    current: string;
}

export default function PageHeader({ breadcrumbs, current }: PageListHeaderProps) {
    const { toggleSidebar } = useAdmin();

    const [showNotification, setShowNotification] = useState(false);
    const { notifyNewCount, fetchNotifyNewCount } = useNotificationStore();

    useEffect(() => {
        fetchNotifyNewCount();
    }, [fetchNotifyNewCount]);

    return (
        <>
            <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3 dark:border-slate-800 dark:bg-slate-850">
                <div className="flex items-center gap-2 text-sm">
                    {breadcrumbs.map(({ href, label }, index) => (
                        <div key={index} className="space-x-2 text-nowrap">
                            <Link href={href} className="text-slate-500 hover:text-primary dark:text-slate-400">
                                {label}
                            </Link>
                            <span className="text-slate-400">/</span>
                        </div>
                    ))}
                    <span className="font-medium text-slate-900 dark:text-white sm:max-w-none max-w-24 truncate">
                        {current}
                    </span>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleSidebar} className="p-2 text-slate-600 dark:text-slate-300">
                        <span className="material-symbols-outlined">
                            <Menu size={20} />
                        </span>
                    </button>
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Tuy Hòa, Phú Yên</span>
                    </div>
                    <button
                        onClick={() => setShowNotification(true)}
                        className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 relative"
                    >
                        <span className="material-symbols-outlined">
                            <Bell size={20} />
                        </span>
                        {notifyNewCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                        )}
                    </button>
                </div>
            </header>
            {showNotification && <NotificationModal setShowNotification={setShowNotification} />}
        </>
    );
}
