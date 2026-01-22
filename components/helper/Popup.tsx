'use client';

import { PopupType } from '@/types/popup';
import { motion } from 'framer-motion';

import { Check, X, AlertTriangle, Info, ArrowRight, MapPin } from 'lucide-react';

interface PopupProps {
    type: PopupType;
    title?: string;
    message: string;
    confirmText?: string;
    onClose: () => void;
    onConfirmAction: () => void;
}

const TYPE_CONFIG = {
    success: {
        icon: Check,
        color: 'bg-green-500',
        ring: 'bg-green-100 dark:bg-green-900/30',
        pulse: 'bg-green-50 dark:bg-green-900/10',
        border: 'from-green-400 via-green-500 to-emerald-600',
        defaultTitle: 'Thành công!',
    },
    error: {
        icon: X,
        color: 'bg-red-500',
        ring: 'bg-red-100 dark:bg-red-900/30',
        pulse: 'bg-red-50 dark:bg-red-900/10',
        border: 'from-red-400 via-red-500 to-rose-600',
        defaultTitle: 'Lỗi xảy ra!',
    },
    warning: {
        icon: AlertTriangle,
        color: 'bg-amber-500',
        ring: 'bg-amber-100 dark:bg-amber-900/30',
        pulse: 'bg-amber-50 dark:bg-amber-900/10',
        border: 'from-amber-400 via-amber-500 to-orange-600',
        defaultTitle: 'Cảnh báo',
    },
    confirm: {
        icon: Info,
        color: 'bg-blue-500',
        ring: 'bg-blue-100 dark:bg-blue-900/30',
        pulse: 'bg-blue-50 dark:bg-blue-900/10',
        border: 'from-blue-400 via-blue-500 to-indigo-600',
        defaultTitle: 'Xác nhận',
    },
};

export default function Popup({ type, title, message, confirmText, onClose, onConfirmAction }: PopupProps) {
    const config = TYPE_CONFIG[type];
    const Icon = config.icon;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop Animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Animation */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white dark:bg-[#1A2633] shadow-2xl border border-slate-100 dark:border-slate-700 z-10"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center px-6 py-8 sm:px-10">
                    {/* Animated Icon Header */}
                    <div className="relative mb-6 flex items-center justify-center">
                        <div className={`absolute h-24 w-24 rounded-full animate-pulse ${config.pulse}`}></div>
                        <div className={`absolute h-20 w-20 rounded-full ${config.ring}`}></div>
                        <div
                            className={`relative flex h-16 w-16 items-center justify-center rounded-full shadow-lg ${config.color}`}
                        >
                            <Icon size={32} className="text-white" />
                        </div>
                    </div>

                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            {title || config.defaultTitle}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{message}</p>

                        {/* Local Brand Touch (Phú Yên) */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-100 dark:border-slate-700 flex items-center justify-center gap-2">
                            <MapPin size={14} className="text-primary" />
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                Dịch vụ xe Phú Yên thân thiện
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 w-full space-y-3">
                        {confirmText && (
                            <button
                                onClick={onConfirmAction}
                                className={`group flex w-full items-center justify-center gap-2 rounded-lg h-11 px-6 text-white text-sm font-bold transition-all shadow-md active:scale-95 ${config.color} hover:brightness-110`}
                            >
                                <span>{confirmText || 'Xác nhận'}</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="w-full text-xs font-medium text-slate-400 hover:text-slate-600"
                        >
                            Đóng
                        </button>
                    </div>
                </div>

                {/* Bottom Gradient Line */}
                <div className={`h-1.5 w-full bg-linear-to-r ${config.border}`}></div>
            </motion.div>
        </div>
    );
}
