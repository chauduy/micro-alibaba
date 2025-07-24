import Footer from './Footer';
import Header from './Header';
import { Toaster } from './ui/sonner';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
            <Toaster />
        </>
    );
}

export default Layout;
