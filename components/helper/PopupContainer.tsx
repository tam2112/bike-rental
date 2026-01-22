'use client';

import { AnimatePresence } from 'framer-motion';

import { usePopupStore } from '@/store/popup';

import Popup from './Popup';

export const PopupContainer = () => {
    const { isOpen, type, title, message, confirmText, onConfirm, hide } = usePopupStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <Popup
                    type={type}
                    title={title}
                    message={message}
                    confirmText={confirmText}
                    onClose={hide}
                    onConfirmAction={() => {
                        onConfirm?.();
                        hide();
                    }}
                />
            )}
        </AnimatePresence>
    );
};
