import bg_hero from '@/public/images/bg/bg-hero.jpg';
import bg_bike from '@/public/images/bg/bg-bike.jpg';
import bolide from '@/public/images/bg/bolide.jpg';
import sample_profile from '@/public/images/sample_profile.jpg';
import logo from '@/public/images/logo.png';

import xe_may_1 from '@/public/images/motorbike/xe-1.jpg';
import xe_may_2 from '@/public/images/motorbike/xe-2.webp';
import xe_may_3 from '@/public/images/motorbike/xe-3.png';
import xe_may_4 from '@/public/images/motorbike/xe-4.webp';
import xe_may_5 from '@/public/images/motorbike/xe-5.jpg';
import xe_may_6 from '@/public/images/motorbike/xe-6.webp';

import speedIcon from '@/public/icons/speed.png';
import gasIcon from '@/public/icons/gas.png';
import gasSlateIcon from '@/public/icons/gas-slate.png';
import seatIcon from '@/public/icons/seat.png';
import seatSlateIcon from '@/public/icons/seat-slate.png';
import upcomingIcon from '@/public/icons/upcoming.png';
import writingIcon from '@/public/icons/writing.png';
import happyFaceIcon from '@/public/icons/happy-face.png';
import walletIcon from '@/public/icons/wallet.png';
import compassIcon from '@/public/icons/compass.png';
import shieldLockIcon from '@/public/icons/shield-lock.png';
import specificationsIcon from '@/public/icons/specifications.png';
import technicsIcon from '@/public/icons/technics.png';
import googleIcon from '@/public/icons/google.png';
import facebookIcon from '@/public/icons/facebook.png';
import gasTankIcon from '@/public/icons/gas-tank.png';
import speedSlateIcon from '@/public/icons/speed-slate.png';
import incidentIcon from '@/public/icons/incident.png';
import machineIcon from '@/public/icons/machine.png';

export const assets = {
    bg_hero,
    xe_may_2,
    xe_may_3,
    xe_may_4,
    xe_may_5,
    xe_may_6,
    bg_bike,
    bolide,
    speedIcon,
    gasIcon,
    gasSlateIcon,
    seatIcon,
    seatSlateIcon,
    sample_profile,
    logo,
    upcomingIcon,
    writingIcon,
    happyFaceIcon,
    walletIcon,
    compassIcon,
    shieldLockIcon,
    specificationsIcon,
    technicsIcon,
    googleIcon,
    facebookIcon,
    gasTankIcon,
    speedSlateIcon,
    incidentIcon,
    machineIcon,
};

export const motorbikes = [
    {
        id: '1',
        images: [xe_may_1, xe_may_2, xe_may_3],
        name: 'Honda Vision 2023',
        type: 'Xe tay ga',
        shortDescription: 'Đời 2022 • Màu Đỏ Đen',
        pricePerDay: 150000,
        location: 'TP. Tuy Hòa',
        speed: '110cc',
        consume: '1.5L/100km',
        seat: 2,
        isAvailable: true,
        isBestseller: false,
        isRent: false,
        slug: 'honda-vision-2023',
    },
    {
        id: '2',
        images: [xe_may_2],
        name: 'Yamaha Sirius Fi',
        type: 'Xe số',
        shortDescription: 'Đời 2022 • Màu Đỏ Đen',
        pricePerDay: 120000,
        location: 'TP. Tuy Hòa',
        speed: '110cc',
        consume: '1.5L/100km',
        seat: 2,
        isAvailable: true,
        isBestseller: true,
        isRent: false,
        slug: 'yamaha-sirius-fi',
    },
    {
        id: '3',
        images: [xe_may_3],
        name: 'Honda Wave Alpha',
        type: 'Xe số',
        shortDescription: 'Đời 2022 • Màu Đỏ Đen',
        pricePerDay: 130000,
        location: 'TP. Tuy Hòa',
        speed: '110cc',
        consume: '1.5L/100km',
        seat: 2,
        isAvailable: true,
        isBestseller: false,
        isRent: false,
        slug: 'honda-wave-alpha',
    },
    {
        id: '4',
        images: [xe_may_4],
        name: 'Suzuki Address 110',
        type: 'Xe tay ga',
        shortDescription: 'Đời 2022 • Màu Đỏ Đen',
        pricePerDay: 160000,
        location: 'TP. Tuy Hòa',
        speed: '110cc',
        consume: '1.5L/100km',
        seat: 2,
        isAvailable: false,
        isBestseller: false,
        isRent: false,
        slug: 'suzuki-address-110',
    },
    {
        id: '5',
        images: [xe_may_5],
        name: 'Yamaha Exciter 150',
        type: 'Xe côn tay',
        shortDescription: 'Đời 2022 • Màu Đỏ Đen',
        pricePerDay: 200000,
        location: 'TP. Tuy Hòa',
        speed: '110cc',
        consume: '1.5L/100km',
        seat: 2,
        isAvailable: true,
        isBestseller: false,
        isRent: true,
        slug: 'yamaha-exciter-150',
    },
    {
        id: '6',
        images: [xe_may_6],
        name: 'Honda Winner X',
        type: 'Xe côn tay',
        shortDescription: 'Đời 2022 • Màu Đỏ Đen',
        pricePerDay: 220000,
        location: 'TP. Tuy Hòa',
        speed: '110cc',
        consume: '1.5L/100km',
        seat: 2,
        isAvailable: true,
        isBestseller: false,
        isRent: false,
        slug: 'honda-winner-X',
    },
];

export const customers = [
    {
        id: '1',
        fullName: 'Nguyen Van A',
        avatar: sample_profile,
        email: 'nva@gmail.com',
        phone: '0979696145',
        idCard: '079794719749',
        location: 'Tp. Tuy Hòa',
    },
    {
        id: '2',
        fullName: 'Nguyen Van B',
        avatar: sample_profile,
        email: 'nvb@gmail.com',
        phone: '0979696145',
        idCard: '079794719749',
        location: 'Tp. Tuy Hòa',
    },
    {
        id: '3',
        fullName: 'Nguyen Van C',
        avatar: sample_profile,
        email: 'nvc@gmail.com',
        phone: '0979696145',
        idCard: '079794719749',
        location: 'Tp. Tuy Hòa',
    },
    {
        id: '4',
        fullName: 'Nguyen Van D',
        avatar: sample_profile,
        email: 'nvd@gmail.com',
        phone: '0979696145',
        idCard: '079794719749',
        location: 'Tp. Tuy Hòa',
    },
    {
        id: '5',
        fullName: 'Nguyen Van E',
        avatar: sample_profile,
        email: 'nve@gmail.com',
        phone: '0979696145',
        idCard: '079794719749',
        location: 'Tp. Tuy Hòa',
    },
    {
        id: '6',
        fullName: 'Nguyen Van F',
        avatar: sample_profile,
        email: 'nvf@gmail.com',
        phone: '0979696145',
        idCard: '079794719749',
        location: 'Tp. Tuy Hòa',
    },
];
