import Image from 'next/image';

import { assets } from '@/public/assets';

interface AvatarCardProps {
    avatar: { url: string }[];
    fullName: string;
    email: string;
    isActive: boolean;
    status: string | undefined;
    role: string;
}

export default function AvatarCard({ avatar, fullName, email, isActive, role }: AvatarCardProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
                <div className="size-32 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center ring-4 ring-slate-50 dark:ring-slate-900">
                    <Image
                        src={avatar[0]?.url || assets.sample_profile}
                        alt="avatar"
                        width={128}
                        height={128}
                        className="rounded-full h-32 object-cover"
                    />
                </div>
                {isActive ? (
                    <div
                        className="absolute bottom-1 right-1 bg-green-500 border-2 border-white dark:border-slate-800 size-5 rounded-full"
                        title="Online"
                    ></div>
                ) : (
                    <div
                        className="absolute bottom-1 right-1 bg-amber-500 border-2 border-white dark:border-slate-800 size-5 rounded-full"
                        title="Offline"
                    ></div>
                )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{fullName}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{email}</p>
            <div className="flex gap-2 mb-2">
                <span className="uppercase px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-800">
                    {role}
                </span>
            </div>
        </div>
    );
}
