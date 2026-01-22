'use client';

import { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import { cancelBooking, updateBookingStatus } from '@/lib/actions/booking.action';

import { useStatusStore } from '@/store/status';
import { useBookingStore } from '@/store/booking';

import { BookingStatusType } from '@/types/booking';

import { usePopup } from './usePopup';

export const useBookingLogic = (itemsPerPage = 5) => {
    const popup = usePopup();

    const { bookings, fetchBookings } = useBookingStore();
    const { bookingStatuses, fetchBookingStatuses } = useStatusStore();

    // Local States cho Logic
    const [searchTerm, setSearchTerm] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsPending(true);
            await Promise.all([fetchBookings(), fetchBookingStatuses()]);
            setIsPending(false);
        };
        loadData();
    }, [fetchBookings, fetchBookingStatuses]);

    // Hàm xử lý thay đổi trạng thái
    const handleUpdateStatus = async (bookingId: string, statusId: BookingStatusType, statusName: string) => {
        popup.confirm(
            `Bạn có chắc chắn muốn đổi trạng thái đơn hàng sang "${statusName}"?`,
            async () => {
                setIsPending(true);
                try {
                    const result = await updateBookingStatus(bookingId, statusId);

                    if (result.success) {
                        popup.success(result.message, 'Thành công');
                        await fetchBookings(); // Tải lại danh sách sau khi update
                    } else {
                        popup.error(result.message, 'Thất bại');
                    }
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    popup.error('Có lỗi xảy ra khi cập nhật', 'Lỗi');
                } finally {
                    setIsPending(false);
                }
            },
            'Xác nhận cập nhật',
        );
    };

    const handleCancelBooking = async (bookingId: string) => {
        setIsPending(true);
        try {
            const response = await cancelBooking(bookingId);
            if (response.success) {
                popup.success('Hủy đơn đặt xe thành công!!');
                await fetchBookings();
            } else {
                popup.error(response.message || 'Có lỗi xảy ra khi hủy');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setIsPending(false);
        }
    };

    const confirmCancel = (bookingId: string) => {
        popup.confirm(
            `Bạn có chắc chắn muốn hủy đơn đặt xe này không? Hành động này không thể hoàn tác.`,
            () => handleCancelBooking(bookingId),
            'Xác nhận hủy',
        );
    };

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                setSearchTerm(value);
                setCurrentPage(1);
            }, 500),
        [], // chỉ tạo 1 lần
    );

    // Giả lập hiệu ứng loading khi filter/chuyển trang
    const triggerLoading = (callback: () => void) => {
        setIsPending(true);
        setTimeout(() => {
            callback();
            setIsPending(false);
        }, 400); // Hiệu ứng mượt mà 400ms
    };

    // LOGIC: SEARCH, FILTER & SORT
    const filteredBookings = useMemo(() => {
        if (!bookings) return [];

        return bookings
            .filter((m) => {
                const matchesSearch =
                    m.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    m.motorbike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    m.motorbike.licensePlateNum.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = statusFilter === '' || m.status.id === statusFilter;
                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                if (sortBy === 'newest')
                    return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
                if (sortBy === 'oldest')
                    return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
                return 0;
            });
    }, [bookings, searchTerm, statusFilter, sortBy]);

    // LOGIC: PHÂN TRANG
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Animation Variants
    const pageVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    return {
        state: {
            pageVariants,
            searchTerm,
            searchInput,
            statusFilter,
            sortBy,
            currentPage,
            isPending,
            bookingStatuses,
            totalPages,
            paginatedBookings,
            totalCount: filteredBookings.length,
            rawTotal: bookings?.length,
        },
        actions: {
            setSearchInput,
            setStatusFilter,
            setSortBy,
            setCurrentPage,
            triggerLoading,
            debouncedSearch,
            fetchBookings,
            setIsPending,
            handleUpdateStatus,
            confirmCancel,
        },
    };
};
