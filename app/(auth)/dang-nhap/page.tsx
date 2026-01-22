import SignIn from '@/components/auth/SignIn';
import { Suspense } from 'react';

export default function SignInPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignIn />
        </Suspense>
    );
}
