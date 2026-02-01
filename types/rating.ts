import { Dispatch, SetStateAction } from 'react';
import { StatusType } from './status';
import { DebouncedFunc } from 'lodash';

export type RatingType = {
    id: string;
    rating: number;
    review: string | null;
    feedback: string | null;
    isPublic: boolean;
    user: {
        id: string;
        fullName: string;
        email: string;
        avatar: { url: string }[];
        phone: string | null;
        idCard: string | null;
        role: { name: string };
    };
    motorbike: {
        id: string;
        name: string;
        model: string;
        licensePlateNum: string;
        images: { url: string }[];
    };
    status: {
        id: string;
        name: string;
    };
    createdAt: Date;
};

export type RatingHooksType = {
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
        ratingStatuses: StatusType[] | null;
        totalPages: number;
        paginatedRatings: RatingType[];
        totalCount: number;
        rawTotal: number | undefined;
        selectedIds: string[];
        currentPageIds: string[];
        isAllSelected: boolean;
    };
    actions: {
        setSearchInput: Dispatch<SetStateAction<string>>;
        setStatusFilter: Dispatch<SetStateAction<string>>;
        setSortBy: Dispatch<SetStateAction<string>>;
        setCurrentPage: Dispatch<SetStateAction<number>>;
        triggerLoading: (callback: () => void) => void;
        debouncedSearch: DebouncedFunc<(value: string) => void>;
        fetchRatings: () => Promise<void>;
        setIsPending: Dispatch<SetStateAction<boolean>>;
        confirmDelete: (ratingId: string) => void;
        confirmPublic: (ratingId: string, isPublic: boolean) => void;
        toggleSelect: (id: string) => void;
        toggleSelectAll: () => void;
        confirmDeleteSelected: () => void;
    };
};

export type RatingActionHooksType = {
    setSearchInput: Dispatch<SetStateAction<string>>;
    setStatusFilter: Dispatch<SetStateAction<string>>;
    setSortBy: Dispatch<SetStateAction<string>>;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    triggerLoading: (callback: () => void) => void;
    debouncedSearch: DebouncedFunc<(value: string) => void>;
    fetchRatings: () => Promise<void>;
    setIsPending: Dispatch<SetStateAction<boolean>>;
    confirmDelete: (ratingId: string) => void;
    confirmPublic: (ratingId: string, isPublic: boolean) => void;
    toggleSelect: (id: string) => void;
    toggleSelectAll: () => void;
    confirmDeleteSelected: () => void;
};
