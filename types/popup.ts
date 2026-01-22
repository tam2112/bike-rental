export type PopupType = 'success' | 'error' | 'warning' | 'confirm';

export type PopupPropsType = {
    success: (message: string, title?: string | undefined) => void;
    error: (message: string, title?: string | undefined) => void;
    confirm: (message: string, onConfirm: () => void, title?: string | undefined) => void;
    hide: () => void;
};
