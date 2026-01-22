'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { Moon, Sun } from 'lucide-react';

export default function ThemeToggler() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="w-14 h-7" />; // Placeholder để tránh lệch layout khi load

    const isDark = theme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`
                relative w-14 h-7 rounded-full p-1 transition-colors duration-500 ease-in-out
                ${isDark ? 'bg-slate-700' : 'bg-blue-100'}
                focus:outline-none focus:ring-2 focus:ring-primary/20
            `}
            aria-label="Toggle Dark Mode"
        >
            {/* Thanh trượt (Circle) */}
            <div
                className={`
                    flex items-center justify-center size-5 rounded-full shadow-md transform transition-transform duration-500 ease-in-out
                    ${isDark ? 'translate-x-7 bg-slate-900' : 'translate-x-0 bg-white'}
                `}
            >
                {isDark ? (
                    <Moon size={12} className="text-blue-400 fill-blue-400" />
                ) : (
                    <Sun size={12} className="text-yellow-500 fill-yellow-500" />
                )}
            </div>

            {/* Icons nền (Tùy chọn để đẹp hơn) */}
            <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                <Sun
                    size={10}
                    className={`${isDark ? 'opacity-0' : 'opacity-40'} text-yellow-600 transition-opacity`}
                />
                <Moon size={10} className={`${isDark ? 'opacity-40' : 'opacity-0'} text-blue-300 transition-opacity`} />
            </div>
        </button>
    );
}
