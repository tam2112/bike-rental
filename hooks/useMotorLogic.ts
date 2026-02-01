'use client';

import { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import { deleteMotorById, deleteSelectedMotors } from '@/lib/actions/motor.action';

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
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setIsPending(true);
            await Promise.all([fetchMotors(), fetchMotorStatuses()]);
            setIsPending(false);
        };
        loadData();
    }, [fetchMotors, fetchMotorStatuses]);

    useEffect(() => {
        setSelectedIds([]);
    }, [currentPage]);

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
    const currentPageIds = paginatedMotors.map((c) => c.id);

    const handleDelete = async (motorId: string) => {
        const result = await deleteMotorById(motorId);
        if (result?.success) {
            popup.success('Xóa xe máy thành công!', 'Tuyệt vời');
            // Loại bỏ ID vừa xóa khỏi state selectedIds nếu nó đang được chọn
            setSelectedIds((prev) => prev.filter((id) => id !== motorId));
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

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    const toggleSelectAll = (pageIds: string[]) => {
        const allSelected = pageIds.every((id) => selectedIds.includes(id));
        if (allSelected) {
            setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
        } else {
            const newSelection = Array.from(new Set([...selectedIds, ...pageIds]));
            setSelectedIds(newSelection);
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedIds.length === 0) return;
        setIsPending(true);
        try {
            const response = await deleteSelectedMotors(selectedIds);
            if (response.success) {
                popup.success(`Đã xóa ${response.count} xe máy!`);
                setSelectedIds([]);
                await fetchMotors();
            } else {
                popup.error(response.error || 'Lỗi khi xóa');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsPending(false);
        }
    };

    const confirmDeleteSelected = () => {
        popup.confirm(
            `Bạn có chắc chắn muốn xóa ${selectedIds.length} mục đã chọn?`,
            handleDeleteSelected,
            'Xác nhận xóa hàng loạt',
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
            selectedIds,
            currentPageIds,
            isAllSelected: currentPageIds.length > 0 && currentPageIds.every((id) => selectedIds.includes(id)),
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
            toggleSelect,
            toggleSelectAll: () => toggleSelectAll(currentPageIds),
            confirmDeleteSelected,
        },
    };
};
