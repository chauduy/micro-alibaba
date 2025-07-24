import dynamic from 'next/dynamic';

const RemoteHomePage = dynamic(() => import('productApp/HomePage'), { ssr: false });

export default function Home() {
    return <RemoteHomePage />;
}
