export default function MotorbikeDetailsSkeleton() {
    return (
        <div className="container flex h-full grow flex-col animate-pulse">
            <div className="flex flex-1 justify-center py-5 px-4 md:px-10 lg:px-20">
                <div className="flex flex-col max-w-400 flex-1 gap-6">
                    {/* Breadcrumb Skeleton */}
                    <div className="flex gap-2 px-4">
                        <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 pt-0">
                        {/* Left Side Skeleton */}
                        <div className="lg:col-span-2 flex flex-col gap-8">
                            {/* Title & Meta */}
                            <div className="flex flex-col gap-3">
                                <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                <div className="flex gap-4">
                                    <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                    <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                </div>
                            </div>

                            {/* Images Grid */}
                            <div className="grid grid-cols-4 gap-2 h-75 md:h-100 rounded-xl overflow-hidden">
                                <div className="row-span-2 col-span-4 md:col-span-3 bg-slate-200 dark:bg-slate-700"></div>
                                <div className="hidden md:block col-span-1 row-span-1 bg-slate-200 dark:bg-slate-700"></div>
                                <div className="hidden md:block col-span-1 row-span-1 bg-slate-200 dark:bg-slate-700"></div>
                            </div>

                            {/* Specs Grid */}
                            <div className="flex flex-col gap-4">
                                <div className="h-7 w-40 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-4">
                                <div className="h-7 w-40 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                <div className="bg-slate-200 dark:bg-slate-700 h-40 rounded-lg"></div>
                            </div>
                        </div>

                        {/* Right Side Skeleton (Booking Card) */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 flex flex-col gap-4">
                                <div className="bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                    <div className="p-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                                        <div className="flex justify-between items-end mb-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                                <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                            </div>
                                            <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                        </div>

                                        {/* Date Inputs Skeleton */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                                <div className="h-12 w-full bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                                <div className="h-12 w-full bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                            </div>
                                        </div>

                                        {/* Note Box */}
                                        <div className="h-24 w-full bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>

                                        {/* Button */}
                                        <div className="h-12 w-full bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                    </div>

                                    {/* Footer Icons */}
                                    <div className="p-4 flex justify-around border-t border-slate-100 dark:border-slate-700">
                                        <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                        <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                        <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
