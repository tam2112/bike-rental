import Image from 'next/image';

import { assets } from '@/public/assets';

export default function SocialLogin() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 h-10 px-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                <Image src={assets.googleIcon} alt="google" width={16} height={16} />
                <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 h-10 px-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                <Image src={assets.facebookIcon} alt="facebook" width={16} height={16} />
                <span>Facebook</span>
            </button>
        </div>
    );
}
