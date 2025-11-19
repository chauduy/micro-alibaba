import dynamic from 'next/dynamic';

import Loading from '@/components/Loading';

const RemoteHomePage = dynamic(() => import('productApp/HomePage'), {
    ssr: false,
    loading: () => (
        <div className="flex h-screen items-center justify-center">
            <Loading />
        </div>
    )
});

export default function Home() {
    return <RemoteHomePage />;
}
