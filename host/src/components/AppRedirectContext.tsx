import { createContext, useEffect, useState } from 'react';

import { DocumentData } from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';

import { GoogleUser } from '@/types';
import { storage } from '@/utils';

import Loading from './Loading';

interface AppRedirectContextType {
    user: DocumentData | null | undefined;
}

export const AppRedirectContext = createContext<AppRedirectContextType>({ user: null });

function AppRedirect({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<DocumentData | null | undefined | GoogleUser>(undefined);
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
        const handleRedirect = () => {
            if (user === undefined) return;

            const isAuthPage = pathname.includes('auth');

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

    if (loading) {
        return (
            <div className="screenWrapperLoading">
                <Loading />
            </div>
        );
    }

    return <AppRedirectContext.Provider value={{ user }}>{children}</AppRedirectContext.Provider>;
}

export default AppRedirect;
