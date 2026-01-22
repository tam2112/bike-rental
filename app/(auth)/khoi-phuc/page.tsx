import Recover from '@/components/auth/Recover';
import { Suspense } from 'react';

export default function RecoverPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Recover />
        </Suspense>
    );
}
