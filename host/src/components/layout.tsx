import { Metadata } from 'next';

import AppRedirect from './AppRedirectContext';
import Footer from './Footer';
import Header from './Header';
import { Toaster } from './ui/sonner';

export const metadata: Metadata = {
    title: 'Ali | Buy anything from anywhere',
    icons: '/images/brand-logo.png',
    keywords: ['online marketplace', 'global trade', 'wholesale', 'b2b ecommerce'],
    robots: 'index, follow',
    description:
        'Find quality Manufacturers, Suppliers, Exporters, Importers, Buyers, Wholesalers, Products and Trade Leads from our award-winning International Trade Site. Import & Export on alibaba.com',
    openGraph: {
        title: 'Ali | Buy anything in anywhere',
        description:
            'Find quality Manufacturers, Suppliers, Exporters, Importers, Buyers, Wholesalers, Products and Trade Leads from our award-winning International Trade Site. Import & Export on alibaba.com',
        url: 'https://micro-ali.vercell.app',
        siteName: 'Ali',
        images: [
            {
                url: 'https://micro-ali.vercell.app/images/brand-logo.png',
                width: 800,
                height: 600
            }
        ],
        locale: 'en_US',
        type: 'website'
    }
};

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
