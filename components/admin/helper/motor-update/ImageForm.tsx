'use client';

import Image from 'next/image';
import { useState } from 'react';

import { CloudUpload, Image as ImageIcon, Trash2 } from 'lucide-react';

interface ImageFormProps {
    previews: string[];
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDropFiles: (files: File[]) => void;
    onRemoveImage: (index: number) => void;
}

export default function ImageForm({ previews, onImageChange, onDropFiles, onRemoveImage }: ImageFormProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
        else if (e.type === 'dragleave') setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
        if (files.length > 0) onDropFiles(files);
    };

    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-neutral-dark dark:text-white text-lg font-bold flex items-center gap-2">
                    <ImageIcon size={20} className="text-primary" />
                    Hình ảnh xe
                </h3>
                <label className="text-[#4285F4] text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer">
                    <input type="file" multiple className="sr-only" accept="image/*" onChange={onImageChange} />
                    <span>+ Thêm ảnh</span>
                </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Hiển thị các ảnh hiện có + ảnh mới chọn */}
                {previews.map((url, index) => (
                    <div
                        key={url}
                        className="group relative aspect-4/3 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
                    >
                        {index === 0 && (
                            <div className="absolute top-2 left-2 z-10 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                                ẢNH BÌA
                            </div>
                        )}

                        <Image
                            src={url}
                            alt="motor"
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />

                        {/* Overlay khi hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <button
                            type="button"
                            onClick={() => onRemoveImage(index)}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}

                {/* Dropzone Area */}
                <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`
                        relative aspect-4/3 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all
                        ${
                            isDragging
                                ? 'border-primary bg-primary/5 scale-[0.98]'
                                : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                        }
                    `}
                >
                    <input
                        type="file"
                        multiple
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={onImageChange}
                    />
                    <CloudUpload size={30} className={isDragging ? 'text-primary' : 'text-slate-400'} />
                    <span className="text-slate-500 text-[11px] mt-2 font-medium">Kéo thả hoặc nhấn để tải</span>
                </div>
            </div>
            <p className="text-slate-400 text-[11px] italic mt-2">
                * Kéo thả để sắp xếp thứ tự ảnh (Ảnh đầu tiên sẽ là ảnh đại diện).
            </p>
        </div>
    );
}
