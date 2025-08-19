import dynamic from 'next/dynamic';

const RemoteCartPage = dynamic(() => import('productApp/CartPage'), { ssr: false });

export default function Cart() {
    return <RemoteCartPage />;
}
