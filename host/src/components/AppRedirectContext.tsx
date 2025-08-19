'use client';

import { createContext, useEffect, useState } from 'react';

import { doc, DocumentData, getDoc, setDoc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

import { db } from '@/lib/firebase';
import { GoogleUser, Product } from '@/types';
import { storage } from '@/utils';

import Loading from './Loading';

interface AppRedirectContextType {
    user: DocumentData | null | undefined;
    listCart: Product[];
    handleClearCart: () => void;
}

export const AppRedirectContext = createContext<AppRedirectContextType>({
    user: null,
    listCart: [],
    handleClearCart: () => {}
});

function AppRedirect({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<DocumentData | null | undefined | GoogleUser>(undefined);
    const [listCart, setListCart] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const storedPath = storage.getItem('path');
    const storedUser = storage.getItem('user');

    useEffect(() => {
        const fetchUser = async () => {
            if (!storedUser) {
                setUser(null);
                return;
            } else {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };

        fetchUser();
    }, [storedUser]);

    useEffect(() => {
        handleGetListCart();

        // listen for cart updated in ProductPage
        window.addEventListener('cart:updated', handleGetListCart);
        return () => window.removeEventListener('cart:updated', handleGetListCart);
    }, [user?.uid]);

    useEffect(() => {
        const handleRedirect = () => {
            if (user === undefined) return;

            const isAuthPage = pathname?.includes('auth');

            if (user && isAuthPage) {
                router.back();
                return;
            }

            if (user && storedPath && !isAuthPage) {
                storage.removeItem('path');
                router.push(storedPath);
                return;
            }
        };

        handleRedirect();
    }, [user, pathname]);

    const handleGetListCart = async () => {
        if (!user?.uid) return;
        try {
            const userCartRef = doc(db, 'customers', user.uid, 'cart', 'cartData');
            const cartSnap = await getDoc(userCartRef);
            if (cartSnap.exists()) {
                if (cartSnap.data().list === null) {
                    return;
                }
                setListCart(cartSnap.data().list);
                return;
            } else {
                return;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleClearCart = async () => {
        if (!user?.uid) return;
        try {
            const userCartRef = doc(db, 'customers', user.uid, 'cart', 'cartData');
            await setDoc(userCartRef, { list: [] }, { merge: true });
            await handleGetListCart();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="screenWrapperLoading">
                <Loading />
            </div>
        );
    }

    return (
        <AppRedirectContext.Provider value={{ user, listCart, handleClearCart }}>
            {children}
        </AppRedirectContext.Provider>
    );
}

export default AppRedirect;
