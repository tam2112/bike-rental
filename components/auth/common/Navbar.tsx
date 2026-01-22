'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Motorbike } from 'lucide-react';

import ThemeToggler from '@/components/client/helper/ThemeToggler';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e7edf3] dark:border-slate-800 px-4 lg:px-10 py-3 bg-surface-light dark:bg-background-dark transition-colors duration-300">
            <div className="flex items-center gap-4">
                <div onClick={() => router.push('/')} className="size-8 text-primary cursor-pointer">
                    <span className="material-symbols-outlined text-3xl">
                        <Motorbike size={30} />
                    </span>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-neutral-dark dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
                        Aitho
                    </h2>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Phú Yên</span>
                </div>
            </div>
            <div className="flex items-center gap-4 md:gap-8">
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors"
                        href="/"
                    >
                        Trang chủ
                    </Link>
                    <Link
                        className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors"
                        href="/ve-chung-toi"
                    >
                        Về chúng tôi
                    </Link>
                    <Link
                        className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium transition-colors"
                        href="/lien-he"
                    >
                        Liên hệ
                    </Link>
                    <ThemeToggler />
                </nav>
                {pathname === '/dang-nhap' ? (
                    <Link
                        className="flex cursor-pointer items-center justify-center rounded-lg h-10 px-6 border border-primary text-primary hover:bg-primary/5 transition-colors text-sm font-bold leading-normal"
                        href="/dang-ky"
                    >
                        <span className="truncate">Đăng ký</span>
                    </Link>
                ) : (
                    <Link
                        className="flex cursor-pointer items-center justify-center rounded-lg h-10 px-6 border border-primary text-primary hover:bg-primary/5 transition-colors text-sm font-bold leading-normal"
                        href="/dang-nhap"
                    >
                        <span className="truncate">Đăng nhập</span>
                    </Link>
                )}
            </div>
        </header>
    );
}
