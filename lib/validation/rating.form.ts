import { z } from 'zod';

export const ratingSchema = () => {
    return z.object({
        id: z.string().optional(),
        rating: z.coerce.number().min(1, { message: 'Vui lòng đánh giá 1-5 sao' }),
        review: z.string().optional(),
        userId: z.string().nonempty({ message: 'Người dùng là bắt buộc' }),
        motorbikeId: z.string().nonempty({ message: 'Xe máy là bắt buộc' }),
        bookingId: z.string().nonempty({ message: 'Xe máy là bắt buộc' }),
    });
};

export type RatingSchema = z.infer<ReturnType<typeof ratingSchema>>;

export const ratingFeedbackSchema = () => {
    return z.object({
        id: z.string().optional(),
        feedback: z.string().optional(),
        isPublic: z.coerce.boolean().default(false),
    });
};

export type RatingFeedbackSchema = z.infer<ReturnType<typeof ratingFeedbackSchema>>;
