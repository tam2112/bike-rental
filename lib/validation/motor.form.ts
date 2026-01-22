import { z } from 'zod';

export const motorSchema = () => {
    return z.object({
        id: z.string().optional(),
        name: z.string().min(1, { message: 'Vui lòng nhập tên xe' }),
        slug: z.string().optional(),
        brand: z.string().min(1, { message: 'Vui lòng chọn hãng xe' }),
        model: z.string().min(1, { message: 'Vui lòng chọn loại xe' }),
        year: z.coerce.number().min(1, { message: 'Vui lòng nhập năm sản xuất' }),
        licensePlateNum: z.string().min(1, { message: 'Vui lòng nhập biển số xe' }),
        color: z.string().min(1, { message: 'Vui lòng nhập màu xe' }),
        imagesUrl: z.array(z.string()).optional(),
        engineCapacity: z.coerce.number().min(1, { message: 'Vui lòng nhập dung tích động cơ' }),
        fuelType: z.string().min(1, { message: 'Vui lòng chọn loại nhiên liệu' }),
        consume: z.string().optional(),
        fuelCapacity: z.string().optional(),
        weight: z.coerce.number().min(1, { message: 'Vui lòng nhập trọng lượng' }),
        pricePerDay: z.coerce.number().min(1, { message: 'Vui lòng nhập giá thuê' }),
        description: z.string().min(1, { message: 'Vui lòng nhập mô tả' }),
        odoNum: z.coerce.number().min(1, { message: 'Vui lòng số km đã đi' }),
        seat: z.coerce.number().default(2),
        situation: z.string().optional(),
        isReady: z.coerce.boolean().default(false),
        statusId: z.string().optional(),
        maintenanceAt: z.string().optional(),
    });
};

export type MotorSchema = z.infer<ReturnType<typeof motorSchema>>;
