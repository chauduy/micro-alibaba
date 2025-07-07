'use client';

import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const RemoteHomeApp = dynamic(() => import('productApp/HomePage'), { ssr: false });

export default function Home() {
    return <RemoteHomeApp />;
}
