import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || '';

// Hàm tạo token
export const generateToken = (userId: string, role: string) => {
    return jwt.sign({ id: userId, role }, SECRET_KEY, { expiresIn: '24h' });
};

// Hàm xác minh token (nếu cần kiểm tra token trong tương lai)
export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
};
