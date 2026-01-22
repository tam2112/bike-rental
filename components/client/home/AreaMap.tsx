import { Map, MapPinned } from 'lucide-react';

export default function AreaMap() {
    return (
        <section className="w-full bg-slate-50 dark:bg-slate-850 rounded-3xl p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1 flex flex-col justify-center">
                    <span className="text-accent font-bold uppercase tracking-wider text-sm mb-2">Bản đồ khu vực</span>
                    <h2 className="text-3xl font-bold text-neutral-dark dark:text-white tracking-tight mb-4">
                        Khám phá Phú Yên cùng Aitho
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                        Cửa hàng của chúng tôi nằm ngay trung tâm thành phố Tuy Hòa, thuận tiện cho việc di chuyển đến
                        các điểm du lịch nổi tiếng như Tháp Nhạn, Bãi Xép, hay Mũi Điện.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary mt-0.5">
                                <MapPinned />
                            </span>
                            <div>
                                <span className="font-bold text-neutral-dark dark:text-white block">
                                    Vị trí trung tâm
                                </span>
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                    Dễ dàng tìm thấy tại trung tâm Tuy Hòa.
                                </span>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-primary mt-0.5">
                                <Map />
                            </span>
                            <div>
                                <span className="font-bold text-neutral-dark dark:text-white block">
                                    Tư vấn lộ trình
                                </span>
                                <span className="text-sm text-slate-500 dark:text-slate-400">
                                    Tặng bản đồ du lịch và tư vấn cung đường ven biển đẹp nhất.
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 h-87.5 lg:h-100 bg-slate-200 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
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
        </section>
    );
}
