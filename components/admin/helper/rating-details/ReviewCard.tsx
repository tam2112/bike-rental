import { formatDate, formatTime } from '@/lib/utils';

import { CalendarDays, Star } from 'lucide-react';

import { RatingType } from '@/types/rating';

export default function ReviewCard({ rating }: { rating: RatingType }) {
    return (
        <div className="bg-white dark:bg-slate-850 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6 text-sm text-slate-900 dark:text-white">
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star
                                key={i}
                                size={22}
                                className={`shrink-0 size-4 fill-current ${rating.rating > i ? 'text-green-400' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <p>({rating.rating})</p>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarDays size={14} />
                    <p>
                        {formatDate(rating.createdAt)} lúc {formatTime(rating.createdAt)}
                    </p>
                </div>
            </div>
            <div className="py-2">
                <p>{rating.review}</p>
            </div>
        </div>
    );
}
