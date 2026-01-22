import AdminLayout from '@/components/layout/AdminLayout';
import { AdminProvider } from '@/context/AdminContext';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AdminProvider>
            <AdminLayout>{children}</AdminLayout>
        </AdminProvider>
    );
}
