import { Dispatch, SetStateAction } from 'react';
import { StatusType } from './status';
import { DebouncedFunc } from 'lodash';

export type BookingStatusType = 'Đang chờ' | 'Đã xác nhận' | 'Đang thuê' | 'Hoàn thành' | 'Đã hủy';

export type BookingType = {
    id: string;
    motorbikeId: string;
    motorbike: {
        id: string;
        slug: string;
        name: string;
        images: { url: string }[];
        licensePlateNum: string;
        model: string;
        color: string | null;
        weight: number;
        fuelType: string;
        engineCapacity: number;
        pricePerDay: number;
        status: { name: string };
    };
    user: { id: string; fullName: string; email: string; avatar: { url: string }[]; role: { name: string } };
    pickupDate: Date;
    returnDate: Date;
    pickupPoint: string;
    returnPoint: string;
    coupon: string | null;
    isCouponUsed: boolean;
    isHelmet: boolean;
    isScratch: boolean;
    isRaincoat: boolean;
    price: number;
    customerInfo: { id: string; fullName: string; phone: string; email: string; idCard: string; note: string | null }[];
    status: { id: string; name: string };
    rating: { rating: number } | null;
    createdAt: Date;
};

export type BookingHooksType = {
    state: {
        pageVariants: {
            initial: {
                opacity: number;
                x: number;
            };
            animate: {
                opacity: number;
                x: number;
            };
            exit: {
                opacity: number;
                x: number;
            };
        };
        searchTerm: string;
        searchInput: string;
        statusFilter: string;
        sortBy: string;
        currentPage: number;
        isPending: boolean;
        bookingStatuses: StatusType[] | null;
        totalPages: number;
        paginatedBookings: BookingType[];
        totalCount: number;
        rawTotal: number | undefined;
    };
    actions: {
        setSearchInput: Dispatch<SetStateAction<string>>;
        setStatusFilter: Dispatch<SetStateAction<string>>;
        setSortBy: Dispatch<SetStateAction<string>>;
        setCurrentPage: Dispatch<SetStateAction<number>>;
        triggerLoading: (callback: () => void) => void;
        debouncedSearch: DebouncedFunc<(value: string) => void>;
        fetchBookings: () => Promise<void>;
        setIsPending: Dispatch<SetStateAction<boolean>>;
        handleUpdateStatus: (bookingId: string, statusId: BookingStatusType, statusName: string) => Promise<void>;
        confirmCancel: (bookingId: string) => void;
    };
};

export type BookingActionHooksType = {
    setSearchInput: Dispatch<SetStateAction<string>>;
    setStatusFilter: Dispatch<SetStateAction<string>>;
    setSortBy: Dispatch<SetStateAction<string>>;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    triggerLoading: (callback: () => void) => void;
    debouncedSearch: DebouncedFunc<(value: string) => void>;
    fetchBookings: () => Promise<void>;
    setIsPending: Dispatch<SetStateAction<boolean>>;
    handleUpdateStatus: (bookingId: string, statusId: BookingStatusType, statusName: string) => Promise<void>;
    confirmCancel: (bookingId: string) => void;
};
