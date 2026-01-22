import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';
import { PopupContainer } from '@/components/helper/PopupContainer';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/context/AuthContext';

const beVietnamPro = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'Dịch vụ cho thuê xe máy uy tín tại Tuy Hòa',
    description:
        'Dịch vụ cho thuê xe máy uy tín tại Tuy Hòa. Chúng tôi là startup địa phương, sẵn sàng đồng hành cùng bạn khám phá vẻ đẹp "Hoa Vàng Trên Cỏ Xanh" từ 7:00 sáng đến 22:00 tối mỗi ngày.',
    openGraph: {
        title: 'Dịch vụ cho thuê xe máy uy tín tại Tuy Hòa',
        description:
            'Dịch vụ cho thuê xe máy uy tín tại Tuy Hòa. Chúng tôi là startup địa phương, sẵn sàng đồng hành cùng bạn khám phá vẻ đẹp "Hoa Vàng Trên Cỏ Xanh" từ 7:00 sáng đến 22:00 tối mỗi ngày.',
        images: [
            {
                url: 'https://images.unsplash.com/photo-1760008486577-21baa8b560a5?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                width: 1170,
                height: 1088,
                alt: 'Alt',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={`${beVietnamPro.className} antialiased`}>
                    <ThemeProvider attribute="class" defaultTheme="light">
                        {children}
                        <PopupContainer />
                    </ThemeProvider>
                </body>
            </html>
        </AuthProvider>
    );
}
