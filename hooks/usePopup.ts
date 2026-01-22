'use client';

import { useMemo } from 'react';

import { usePopupStore } from '@/store/popup';

export const usePopup = () => {
    const { show, hide } = usePopupStore();

    return useMemo(
        () => ({
            success: (message: string, title?: string) => show({ type: 'success', message, title }),
            error: (message: string, title?: string) => show({ type: 'error', message, title }),
            confirm: (message: string, onConfirm: () => void, title?: string) =>
                show({ type: 'confirm', message, onConfirm, title, confirmText: 'Xác nhận ngay' }),
            hide,
        }),
        [show, hide],
    );
};
