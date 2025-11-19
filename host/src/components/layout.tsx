import Head from 'next/head';

import AppRedirect from './AppRedirectContext';
import Footer from './Footer';
import Header from './Header';
import { Toaster } from './ui/sonner';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Ali | Buy anything in anywhere</title>
                <meta
                    name="description"
                    content="Find quality Manufacturers, Suppliers, Exporters, Importers, Buyers, Wholesalers, Products and Trade Leads from our award-winning International Trade Site. Import & Export on alibaba.com"
                />
                <meta
                    name="keywords"
                    content="online marketplace, global trade, wholesale, b2b ecommerce"
                />
                <link
                    rel="icon"
                    href="/images/brand-logo.png"
                    type="image/png"
                />
                <link
                    rel="shortcut icon"
                    href="/images/brand-logo.png"
                    type="image/png"
                />
            </Head>
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
