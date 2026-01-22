'use client';

import { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import { deleteRatingById, updateRatingPublic } from '@/lib/actions/rating.action';

import { useRatingStore } from '@/store/rating';
import { useStatusStore } from '@/store/status';

import { usePopup } from './usePopup';

export const useRatingLogic = (itemsPerPage = 5) => {
    const popup = usePopup();

    const { ratings, fetchRatings } = useRatingStore();
    const { ratingStatuses, fetchRatingStatuses } = useStatusStore();

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
            await Promise.all([fetchRatings(), fetchRatingStatuses()]);
            setIsPending(false);
        };
        loadData();
    }, [fetchRatings, fetchRatingStatuses]);

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                setSearchTerm(value);
                setCurrentPage(1);
            }, 500),
        [], // chỉ tạo 1 lần
    );

    const handlePublic = async (ratingId: string, isPublic: boolean) => {
        setIsPending(true);
        try {
            const response = await updateRatingPublic(ratingId, isPublic);
            if (response.success) {
                popup.success('Thay đổi trạng thái đánh giá thành công!!');
                await fetchRatings();
            } else {
                popup.error(response.message || 'Có lỗi xảy ra khi hủy');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setIsPending(false);
        }
    };

    const confirmPublic = (ratingId: string, isPublic: boolean) => {
        popup.confirm(
            `Bạn có chắc chắn muốn thay đổi trạng thái của đánh giá này không?.`,
            () => handlePublic(ratingId, isPublic),
            'Xác nhận thay đổi',
        );
    };

    const handleDelete = async (ratingId: string) => {
        setIsPending(true);
        try {
            const response = await deleteRatingById(ratingId);
            if (response?.success) {
                popup.success('Xóa đánh giá xe thành công!!');
                await fetchRatings();
            } else {
                popup.error(response?.message || 'Có lỗi xảy ra khi xóa');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setIsPending(false);
        }
    };

    const confirmDelete = (ratingId: string) => {
        popup.confirm(
            `Bạn có chắc chắn muốn xóa đánh giá xe này không? Hành động này không thể hoàn tác.`,
            () => handleDelete(ratingId),
            'Xác nhận xóa',
        );
    };

    // Giả lập hiệu ứng loading khi filter/chuyển trang
    const triggerLoading = (callback: () => void) => {
        setIsPending(true);
        setTimeout(() => {
            callback();
            setIsPending(false);
        }, 400); // Hiệu ứng mượt mà 400ms
    };

    // LOGIC: SEARCH, FILTER & SORT
    const filteredRatings = useMemo(() => {
        if (!ratings) return [];

        return ratings
            .filter((m) => {
                const matchesSearch =
                    m.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    m.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    }, [ratings, searchTerm, statusFilter, sortBy]);

    // LOGIC: PHÂN TRANG
    const totalPages = Math.ceil(filteredRatings.length / itemsPerPage);
    const paginatedRatings = filteredRatings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
            ratingStatuses,
            totalPages,
            paginatedRatings,
            totalCount: filteredRatings.length,
            rawTotal: ratings?.length,
        },
        actions: {
            setSearchInput,
            setStatusFilter,
            setSortBy,
            setCurrentPage,
            triggerLoading,
            debouncedSearch,
            fetchRatings,
            setIsPending,
            confirmDelete,
            confirmPublic,
        },
    };
};
