import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Loading from '@/components/Loading';

const RemoteCategoryPage = dynamic(() => import('productApp/CategoryPage'), {
    ssr: false,
    loading: () => (
        <div className="flex h-screen items-center justify-center">
            <Loading />
        </div>
    )
}) as React.ComponentType<{ id: string }>;

export default function Category() {
    const router = useRouter();
    const { slug } = router.query;

    return <RemoteCategoryPage id={slug as string} />;
}
