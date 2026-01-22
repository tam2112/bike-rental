import { Clock, CheckCircle2, Bike, CheckCheck, XCircle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const STATUS_CONFIG: Record<string, { color: string; icon: LucideIcon; bg: string; text: string }> = {
    'Đang chờ': {
        color: 'text-amber-500',
        bg: 'bg-amber-50 dark:bg-amber-900/20',
        text: 'text-amber-700 dark:text-amber-400',
        icon: Clock,
    },
    'Đã xác nhận': {
        color: 'text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-700 dark:text-blue-400',
        icon: CheckCircle2,
    },
    'Đang thuê': {
        color: 'text-purple-500',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-700 dark:text-purple-400',
        icon: Bike,
    },
    'Hoàn thành': {
        color: 'text-emerald-500',
        bg: 'bg-emerald-50 dark:bg-emerald-900/20',
        text: 'text-emerald-700 dark:text-emerald-400',
        icon: CheckCheck,
    },
    'Đã hủy': {
        color: 'text-red-500',
        bg: 'bg-red-50 dark:bg-red-900/20',
        text: 'text-red-700 dark:text-red-400',
        icon: XCircle,
    },
};
