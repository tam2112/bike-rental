import SignUp from '@/components/auth/SignUp';
import { Suspense } from 'react';

export default function SignUpPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
        </Suspense>
    );
}
