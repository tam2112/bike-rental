export type CouponType = {
    id: string;
    code: string;
    description: string;
    discount: number;
    forNewUser: boolean;
    forMember: boolean;
    isPublic: boolean;
    expiredAt: Date | null;
    createdAt: Date;
};
