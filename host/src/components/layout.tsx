import AppRedirect from './AppRedirectContext';
import Footer from './Footer';
import Header from './Header';
import { Toaster } from './ui/sonner';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppRedirect>
                <Header />
                {children}
                <Footer />
                <Toaster />
            </AppRedirect>
        </>
    );
}

export default Layout;
