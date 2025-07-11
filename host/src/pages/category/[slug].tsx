import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const CategoryPage = dynamic(() => import('productApp/CategoryPage'), {
    ssr: false
}) as React.ComponentType<{ id: string }>;

export default function Category() {
    const router = useRouter();
    const { slug } = router.query;

    return <CategoryPage id={slug as string} />;
}
