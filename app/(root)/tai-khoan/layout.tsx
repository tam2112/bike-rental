import Sidebar from '@/components/client/helper/account/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 flex flex-col lg:flex-row max-w-360 w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
            <Sidebar />
            {children}
        </div>
    );
}
