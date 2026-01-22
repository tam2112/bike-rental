import { formatIDCard, formatPhoneNumberRegex } from '@/lib/utils';

import { CheckCircle, MapPin, User } from 'lucide-react';

interface PersonalInfoCardProps {
    fullName: string;
    email: string;
    phone: string | null | undefined;
    idCard: string | null | undefined;
    location: string | null | undefined;
}

export default function PersonalInfoCard({ fullName, email, phone, idCard, location }: PersonalInfoCardProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">
                        <User size={22} />
                    </span>
                    Thông tin cá nhân
                </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        Họ và tên
                    </label>
                    <p className="text-base font-medium text-slate-900 dark:text-white">{fullName}</p>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">Email</label>
                    <div className="flex items-center gap-2">
                        <p className="text-base font-medium text-slate-900 dark:text-white">{email}</p>
                        <span className="material-symbols-outlined text-green-500 text-sm" title="Verified">
                            <CheckCircle size={14} />
                        </span>
                    </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        Số điện thoại
                    </label>
                    <p className="text-base font-medium text-slate-900 dark:text-white">
                        {phone ? formatPhoneNumberRegex(phone) : '----------'}
                    </p>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        Số CCCD/CMND
                    </label>
                    <div className="flex items-center gap-2">
                        <p className="text-base font-medium text-slate-900 dark:text-white">
                            {idCard ? formatIDCard(idCard) : '----------'}
                        </p>
                    </div>
                </div>
                <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">
                        Địa chỉ thường trú
                    </label>
                    <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-slate-400 text-lg mt-0.5">
                            <MapPin size={14} />
                        </span>
                        <p className="text-base font-medium text-slate-900 dark:text-white">
                            {location || '----------'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
