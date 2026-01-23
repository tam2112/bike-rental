'use client';

import { useTheme } from 'next-themes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';

export default function ThemeTogglerMobile({
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="px-3 py-2.5 h-11" />; // Placeholder để tránh lệch layout khi load

    const isDark = theme === 'dark';

    return (
        <div
            className="flex items-center justify-between px-6 py-4 text-neutral-dark dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            onClick={() => {
                setTheme(isDark ? 'light' : 'dark');
                setIsOpen(false);
            }}
        >
            {isDark ? 'Giao diện sáng' : 'Giao diện tối'}
            {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-slate-600" />}
        </div>
    );
}
