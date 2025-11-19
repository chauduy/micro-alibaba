import { Fragment, useEffect } from 'react';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import Layout from '@/components/layout';
import '@/styles/globals.css';
import { storage } from '@/utils';

export default function App({ Component, pageProps, ...appProps }: AppProps) {
    const router = useRouter();
    const isLayoutNeeded =
        !router.pathname.includes('account') &&
        !router.pathname.includes('my-list') &&
        !router.pathname.includes('orders');
    const HomeLayout = isLayoutNeeded ? Layout : Fragment;

    useEffect(() => {
        function broadcastToApps(type: any, payload: any) {
            document.querySelectorAll('iframe').forEach((frame) => {
                console.log('frame', frame);
                if (frame.contentWindow) {
                    frame.contentWindow.postMessage({ type, payload }, '*');
                }
            });
        }

        const handler = (event: MessageEvent) => {
            if (event.data?.type === 'go-to-product') {
                const productId = event.data.product_id;
                router.push(`/product/${productId}`);
            }
            if (event.data?.type === 'log-out') {
                storage.clear();
                router.push('/');
            }
            if (event.data?.type === 'go-to-home') {
                router.push('/');
            }
            if (event.data?.type === 'set-user') {
                broadcastToApps('set-user', event.data.user);
            }
        };

        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    return (
        <HomeLayout>
            <Component {...pageProps} />
        </HomeLayout>
    );
}
