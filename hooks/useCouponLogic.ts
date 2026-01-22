'use client';

import { useState, useEffect } from 'react';
import { deleteCouponById, updateCouponPublic } from '@/lib/actions/coupon.action';

import { useCouponStore } from '@/store/coupon';

import { usePopup } from './usePopup';

export const useCouponLogic = (itemsPerPage = 5) => {
    const popup = usePopup();

    const { coupons, fetchCoupons } = useCouponStore();

    // Local States cho Logic
    const [currentPage, setCurrentPage] = useState(1);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setIsPending(true);
            await Promise.all([fetchCoupons()]);
            setIsPending(false);
        };
        loadData();
    }, [fetchCoupons]);

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

    // LOGIC: PHÂN TRANG
    const totalPages = Math.ceil((coupons?.length || 0) / itemsPerPage);
    const paginatedCoupons = (coupons || []).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        },
        actions: {
            setCurrentPage,
            triggerLoading,
            fetchCoupons,
            setIsPending,
            confirmPublic,
            confirmDelete,
        },
    };
};
