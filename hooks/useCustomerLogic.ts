'use client';

import { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';

import { useStatusStore } from '@/store/status';
import { useUserStore } from '@/store/user';

export const useCustomerLogic = (itemsPerPage = 5) => {
    const { users, fetchUsers } = useUserStore();
    const { userStatuses, fetchUserStatuses } = useStatusStore();

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
            await Promise.all([fetchUsers(), fetchUserStatuses()]);
            setIsPending(false);
        };
        loadData();
    }, [fetchUsers, fetchUserStatuses]);

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
    const filteredUsers = useMemo(() => {
        if (!users) return [];

        return users
            .filter((m) => {
                const matchesSearch =
                    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    m.email.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = statusFilter === '' || m.status?.id === statusFilter;
                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                if (sortBy === 'newest')
                    return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
                if (sortBy === 'oldest')
                    return new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime();
                return 0;
            });
    }, [users, searchTerm, statusFilter, sortBy]);

    // LOGIC: PHÂN TRANG
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
            userStatuses,
            totalPages,
            paginatedUsers,
            totalCount: filteredUsers.length,
            rawTotal: users?.length,
        },
        actions: {
            setSearchInput,
            setStatusFilter,
            setSortBy,
            setCurrentPage,
            triggerLoading,
            debouncedSearch,
            fetchUsers,
            setIsPending,
        },
    };
};
