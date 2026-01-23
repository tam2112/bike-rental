import Image from 'next/image';

import { CalendarDays, Lightbulb, MapPin, Motorbike, PhoneCall, Rocket, ShieldPlus, User2 } from 'lucide-react';

import { assets } from '@/public/assets';
import Link from 'next/link';

export default function AboutUs() {
    return (
        <div className="flex-1">
            <div>
                <div
                    className="flex min-h-120 flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-8 relative"
                    data-alt="Scenic winding road in northern Vietnam with lush green mountains"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url(/images/bg/bg-about.jpg)',
                    }}
                >
                    <div className="flex flex-col gap-4 text-center max-w-200z-10">
                        <h1 className="text-white sm:text-4xl text-3xl font-black leading-tight tracking-[-0.033em] md:text-6xl drop-shadow-lg">
                            Vi vu Phú Yên <br />
                            Trọn vẹn từng khoảnh khắc
                        </h1>
                        <h2 className="text-white text-base font-medium leading-relaxed md:text-xl text-opacity-90 drop-shadow-md max-w-2xl mx-auto">
                            Dịch vụ cho thuê xe máy uy tín tại Tuy Hòa. Chúng tôi là startup địa phương, sẵn sàng đồng
                            hành cùng bạn khám phá vẻ đẹp &quot;Hoa Vàng Trên Cỏ Xanh&quot; từ 7:00 sáng đến 22:00 tối
                            mỗi ngày.
                        </h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 z-10 mt-4">
                        <Link
                            href={'/xe-may'}
                            className="flex min-w-40 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg hover:bg-blue-600 hover:scale-105 transition-all"
                        >
                            <span className="truncate">Xem xe ngay</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="px-4 md:px-40 flex flex-1 justify-center py-12">
                <div className="flex flex-col max-w-240 flex-1 gap-12">
                    <div className="text-center px-4">
                        <p className="text-primary font-bold tracking-wider uppercase text-sm mb-2">
                            Câu chuyện của chúng tôi
                        </p>
                        <h2 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-[-0.015em] mb-6">
                            Khởi đầu nhỏ, khát vọng lớn tại xứ Nẫu
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
                            Là những người con sinh ra và lớn lên tại mảnh đất Phú Yên đầy nắng gió, chúng tôi bắt đầu
                            hành trình này với mong muốn giản đơn: mang đến phương tiện di chuyển an toàn, tin cậy cho
                            du khách. Dù chỉ là một startup mới với số lượng xe khiêm tốn, chúng tôi cam kết phục vụ
                            bằng tất cả sự nhiệt thành của người dân miền Trung.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                            Chặng đường phát triển
                        </h2>
                        <div className="grid grid-cols-[40px_1fr] gap-x-4 px-4">
                            <div className="flex flex-col items-center gap-1 pt-3">
                                <div className="text-primary bg-primary/10 p-1.5 rounded-full">
                                    <span className="material-symbols-outlined text-[20px]">
                                        <Lightbulb size={20} />
                                    </span>
                                </div>
                                <div className="w-0.5 bg-slate-200 dark:bg-slate-700 h-full grow my-1"></div>
                            </div>
                            <div className="flex flex-1 flex-col py-3 pb-8">
                                <p className="text-slate-900 dark:text-white text-lg font-bold leading-normal">
                                    Ý tưởng thành hình
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal mb-2">
                                    Tháng 10/2023
                                </p>
                                <p className="text-slate-600 dark:text-slate-300 text-base">
                                    Nhen nhóm ý tưởng về một dịch vụ cho thuê xe máy chất lượng cao, tập trung vào trải
                                    nghiệm khách hàng tại TP. Tuy Hòa.
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-0.5 bg-slate-200 dark:bg-slate-700 h-2"></div>
                                <div className="text-primary bg-primary/10 p-1.5 rounded-full">
                                    <span className="material-symbols-outlined text-[20px]">
                                        <Motorbike size={20} />
                                    </span>
                                </div>
                                <div className="w-0.5 bg-slate-200 dark:bg-slate-700 h-full grow my-1"></div>
                            </div>
                            <div className="flex flex-1 flex-col py-3 pb-8">
                                <p className="text-slate-900 dark:text-white text-lg font-bold leading-normal">
                                    Những chiếc xe đầu tiên
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal mb-2">
                                    Tháng 01/2024
                                </p>
                                <p className="text-slate-600 dark:text-slate-300 text-base">
                                    Chính thức đi vào hoạt động với 15 chiếc xe máy đời mới được tuyển chọn kỹ lưỡng.
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <div className="w-0.5 bg-slate-200 dark:bg-slate-700 h-2"></div>
                                <div className="text-primary bg-primary/10 p-1.5 rounded-full">
                                    <Image src={assets.happyFaceIcon} alt="face" width={20} height={20} />
                                </div>
                                <div className="w-0.5 bg-slate-200 dark:bg-slate-700 h-full grow my-1"></div>
                            </div>
                            <div className="flex flex-1 flex-col py-3 pb-8">
                                <p className="text-slate-900 dark:text-white text-lg font-bold leading-normal">
                                    Cột mốc 50 khách hàng
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal mb-2">
                                    Tháng 06/2024
                                </p>
                                <p className="text-slate-600 dark:text-slate-300 text-base">
                                    Nhận được những đánh giá 5 sao đầu tiên từ cộng đồng du lịch bụi, động lực lớn để
                                    chúng tôi tiếp tục cố gắng.
                                </p>
                            </div>
                            <div className="flex flex-col items-center gap-1 pb-3">
                                <div className="w-0.5 bg-slate-200 dark:bg-slate-700 h-2"></div>
                                <div className="text-primary bg-primary/10 p-1.5 rounded-full">
                                    <span className="material-symbols-outlined text-[20px]">
                                        <Rocket size={20} />
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col py-3">
                                <p className="text-slate-900 dark:text-white text-lg font-bold leading-normal">
                                    Mở rộng &amp; Số hóa
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal mb-2">Hiện tại</p>
                                <p className="text-slate-600 dark:text-slate-300 text-base">
                                    Ra mắt website chính thức để phục vụ du khách tốt hơn và mở rộng quy mô đội xe lên
                                    30 chiếc.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                            Giá trị cốt lõi
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                            <div className="flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-[28px]">
                                        <ShieldPlus size={28} />
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-2">
                                        An toàn là trên hết
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                        Mọi chiếc xe đều được chính tay đội ngũ kỹ thuật địa phương kiểm tra kỹ lưỡng
                                        trước khi giao. Đường đèo Phú Yên đẹp nhưng cần xe tốt.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Image src={assets.walletIcon} alt="wallet" width={28} height={28} />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-2">
                                        Giá cả minh bạch
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                        Cam kết không chặt chém du khách. Giá thuê niêm yết rõ ràng, thủ tục đơn giản
                                        chỉ với CCCD.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 p-6 rounded-xl bg-white dark:bg-slate-850 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined text-[28px]">
                                        <User2 />
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-2">
                                        Thổ địa hỗ trợ
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                        Không chỉ thuê xe, chúng tôi còn là hướng dẫn viên miễn phí, tư vấn lịch trình
                                        ăn chơi &quot;chuẩn bài&quot; dân bản địa.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary/5 rounded-2xl p-8 md:p-12 mt-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div className="flex flex-col gap-1">
                                <span className="sm:text-4xl text-3xl font-black text-primary">1</span>
                                <span className="text-slate-600 dark:text-slate-400 font-medium sm:text-sm text-xs">
                                    Năm hoạt động
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="sm:text-4xl text-3xl font-black text-primary">30+</span>
                                <span className="text-slate-600 dark:text-slate-400 font-medium sm:text-sm text-xs">
                                    Xe máy mới
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="sm:text-4xl text-3xl font-black text-primary">90+</span>
                                <span className="text-slate-600 dark:text-slate-400 font-medium sm:text-sm text-xs">
                                    Khách hàng thân thiết
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="sm:text-4xl text-3xl font-black text-primary md:text-xl lg:text-3xl flex items-center justify-center h-10">
                                    7h-22h
                                </span>
                                <span className="text-slate-600 dark:text-slate-400 font-medium sm:text-sm text-xs">
                                    Khung giờ phục vụ
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-850 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                                Liên hệ với chúng tôi
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-6">
                                Chúng tôi luôn sẵn sàng hỗ trợ bạn lên kế hoạch cho chuyến đi tuyệt vời tại Phú Yên.
                            </p>
                            <ul className="flex flex-col gap-4">
                                <li className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">
                                            <MapPin size={22} />
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">Địa chỉ văn phòng</p>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                                            123 Đại Lộ Hùng Vương, TP. Tuy Hòa, Phú Yên
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">
                                            <CalendarDays size={22} />
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">Giờ làm việc</p>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                                            Thứ 2 - Chủ Nhật: 7:00 AM - 22:00 PM
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-primary/10 p-2 rounded-lg text-primary">
                                        <span className="material-symbols-outlined">
                                            <PhoneCall size={22} />
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">Hotline hỗ trợ</p>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                                            090 123 4567 (Zalo/Whatsapp)
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2 h-64 md:h-auto rounded-xl overflow-hidden relative bg-slate-200">
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-400">
                                <iframe
                                    allowFullScreen
                                    height="100%"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124896.97426171853!2d109.28485295!3d13.09066695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316fec178225017d%3A0x676449102657e2f1!2zVHAuIFR1eSBIw7JhLCBQaMO6IFnDqsyAbiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1715420000000!5m2!1svi!2s"
                                    style={{ border: 0 }}
                                    width="100%"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative w-full py-20 px-4 flex justify-center items-center bg-slate-900 overflow-hidden">
                <div
                    className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
                    data-alt="Blurred background of motorbike riders on a mountain pass"
                    style={{
                        backgroundImage: 'url(/images/bg/bg-about-2.jpg)',
                    }}
                ></div>
                <div className="relative z-10 flex flex-col items-center text-center max-w-2xl gap-6">
                    <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
                        Sẵn sàng khám phá Gành Đá Đĩa?
                    </h2>
                    <p className="text-slate-300 sm:text-lg text-sm">
                        Đừng để việc thiếu phương tiện làm chậm hành trình của bạn. Thuê xe ngay hôm nay để nhận ưu đãi
                        cho khách hàng mới.
                    </p>
                    <div className="flex gap-4 pt-2 max-sm:text-sm">
                        <Link
                            href={'/xe-may'}
                            className="bg-primary hover:bg-blue-600 text-white font-bold py-3 sm:px-8 px-6 rounded-lg transition-colors shadow-lg"
                        >
                            Xem danh sách xe
                        </Link>
                        <Link
                            href={'/lien-he'}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 font-bold py-3 sm:px-8 px-6 rounded-lg transition-colors"
                        >
                            Gọi tư vấn ngay
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
