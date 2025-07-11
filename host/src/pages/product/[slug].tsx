import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ProductPage = dynamic(() => import('productApp/ProductPage'), {
    ssr: false
}) as React.ComponentType<{ id: string }>;

export default function Product() {
    const router = useRouter();
    const { slug } = router.query;

    return <ProductPage id={slug as string} />;
}
