import { Dispatch, SetStateAction } from 'react';
import { StatusType } from './status';
import { DebouncedFunc } from 'lodash';

export type UserType = {
    id: string;
    fullName: string;
    email: string;
    avatar: { url: string }[];
    location: string | null | undefined;
    idCard: string | null | undefined;
    phone: string | null | undefined;
    isActive: boolean;
    lastLoginAt: Date | null | undefined;
    role: { name: string };
    status: { id: string; name: string } | null;
    createdAt: Date;
};

export type CustomerHooksType = {
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
        userStatuses: StatusType[] | null;
        totalPages: number;
        paginatedUsers: UserType[];
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
        fetchUsers: () => Promise<void>;
        setIsPending: Dispatch<SetStateAction<boolean>>;
    };
};

export type CustomerActionHooksType = {
    setSearchInput: Dispatch<SetStateAction<string>>;
    setStatusFilter: Dispatch<SetStateAction<string>>;
    setSortBy: Dispatch<SetStateAction<string>>;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    triggerLoading: (callback: () => void) => void;
    debouncedSearch: DebouncedFunc<(value: string) => void>;
    fetchUsers: () => Promise<void>;
    setIsPending: Dispatch<SetStateAction<boolean>>;
};

export type CouponActionHooksType = {
    setCurrentPage: Dispatch<SetStateAction<number>>;
    triggerLoading: (callback: () => void) => void;
    fetchCoupons: () => Promise<void>;
    setIsPending: Dispatch<SetStateAction<boolean>>;
    confirmPublic: (couponId: string, isPublic: boolean) => void;
    confirmDelete: (couponId: string) => void;
};
