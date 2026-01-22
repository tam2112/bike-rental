import Footer from '@/components/client/common/Footer';
import Navbar from '@/components/client/common/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
