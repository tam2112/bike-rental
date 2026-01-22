import { ChevronRight } from 'lucide-react';

import { BasicInfo, ChangePassword } from './helper/account/personal-info';

export default function PersonalInfo() {
    return (
        <div className="flex-1 flex flex-col gap-6">
            {/* header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-[#4c739a] dark:text-slate-400">
                    <a className="hover:underline" href="#">
                        Trang chủ
                    </a>
                    <span className="material-symbols-outlined text-[14px]">
                        <ChevronRight size={14} />
                    </span>
                    <a className="hover:underline" href="#">
                        Tài khoản
                    </a>
                    <span className="material-symbols-outlined text-[14px]">
                        <ChevronRight size={14} />
                    </span>
                    <span className="text-[#0d141b] dark:text-white font-medium">Thông tin cá nhân</span>
                </div>
                <h1 className="text-[#0d141b] dark:text-white tracking-tight text-[28px] font-bold leading-tight">
                    Hồ sơ của tôi
                </h1>
                <p className="text-[#4c739a] dark:text-slate-400 text-sm font-normal leading-normal">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </p>
            </div>
            <BasicInfo />
            <ChangePassword />
        </div>
    );
}
