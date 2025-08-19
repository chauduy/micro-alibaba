import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

import { customToast } from '@/utils';

const RemoteProductPage = dynamic(() => import('productApp/ProductPage'), {
    ssr: false
}) as React.ComponentType<{
    id: string;
    onShowToast: (name: string, add: boolean) => void;
    onNavigateToCart: () => void;
}>;

export default function Product() {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <RemoteProductPage
            id={slug as string}
            onShowToast={(name, add) =>
                add
                    ? toast.success(`Added to your ${name}`, customToast('success'))
                    : toast.success(`Removed from your ${name}`, customToast('success'))
            }
            onNavigateToCart={() => router.push('/cart')}
        />
    );
}
