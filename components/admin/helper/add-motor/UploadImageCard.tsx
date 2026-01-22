'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Image as ImageIcon, Trash2, UploadCloud } from 'lucide-react';

interface UploadImageCardProps {
    previews: string[];
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDropFiles: (files: File[]) => void;
    onRemoveImage: (index: number) => void;
}

export default function UploadImageCard({ previews, onImageChange, onDropFiles, onRemoveImage }: UploadImageCardProps) {
    const [isDragging, setIsDragging] = useState(false);

    // Ngăn chặn hành vi mặc định của trình duyệt (mở file)
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        const imageFiles = files.filter((file) => file.type.startsWith('image/'));

        if (imageFiles.length > 0) {
            onDropFiles(imageFiles);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="font-bold text-neutral-dark dark:text-white flex items-center gap-2">
                    <ImageIcon className="text-primary" size={22} />
                    Hình ảnh sản phẩm
                </h3>
            </div>

            <div className="space-y-6">
                {/* Drag and Drop Zone */}
                <label
                    htmlFor="file-upload"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                        relative flex justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-all cursor-pointer group
                        ${
                            isDragging
                                ? 'border-primary bg-primary/5 scale-[1.01]'
                                : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }
                    `}
                >
                    <div className="text-center">
                        <UploadCloud
                            className={`mx-auto h-12 w-12 transition-colors ${
                                isDragging ? 'text-primary' : 'text-slate-300 group-hover:text-primary'
                            }`}
                            size={48}
                        />
                        <div className="mt-4 flex text-sm leading-6 text-slate-600 dark:text-slate-400 justify-center">
                            <div className="relative cursor-pointer font-semibold text-primary hover:text-blue-500">
                                <span>Tải ảnh lên</span>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="sr-only"
                                    multiple
                                    accept="image/*"
                                    onChange={onImageChange}
                                />
                            </div>
                            <p className="pl-1">hoặc kéo thả vào đây</p>
                        </div>
                        <p className="text-xs leading-5 text-slate-500">PNG, JPG, GIF tối đa 10MB</p>
                    </div>
                </label>

                {/* Preview Grid */}
                {previews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-2">
                        {previews.map((url, index) => (
                            <div
                                key={url}
                                className="relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 aspect-square"
                            >
                                <Image src={url} alt={`Preview ${index}`} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => onRemoveImage(index)}
                                        className="bg-red-500/90 text-white p-2 rounded-full hover:bg-red-600 transition-all transform hover:scale-110"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
