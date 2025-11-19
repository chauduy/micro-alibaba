'use client';

import { useEffect, useRef } from 'react';
import { storage } from '@/utils';

export default function AccountPage() {
    const iframeRef = useRef<HTMLIFrameElement>(null);

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

        // Send user when iframe loads
        const iframe = iframeRef.current;
        if (iframe) {
            iframe.addEventListener('load', () => {
                // Wait a bit for the iframe to be fully ready
                setTimeout(sendUserToIframe, 500);
            });
        }

        // Also try sending immediately if iframe is already loaded
        if (iframe?.contentWindow) {
            setTimeout(sendUserToIframe, 1000);
        }
    }, []);

    return (
        <iframe
            ref={iframeRef}
            src="https://micro-alibaba-o6fe.vercel.app/"
            style={{ width: '100%', height: '100vh', border: 'none' }}
        />
    );
}
