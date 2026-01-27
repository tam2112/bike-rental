import { formatPhoneNumberRegex, myPhoneNumber } from '@/lib/utils';

import { Clock10, Mail, MapPin, Motorbike, PhoneCall, Share, ThumbsUp } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-12 px-10 mt-auto">
            <div className="max-w-360 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="size-8 text-primary">
                            <span className="material-symbols-outlined text-3xl">
                                <Motorbike size={30} />
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-neutral-dark dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
                                Aitho
                            </h2>
                            <span className="text-[10px] font-bold text-accent uppercase tracking-wider">Phú Yên</span>
                        </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
                        Tự hào là đơn vị cho thuê xe máy được yêu thích nhất tại Tuy Hòa. Đồng hành cùng bạn khám phá vẻ
                        đẹp xứ Nẫu.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold text-accent">
                        <span className="material-symbols-outlined text-lg">
                            <Clock10 size={18} />
                        </span>
                        <span>Mở cửa: 07:00 - 22:00</span>
                    </div>
                </div>
                <div>
                    <h4 className="text-neutral-dark dark:text-white font-bold mb-5">Liên kết nhanh</h4>
                    <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <li>
                            <a className="hover:text-primary transition-colors" href="#">
                                Kinh nghiệm du lịch Phú Yên
                            </a>
                        </li>
                        <li>
                            <a className="hover:text-primary transition-colors" href="#">
                                Bảng giá thuê xe 2024
                            </a>
                        </li>
                        <li>
                            <a className="hover:text-primary transition-colors" href="#">
                                Địa điểm phượt đẹp
                            </a>
                        </li>
                        <li>
                            <a className="hover:text-primary transition-colors" href="#">
                                Ẩm thực Tuy Hòa
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-neutral-dark dark:text-white font-bold mb-5">Chính sách</h4>
                    <ul className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <li>
                            <a className="hover:text-primary transition-colors" href="#">
                                Thủ tục thuê xe
                            </a>
                        </li>
                        <li>
                            <a className="hover:text-primary transition-colors" href="#">
                                Chính sách giao nhận
                            </a>
                        </li>
                        <li>
                            <a className="hover:text-primary transition-colors" href="#">
                                Bảo hiểm xe máy
                            </a>
                        </li>
                        <li>
                            <a className="hover:text-primary transition-colors" href="#">
                                Hỗ trợ sự cố
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-neutral-dark dark:text-white font-bold mb-5">Liên hệ</h4>
                    <div className="flex flex-col gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-lg text-primary mt-0.5">
                                <MapPin size={18} />
                            </span>
                            <span>123 Đại lộ Hùng Vương, P.7, TP. Tuy Hòa, Phú Yên</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-lg text-primary">
                                <PhoneCall size={18} />
                            </span>
                            <span className="font-bold text-lg">{formatPhoneNumberRegex(myPhoneNumber)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-lg text-primary">
                                <Mail size={18} />
                            </span>
                            <span>aithophuyen@gmail.com</span>
                        </div>
                        <div className="flex gap-3 mt-2">
                            <a
                                className="bg-neutral-light dark:bg-slate-800 p-2.5 rounded-full text-primary hover:bg-primary hover:text-white transition-all"
                                href="#"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    <ThumbsUp size={20} />
                                </span>
                            </a>
                            <a
                                className="bg-neutral-light dark:bg-slate-800 p-2.5 rounded-full text-primary hover:bg-primary hover:text-white transition-all"
                                href="#"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    <Share size={20} />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 mt-12 pt-8 text-center text-sm text-slate-400 font-medium">
                © 2026 Aitho Phú Yên. All rights reserved.
            </div>
        </footer>
    );
}
