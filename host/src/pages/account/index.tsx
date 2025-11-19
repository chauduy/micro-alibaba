'use client';

import { useEffect, useRef, useState } from 'react';

import Loading from '@/components/Loading';
import { storage } from '@/utils';

export default function AccountPage() {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        const iframe = iframeRef.current;
        if (!iframe) return;

        const handleLoad = () => {
            // Ensure loading shows for at least a brief moment
            setTimeout(() => {
                setLoading(false);
                setTimeout(sendUserToIframe, 500);
            }, 300);
        };

        // Use load event - more reliable than checking readyState
        // (readyState check can fail due to CORS)
        iframe.addEventListener('load', handleLoad);

        return () => {
            iframe.removeEventListener('load', handleLoad);
        };
    }, []);

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
            />
        </div>
    );
}
