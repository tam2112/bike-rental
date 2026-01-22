import Skeleton from '../Skeleton';
import BasicInfoCardSkeleton from './BasicInfoCardSkeleton';
import ImageCardSkeleton from './ImageCardSkeleton';
import PriceCardSkeleton from './PriceCardSkeleton';
import TechnicalCardSkeleton from './TechnicalCardSkeleton';

export default function MotorDetailsSkeleton() {
    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            {/* Header Skeleton */}
            <div className="p-4 lg:p-8 pb-0">
                <Skeleton className="h-6 w-48 mb-4" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="mx-auto w-full flex flex-col gap-6">
                    {/* Heading Skeleton */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-64 md:w-96" />
                                <Skeleton className="h-8 w-24 rounded-full" />
                            </div>
                            <Skeleton className="h-5 w-48" />
                        </div>
                        {/* Buttons Skeleton */}
                        <div className="flex gap-3">
                            <Skeleton className="h-10 w-32 rounded-lg" />
                            <Skeleton className="h-10 w-32 rounded-lg" />
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            <ImageCardSkeleton />
                        </div>
                        <div className="lg:col-span-1 flex flex-col gap-6">
                            <PriceCardSkeleton />
                            <BasicInfoCardSkeleton />
                        </div>
                    </div>

                    {/* Technical Card Skeleton */}
                    <TechnicalCardSkeleton />
                </div>
            </div>
        </div>
    );
}
