import { useEffect } from 'react';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import EmptyLayout from '@/components/EmptyLayout';
import Layout from '@/components/layout';
import '@/styles/globals.css';
import { storage } from '@/utils';

export default function App({ Component, pageProps, ...appProps }: AppProps) {
    const router = useRouter();
    const isLayoutNeeded =
        !router.pathname.includes('account') &&
        !router.pathname.includes('my-list') &&
        !router.pathname.includes('orders');
    const HomeLayout = isLayoutNeeded ? Layout : EmptyLayout;

    useEffect(() => {
        function broadcastToApps(type: any, payload: any) {
            document.querySelectorAll('iframe').forEach((frame) => {
                if (frame.contentWindow) {
                    frame.contentWindow.postMessage({ type, payload }, '*');
                }
            });
        }

        // Send current user to iframes if user is already logged in
        function sendCurrentUserToIframes() {
            const storedUser = storage.getItem('user');
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    broadcastToApps('set-user', user);
                } catch (error) {
                    console.error('Error parsing stored user:', error);
                }
            }
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
            if (event.data?.type === 'request-user') {
                // Account app is requesting user data
                sendCurrentUserToIframes();
            }
        };

        window.addEventListener('message', handler);

        // Send current user to iframes after a short delay to ensure iframes are loaded
        const timeoutId = setTimeout(() => {
            sendCurrentUserToIframes();
        }, 1000);

        return () => {
            window.removeEventListener('message', handler);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <HomeLayout>
            <Component {...pageProps} />
        </HomeLayout>
    );
}
