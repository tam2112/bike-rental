import { MotorType } from '@/types/motor';
import moment from 'moment';
import 'moment/locale/vi';

moment.locale('vi');

export const myPhoneNumber = '0905123456';
export const currency = '₫';
export const tax = 30000;
export const scratchInsurance = 50000;
export const raincoatFee = 20000;
export const deliveryFee = 20000;

export const itemsPerPage = 5;

export const thousandSeparator = (num: number): string => {
    return num.toLocaleString('de-DE');
};

export const kConverter = (num: number) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'k';
    } else {
        return num;
    }
};

export const formatLeadingZero = (num: number): string => {
    return num.toString().padStart(2, '0');
};

export const generateSlug = (name: string): string => {
    // 1. Chuyển đổi tiếng Việt và xử lý slug cơ bản
    let slug = name.toLowerCase();

    // Normalize tiếng Việt
    slug = slug
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd');

    // Xử lý ký tự đặc biệt
    slug = slug
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

    // 2. Sử dụng crypto.randomUUID()
    // Một UUID có dạng: 123e4567-e89b-12d3-a456-426614174000
    const fullUuid = crypto.randomUUID();

    // Tùy chọn: Lấy một đoạn ngắn (ví dụ 8 ký tự cuối) để slug gọn hơn
    // Hoặc giữ nguyên fullUuid nếu bạn muốn độ an toàn tuyệt đối
    const shortId = fullUuid.split('-')[0]; // Lấy đoạn đầu tiên (8 ký tự)

    return `${slug}-${shortId}`;
};

export const formatDateFromNow = (date: Date) => {
    return moment(date).fromNow();
};

export const formatDateCalendar = (date: Date) => {
    return moment(date).calendar();
};

export const formatDateCalendar10Days = (date: Date) => {
    return moment(date).add(10, 'days').calendar();
};

export const formatDate = (date: Date) => {
    return moment(date).format('L');
};

export const formatTime = (date: Date) => {
    return moment(date).format('LT');
};

export const today = new Date().toISOString().split('T')[0];

export const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const tomorrowStr = tomorrow.toISOString().split('T')[0];

export const formatDateTimeLocal = (date: Date) => {
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

// Kiểm tra xem khoảng thời gian A có đè lên khoảng thời gian B không
export const isOverlapping = (startA: Date, endA: Date, startB: Date, endB: Date) => {
    return startA < endB && endA > startB;
};

// Chuyển đổi định dạng ISO từ input sang DD-MM-YYYY cho URL
export const formatToUrlDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

// Ngược lại: Từ URL date sang đối tượng Date để tính toán
export const parseUrlDate = (dateStr: string) => {
    const [d, m, y] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
};

// Calculate estimated days
export const calculateDays = (pickupDate: Date, returnDate: Date) => {
    let estimatedDays = 0;
    if (pickupDate && returnDate) {
        const start = new Date(pickupDate);
        const end = new Date(returnDate);
        if (end > start) {
            estimatedDays = Math.ceil((end.getTime() - start.getTime()) / 86400000);
        }
    }
    return estimatedDays;
};

// Calculate services
export const calculateServices = (isHelmet: boolean, isScratch: boolean, isRaincoat: boolean, days: number) => {
    let total = 0;

    if (isHelmet) {
        total += 0;
    }

    if (isScratch) {
        total += days * 20000;
    }

    if (isRaincoat) {
        total += 20000;
    }

    return total;
};

// calculate average rating
export const calculateAverageRating = (motorbike: MotorType | null) => {
    if (!motorbike) return null;
    if (motorbike.ratings.length <= 0) return 0;

    return Math.round(motorbike.ratings.reduce((acc, curr) => acc + curr.rating, 0) / motorbike.ratings.length);
};

// calculate if booking is cancellable
export const isBookingCancellable = (pickupDate: Date | string, limitHours: number = 24): boolean => {
    const now = new Date();
    const pickup = new Date(pickupDate);
    // Tính toán khoảng cách thời gian (miliseconds)
    const timeDiff = pickup.getTime() - now.getTime();
    const limitMs = limitHours * 60 * 60 * 1000;

    return timeDiff > limitMs;
};

// format phone number with spaces
export const formatPhoneNumberRegex = (phone: string) => {
    // Chỉ lấy các chữ số
    const cleaned = phone.replace(/\D/g, '');

    // Chia tách để format 4-3-3
    const match = cleaned.match(/^(\d{0,4})(\d{0,3})(\d{0,3})$/);

    if (match) {
        return [match[1], match[2], match[3]]
            .filter(Boolean) // Loại bỏ các nhóm trống
            .join(' ');
    }

    return cleaned;
};

// format ID card number with spaces
export const formatIDCard = (id: string) => {
    const cleaned = id.replace(/\D/g, ''); // Chỉ giữ lại số

    // Nếu là CMND cũ (9 số): định dạng 3-3-3
    if (cleaned.length <= 9) {
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})$/);
        if (match) {
            return [match[1], match[2], match[3]].filter(Boolean).join(' ');
        }
    }
    // Nếu là CCCD mới (12 số): định dạng 3-3-6
    else {
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,6})$/);
        if (match) {
            return [match[1], match[2], match[3]].filter(Boolean).join(' ');
        }
    }

    return cleaned;
};
