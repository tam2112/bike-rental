import SignIn from '@/components/auth/SignIn';
import Loading from '@/components/helper/Loading';
import { Suspense } from 'react';

export default function SignInPage() {
    return (
        <Suspense fallback={<Loading />}>
            <SignIn />
        </Suspense>
    );
}
