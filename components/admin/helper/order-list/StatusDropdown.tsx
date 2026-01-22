'use client';

import { useState, useRef, useEffect } from 'react';

import { ChevronDown, Clock, Loader2 } from 'lucide-react';

import { STATUS_CONFIG } from '@/constants/status';

import { BookingStatusType } from '@/types/booking';
import { StatusType } from '@/types/status';

interface StatusDropdownProps {
    currentStatus: string;
    statuses: StatusType[] | null;
    onUpdate: (statusId: BookingStatusType, statusName: string) => void;
    isUpdating?: boolean;
}

export default function StatusDropdown({ currentStatus, statuses, onUpdate, isUpdating = false }: StatusDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const config = STATUS_CONFIG[currentStatus] || STATUS_CONFIG['Đang chờ'];
    const Icon = config.icon;

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                disabled={isUpdating} // Disable khi đang update
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-sm
                    ${config.bg} ${config.text} 
                    ${
                        isOpen
                            ? 'ring-2 ring-indigo-500 border-transparent'
                            : 'border-transparent hover:border-slate-300'
                    }
                    ${isUpdating ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                {/* Hiển thị Spinner nếu đang updating, ngược lại hiển thị Icon trạng thái */}
                {isUpdating ? <Loader2 size={14} className="animate-spin" /> : <Icon size={14} />}

                <span>{currentStatus}</span>

                <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && !isUpdating && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 z-9999 overflow-hidden animate-in fade-in zoom-in duration-150">
                    <div className="p-1">
                        {statuses?.map((s) => {
                            const Icon = STATUS_CONFIG[s.name]?.icon || Clock;
                            const isSelected = s.name === currentStatus;

                            return (
                                <button
                                    key={s.id}
                                    onClick={() => {
                                        onUpdate(s.id as BookingStatusType, s.name);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors
                                        ${
                                            isSelected
                                                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                                                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                                        }`}
                                >
                                    <span className={STATUS_CONFIG[s.name]?.color}>
                                        <Icon size={16} />
                                    </span>
                                    {s.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
