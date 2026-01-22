export type NotificationType = {
    id: string;
    type: 'BOOKING' | 'RATING';
    booking: {
        id: string;
        customerInfo: {
            id: string;
            fullName: string;
            phone: string;
            email: string;
            idCard: string;
            note: string | null;
        }[];
        motorbike: { id: string; name: string; model: string; licensePlateNum: string };
        pickupDate: Date;
        returnDate: Date;
        createdAt: Date;
    } | null;
    rating: {
        id: string;
        rating: number;
        review: string | null;
        createdAt: Date;
        motorbike: { id: string; name: string; model: string; licensePlateNum: string };
        user: {
            fullName: string;
        };
    } | null;
    isRead: boolean;
    isNew: boolean;
    createdAt: Date;
};
