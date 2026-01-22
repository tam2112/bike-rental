import Skeleton from '../Skeleton';
import CustomerCardSkeleton from './CustomerCardSkeleton';
import ExpenseCardSkeleton from './ExpenseCardSkeleton';
import MotorInfoCardSkeleton from './MotorInfoCardSkeleton';
import OrderStatusCardSkeleton from './OrderStatusCardSkeleton';
import RentScheduleCardSkeleton from './RentScheduleCardSkeleton';

export default function OrderDetailsSkeleton() {
    return (
        <div className="flex-1 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-hidden">
            {/* Header Skeleton */}
            <div className="p-4 lg:p-8 pb-0">
                <Skeleton className="h-6 w-48 mb-4" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="mx-auto w-full flex flex-col gap-6">
                    {/* Heading Skeleton */}
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-64 md:w-96" />
                            <Skeleton className="h-8 w-24 rounded-full" />
                        </div>
                        <Skeleton className="h-5 w-48" />
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        <div className="xl:col-span-2 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <CustomerCardSkeleton />
                                <RentScheduleCardSkeleton />
                            </div>
                            <MotorInfoCardSkeleton />
                        </div>
                        <div className="flex flex-col gap-6">
                            <ExpenseCardSkeleton />
                            <OrderStatusCardSkeleton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
