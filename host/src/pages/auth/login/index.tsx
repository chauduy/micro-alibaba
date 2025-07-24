'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { customToast } from '@/utils';

const RemoteLoginPage = dynamic(() => import('authApp/LoginPage'), {
    ssr: false
}) as React.ComponentType<{
    onLoginSuccess: () => void;
    onClickRegister: () => void;
    onLoginFail: () => void;
    onGoogleLoginFail: () => void;
}>;

export default function Login() {
    const router = useRouter();

    return (
        <RemoteLoginPage
            onLoginSuccess={() => router.push('/')}
            onClickRegister={() => router.push('/auth/registration')}
            onLoginFail={() => toast.error('Invalid email or password', customToast('error'))}
            onGoogleLoginFail={() =>
                toast.error('Something went wrong, please try again!', customToast('error'))
            }
        />
    );
}
