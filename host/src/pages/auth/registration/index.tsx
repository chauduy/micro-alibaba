'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

import Loading from '@/components/Loading';
import { customToast } from '@/utils';

const RemoteRegistrationPage = dynamic(() => import('authApp/RegistrationPage'), {
    ssr: false,
    loading: () => (
        <div className="flex h-screen items-center justify-center">
            <Loading />
        </div>
    )
}) as React.ComponentType<{
    onRegisterSuccess: () => void;
    onRegisterFail: () => void;
}>;

export default function Registration() {
    const router = useRouter();

    return (
        <RemoteRegistrationPage
            onRegisterSuccess={() => router.push('/')}
            onRegisterFail={() => toast.error('Email already in use', customToast('error'))}
        />
    );
}
