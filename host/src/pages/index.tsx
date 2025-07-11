import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('productApp/HomePage'), { ssr: false });

export default function Home() {
    return <HomePage />;
}
