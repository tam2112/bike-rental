import { DebouncedFunc } from 'lodash';
import { Dispatch, SetStateAction } from 'react';
import { StatusType } from './status';

export type MotorType = {
    id: string;
    name: string;
    slug: string;
    brand: string;
    model: string;
    year: number;
    licensePlateNum: string;
    color: string | null;
    images: { url: string }[];
    engineCapacity: number;
    fuelType: string;
    consume: string | null;
    fuelCapacity: string | null;
    weight: number;
    pricePerDay: number;
    description: string;
    odoNum: number;
    seat: number;
    situation: string | null;
    isReady: boolean;
    maintenanceAt: Date | null;
    status: { id: string; name: string };
    ratings: {
        id: string;
        rating: number;
        review: string | null;
        user: { fullName: string; avatar: { url: string }[] };
        createdAt: Date;
    }[];
    bookings: { pickupDate: Date; returnDate: Date; status: { id: string; name: string } }[];
    createdAt: Date;
};

export type MotorHooksType = {
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
        motorStatuses: StatusType[] | null;
        totalPages: number;
        paginatedMotors: MotorType[];
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
        fetchMotors: () => Promise<void>;
        setIsPending: Dispatch<SetStateAction<boolean>>;
        confirmDelete: (motorId: string, motorName: string) => void;
        toggleSelect: (id: string) => void;
        toggleSelectAll: () => void;
        confirmDeleteSelected: () => void;
    };
};

export type MotorActionHooksType = {
    setSearchInput: Dispatch<SetStateAction<string>>;
    setStatusFilter: Dispatch<SetStateAction<string>>;
    setSortBy: Dispatch<SetStateAction<string>>;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    triggerLoading: (callback: () => void) => void;
    debouncedSearch: DebouncedFunc<(value: string) => void>;
    fetchMotors: () => Promise<void>;
    setIsPending: Dispatch<SetStateAction<boolean>>;
    confirmDelete: (motorId: string, motorName: string) => void;
    toggleSelect: (id: string) => void;
    toggleSelectAll: () => void;
    confirmDeleteSelected: () => void;
};
