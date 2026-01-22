'use client';

import { useState } from 'react';

import { Star } from 'lucide-react';

import Rating from './Rating';
import RatingModal from './RatingModal';

interface MotorbikeRatingProps {
    userId: string;
    motorbikeId: string;
    bookingId: string;
    status: string;
    motorbikeName: string;
    motorbikeImages: { url: string }[];
    pickupDate: Date;
    returnDate: Date;
    initialRating: number;
}

export default function MotorbikeRating({
    userId,
    motorbikeId,
    bookingId,
    status,
    motorbikeName,
    motorbikeImages,
    pickupDate,
    returnDate,
    initialRating,
}: MotorbikeRatingProps) {
    const [rating, setRating] = useState<number>(initialRating);
    const [showRating, setShowRating] = useState(false);

    const handleRatingSuccess = (newRating: number) => {
        setRating(newRating);
        setShowRating(false);
    };

    if (rating === null) return <div className="h-4 w-20 bg-slate-100 animate-pulse rounded" />; // Loading nhẹ

    return (
        <>
            {rating > 0 ? (
                <Rating value={rating} />
            ) : (
                status === 'Hoàn thành' && (
                    <button
                        onClick={() => setShowRating(true)}
                        className="flex items-center justify-center gap-1 text-xs sm:text-[10px] font-semibold text-white bg-accent/80 px-3 py-1.5 rounded-full sm:rounded-lg shadow-sm active:scale-95 transition-transform"
                    >
                        Đánh giá
                        <Star size={10} className="sm:hidden" />
                    </button>
                )
            )}
            {/* rating modal */}
            {showRating && (
                <RatingModal
                    userId={userId}
                    motorbikeId={motorbikeId}
                    bookingId={bookingId}
                    motorbikeName={motorbikeName}
                    motorbikeImages={motorbikeImages}
                    pickupDate={pickupDate}
                    returnDate={returnDate}
                    setShowRating={setShowRating}
                    fetchRating={handleRatingSuccess}
                />
            )}
        </>
    );
}
