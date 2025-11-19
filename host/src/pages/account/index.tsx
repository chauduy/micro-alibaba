'use client';

import { useEffect, useRef, useState } from 'react';

import Loading from '@/components/Loading';
import { storage } from '@/utils';

export default function AccountPage() {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            console.warn('Iframe load timeout - hiding loading state');
            setLoading(false);
        }, 10000); // 10 second max timeout

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleIframeLoad = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        setTimeout(() => {
            setLoading(false);
            const sendUserToIframe = () => {
                const storedUser = storage.getItem('user');
                if (storedUser && iframeRef.current?.contentWindow) {
                    try {
                        const user = JSON.parse(storedUser);
                        iframeRef.current.contentWindow.postMessage(
                            { type: 'set-user', payload: user },
                            '*'
                        );
                    } catch (error) {
                        console.error('Error parsing stored user:', error);
                    }
                }
            };
            setTimeout(sendUserToIframe, 500);
        }, 300);
    };

    const handleIframeError = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        console.error('Iframe failed to load');
        setLoading(false);
    };

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
            {loading && (
                <div
                    className="flex h-screen items-center justify-center"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 10,
                        backgroundColor: 'white'
                    }}>
                    <Loading />
                </div>
            )}
            <iframe
                ref={iframeRef}
                src="https://micro-alibaba-o6fe.vercel.app/"
                style={{ width: '100%', height: '100%', border: 'none' }}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
            />
        </div>
    );
}
