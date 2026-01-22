import Footer from '@/components/auth/common/Footer';
import Navbar from '@/components/auth/common/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden flex flex-col min-h-screen transition-colors duration-300">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
