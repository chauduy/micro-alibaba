import dynamic from 'next/dynamic';

import Loading from '@/components/Loading';

const RemoteCartPage = dynamic(() => import('productApp/CartPage'), {
    ssr: false,
    loading: () => (
        <div className="flex h-screen items-center justify-center">
            <Loading />
        </div>
    )
});

export default function Cart() {
    return <RemoteCartPage />;
}
