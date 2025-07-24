import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const RemoteProductPage = dynamic(() => import('productApp/ProductPage'), {
    ssr: false
}) as React.ComponentType<{ id: string }>;

export default function Product() {
    const router = useRouter();
    const { slug } = router.query;

    return <RemoteProductPage id={slug as string} />;
}
