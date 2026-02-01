'use client';

import { useState, useEffect } from 'react';
import { deleteCouponById, deleteSelectedCoupons, updateCouponPublic } from '@/lib/actions/coupon.action';

import { useCouponStore } from '@/store/coupon';

import { usePopup } from './usePopup';

export const useCouponLogic = (itemsPerPage = 5) => {
    const popup = usePopup();

    const { coupons, fetchCoupons } = useCouponStore();

    // Local States cho Logic
    const [currentPage, setCurrentPage] = useState(1);
    const [isPending, setIsPending] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setIsPending(true);
            await Promise.all([fetchCoupons()]);
            setIsPending(false);
        };
        loadData();
    }, [fetchCoupons]);

    useEffect(() => {
        setSelectedIds([]);
    }, [currentPage]);

    const handlePublic = async (couponId: string, isPublic: boolean) => {
        setIsPending(true);
        try {
            const response = await updateCouponPublic(couponId, isPublic);
            if (response.success) {
                popup.success('Thay đổi trạng thái phiếu thành công!!');
                await fetchCoupons();
            } else {
                popup.error(response.message || 'Có lỗi xảy ra khi hủy');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setIsPending(false);
        }
    };

    const confirmPublic = (couponId: string, isPublic: boolean) => {
        popup.confirm(
            `Bạn có chắc chắn muốn thay đổi trạng thái của phiếu giảm giá này không?.`,
            () => handlePublic(couponId, isPublic),
            'Xác nhận thay đổi',
        );
    };

    const handleDelete = async (couponId: string) => {
        setIsPending(true);
        try {
            const response = await deleteCouponById(couponId);
            if (response?.success) {
                popup.success('Xóa phiếu giảm giá thành công!!');
                // Loại bỏ ID vừa xóa khỏi state selectedIds nếu nó đang được chọn
                setSelectedIds((prev) => prev.filter((id) => id !== couponId));
                await fetchCoupons();
            } else {
                popup.error(response?.message || 'Có lỗi xảy ra khi xóa');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setIsPending(false);
        }
    };

    const confirmDelete = (couponId: string) => {
        popup.confirm(
            `Bạn có chắc chắn muốn xóa phiếu giảm giá này không? Hành động này không thể hoàn tác.`,
            () => handleDelete(couponId),
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
            const response = await deleteSelectedCoupons(selectedIds);
            if (response.success) {
                popup.success(`Đã xóa ${response.count} phiếu giảm giá!`);
                setSelectedIds([]);
                await fetchCoupons();
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

    // LOGIC: PHÂN TRANG
    const totalPages = Math.ceil((coupons?.length || 0) / itemsPerPage);
    const paginatedCoupons = (coupons || []).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const currentPageIds = paginatedCoupons.map((c) => c.id);

    // Animation Variants
    const pageVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 },
    };

    return {
        state: {
            pageVariants,
            currentPage,
            isPending,
            totalPages,
            paginatedCoupons,
            totalCount: coupons?.length || 0,
            rawTotal: coupons?.length || 0,
            selectedIds,
            currentPageIds,
            isAllSelected: currentPageIds.length > 0 && currentPageIds.every((id) => selectedIds.includes(id)),
        },
        actions: {
            setCurrentPage,
            triggerLoading,
            fetchCoupons,
            setIsPending,
            confirmPublic,
            confirmDelete,
            toggleSelect,
            toggleSelectAll: () => toggleSelectAll(currentPageIds),
            confirmDeleteSelected,
        },
    };
};
