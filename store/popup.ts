import { PopupType } from '@/types/popup';
import { create } from 'zustand';

interface PopupState {
    isOpen: boolean;
    type: PopupType;
    title: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => void;

    // Các hành động để thay đổi trạng thái
    show: (options: {
        type: PopupType;
        title?: string;
        message: string;
        confirmText?: string;
        onConfirm?: () => void;
    }) => void;
    hide: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
    isOpen: false,
    type: 'success',
    confirmText: '',
    title: '',
    message: '',

    show: (options) =>
        set({
            isOpen: true,
            ...options,
            title: options.title || (options.type === 'success' ? 'Thành công!' : 'Thông báo'),
        }),

    hide: () => set({ isOpen: false, confirmText: '' }),
}));
