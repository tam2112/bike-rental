'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';

export default function ThemeToggler({ isOpen }: { isOpen: boolean }) {
    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="px-3 py-2.5 h-11" />; // Placeholder để tránh lệch layout khi load

    const isDark = theme === 'dark';

    return (
        <div
            className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-neutral-light dark:hover:bg-slate-800 transition-colors group cursor-pointer"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
            <div className="flex items-center gap-3">
                {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-slate-600" />}
                <span
                    className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                        isOpen ? 'opacity-100' : 'opacity-0 md:w-0 overflow-hidden'
                    }`}
                >
                    {isDark ? 'Giao diện sáng' : 'Giao diện tối'}
                </span>
            </div>

            {/* Switch UI (Chỉ hiện khi Sidebar mở) */}
            {isOpen && (
                <div
                    className={`w-8 h-4 flex items-center rounded-full p-1 transition-colors ${
                        isDark ? 'bg-primary' : 'bg-slate-300'
                    }`}
                >
                    <div
                        className={`bg-white size-3 rounded-full shadow-md transform transition-transform ${
                            isDark ? 'translate-x-3' : 'translate-x-0'
                        }`}
                    />
                </div>
            )}
        </div>
    );
}
