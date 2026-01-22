'use client';

import { useEffect } from 'react';

import { Key, Motorbike, Users, Wallet } from 'lucide-react';

import { useDashboardStore } from '@/store/dashboard';
import { useBookingStore } from '@/store/booking';

import { DashboardCard, LineChart, PieChart, RecentRent } from './home';

export default function Dashboard() {
    const {
        revenue,
        revenueMonthTitle,
        revenueDescription,
        revenuePercent,
        bookingCount,
        motorCount,
        customerCount,
        statusCount,
        newBookingsToday,
        newCustomersMonth,
        fetchRevenue,
        fetchBookingCount,
        fetchMotorCount,
        fetchCustomerCount,
        fetchStatusCount,
        fetchNewBookingsToday,
        fetchNewCustomersMonth,
        isLoadingDashboard,
    } = useDashboardStore();

    const { bookings, fetchBookings, isLoading } = useBookingStore();

    useEffect(() => {
        fetchRevenue();
        fetchBookingCount();
        fetchMotorCount();
        fetchCustomerCount();
        fetchStatusCount();
        fetchNewBookingsToday();
        fetchNewCustomersMonth();
        fetchBookings();
    }, [
        fetchRevenue,
        fetchBookingCount,
        fetchMotorCount,
        fetchCustomerCount,
        fetchStatusCount,
        fetchNewBookingsToday,
        fetchNewCustomersMonth,
        fetchBookings,
    ]);

    const pieChartData = [
        { name: 'Đang chờ', value: statusCount.pending, color: '#eab308' },
        { name: 'Đã xác nhận', value: statusCount.confirmed, color: '#4285f4' },
        { name: 'Đang thuê', value: statusCount.renting, color: '#e76f51' },
        { name: 'Hoàn thành', value: statusCount.finish, color: '#34a853' },
        { name: 'Đã hủy', value: statusCount.cancel, color: '#dd2d4a' },
    ];

    return (
        <div className="flex-1 overflow-y-auto p-6 bg-background-light dark:bg-background-dark">
            <div className="mx-auto flex flex-col gap-6">
                {/* dashboard cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <DashboardCard
                        title={`Doanh thu ${revenueMonthTitle}`}
                        icon={<Wallet size={20} />}
                        value={revenue}
                        isTrending
                        percent={revenuePercent}
                        description={revenueDescription}
                        variant="revenue"
                        isLoading={isLoadingDashboard}
                    />
                    <DashboardCard
                        title="Số lượng đơn hàng"
                        icon={<Key size={20} />}
                        value={bookingCount}
                        isTrending
                        currentValue={newBookingsToday}
                        description="đơn mới hôm nay"
                        variant="rent"
                        isLoading={isLoadingDashboard}
                    />
                    <DashboardCard
                        title="Tổng xe máy"
                        icon={<Motorbike size={20} />}
                        value={motorCount}
                        description="Sẵn sàng giao ngay"
                        variant="airplane"
                        isLoading={isLoadingDashboard}
                    />
                    <DashboardCard
                        title="Tổng khách hàng"
                        icon={<Users size={20} />}
                        value={customerCount}
                        isTrending
                        currentValue={newCustomersMonth}
                        description="khách mới tháng này"
                        variant="customer"
                        isLoading={isLoadingDashboard}
                    />
                </div>
                {/* charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* line chart */}
                    <LineChart />
                    {/* pie chart */}
                    <PieChart data={pieChartData} isLoading={isLoadingDashboard} />
                </div>
                {/* recent rent */}
                <RecentRent bookings={bookings} isLoading={isLoading} />
            </div>
        </div>
    );
}
