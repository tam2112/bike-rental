export interface User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    phone: string | null;
    idCard: string | null;
    location: string | null;
    roleId: string;
    createdAt: Date;
}

export interface Role {
    id: string;
    name: string;
    createdAt: Date;
}

export interface Image {
    id: string;
    url: string;
    createdAt: Date;
    userId?: string | null;
    motorbikeId?: string | null;
}
