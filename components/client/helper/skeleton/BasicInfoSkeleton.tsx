export default function BasicInfoSkeleton() {
    return (
        <div className="flex flex-col rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-slate-850 shadow-sm animate-pulse">
            {/* Header Skeleton */}
            <div className="px-6 py-4 border-b border-[#e7edf3] dark:border-slate-800 flex justify-between items-center">
                <div className="h-7 w-40 bg-slate-200 dark:bg-slate-700 rounded-md" />
                <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            </div>

            {/* Body Skeleton */}
            <div className="p-6 md:p-8 flex flex-col-reverse md:flex-row gap-8">
                {/* Form Inputs Left */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Tạo 5 dòng input giả lập (Name, Email, Phone, ID, Address) */}
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="grid grid-cols-1 md:grid-cols-4 items-center gap-2 md:gap-4">
                            {/* Label */}
                            <div className="hidden md:block h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded md:ml-auto" />
                            {/* Input Box */}
                            <div className="md:col-span-3 h-10 w-full bg-slate-200 dark:bg-slate-700 rounded-lg" />
                        </div>
                    ))}
                </div>

                {/* Avatar Right */}
                <div className="flex flex-col items-center justify-start gap-4 md:w-64 md:border-l md:border-slate-100 md:dark:border-slate-700 md:pl-8">
                    <div className="h-32 w-32 bg-slate-200 dark:bg-slate-700 rounded-full" />
                    <div className="h-9 w-28 bg-slate-200 dark:bg-slate-700 rounded-lg mt-2" />
                </div>
            </div>
        </div>
    );
}
