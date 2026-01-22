import MotorbikeList from '@/components/client/MotorbikeList';
import { Suspense } from 'react';

export default function MotorbikeListPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MotorbikeList />
        </Suspense>
    );
}
