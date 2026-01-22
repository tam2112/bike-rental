import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white py-6 dark:bg-background-dark border-t border-slate-100 dark:border-slate-800">
            <div className="mx-auto flex flex-col items-center justify-between gap-4 px-10 text-center md:flex-row md:text-left">
                <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                    © 2026 Aitho Phú Yên. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <Link
                        className="text-xs font-medium text-gray-500 hover:text-neutral-gray dark:text-gray-400 dark:hover:text-white transition-colors"
                        href="#"
                    >
                        Điều khoản thuê xe
                    </Link>
                    <Link
                        className="text-xs font-medium text-gray-500 hover:text-neutral-gray dark:text-gray-400 dark:hover:text-white transition-colors"
                        href="#"
                    >
                        Chính sách bảo mật
                    </Link>
                </div>
            </div>
        </footer>
    );
}
