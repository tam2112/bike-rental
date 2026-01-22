'use client';

import { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import { deleteMotorById } from '@/lib/actions/motor.action';

import { useMotorStore } from '@/store/motor';
import { useStatusStore } from '@/store/status';

import { usePopup } from './usePopup';

export const useMotorLogic = (itemsPerPage = 5) => {
    const popup = usePopup();

    const { motors, fetchMotors } = useMotorStore();
    const { motorStatuses, fetchMotorStatuses } = useStatusStore();

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
            await Promise.all([fetchMotors(), fetchMotorStatuses()]);
            setIsPending(false);
        };
        loadData();
    }, [fetchMotors, fetchMotorStatuses]);

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
    const filteredMotors = useMemo(() => {
        if (!motors) return [];

        return motors
            .filter((m) => {
                const matchesSearch =
                    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    m.licensePlateNum.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = statusFilter === '' || m.status.id === statusFilter;
                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                if (sortBy === 'newest')
                    return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
                if (sortBy === 'oldest')
                    return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
                if (sortBy === 'price-asc') return a.pricePerDay - b.pricePerDay;
                if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay;
                return 0;
            });
    }, [motors, searchTerm, statusFilter, sortBy]);

    // LOGIC: PHÂN TRANG
    const totalPages = Math.ceil(filteredMotors.length / itemsPerPage);
    const paginatedMotors = filteredMotors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDelete = async (motorId: string) => {
        const result = await deleteMotorById(motorId);
        if (result?.success) {
            popup.success('Xóa xe máy thành công!', 'Tuyệt vời');
            fetchMotors();
        } else {
            popup.error('Xóa thất bại', 'Lỗi');
        }
    };

    // Hàm mở popup xác nhận
    const confirmDelete = (motorId: string, motorName: string) => {
        popup.confirm(
            `Bạn có chắc chắn muốn xóa xe "${motorName}" không? Hành động này không thể hoàn tác.`,
            () => handleDelete(motorId), // Callback sẽ chạy khi click "Xác nhận ngay"
            'Xác nhận xóa',
        );
    };
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
            motorStatuses,
            totalPages,
            paginatedMotors,
            totalCount: filteredMotors.length,
            rawTotal: motors?.length,
        },
        actions: {
            setSearchInput,
            setStatusFilter,
            setSortBy,
            setCurrentPage,
            triggerLoading,
            debouncedSearch,
            fetchMotors,
            setIsPending,
            confirmDelete,
        },
    };
};
