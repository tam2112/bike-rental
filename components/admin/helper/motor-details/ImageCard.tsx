import Image from 'next/image';

import { Camera } from 'lucide-react';

interface ImageCardProps {
    images: { url: string }[];
}

export default function ImageCard({ images }: ImageCardProps) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4 overflow-hidden">
            <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800">
                <div className="absolute inset-0 bg-cover bg-center">
                    <Image src={images[0].url} alt="image" width={1000} height={1000} />
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                        <Camera size={16} />
                    </span>
                    <span>{images.length} ảnh</span>
                </div>
            </div>
        </div>
    );
}
