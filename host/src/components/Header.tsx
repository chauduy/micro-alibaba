import { useContext, useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaRegUser } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

import { db } from '@/lib/firebase';
import { Product } from '@/types';
import { storage } from '@/utils';

import AccountPopup from './AccountPopup';
import { AppRedirectContext } from './AppRedirectContext';
import CartPopup from './CartPopup';

function Header() {
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [openUser, setOpenUser] = useState<boolean>(false);
    const [listCart, setListCart] = useState<Product[]>([]);
    const { user } = useContext(AppRedirectContext);

    const router = useRouter();
    const pathname = router.pathname;
    const isHideCart = pathname?.includes('/cart') || pathname?.includes('/auth') || !user;
    const isHideAccount = pathname?.includes('/account') || pathname?.includes('/auth');
    const isAccountPage = pathname?.includes('account');
    let timeoutCart: NodeJS.Timeout;
    let timeoutUser: NodeJS.Timeout;

    useEffect(() => {
        if (!user?.uid) return;

        const handleGetListCart = async () => {
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

        handleGetListCart();
    }, [user?.uid]);

    useEffect(() => {
        setOpenCart(false);
        setOpenUser(false);
    }, [pathname]);

    const handleMouseEnterCart = () => {
        if (openUser) setOpenUser(false);
        clearTimeout(timeoutCart);
        setOpenCart(true);
    };

    const handleMouseLeaveCart = () => {
        timeoutCart = setTimeout(() => {
            setOpenCart(false);
        }, 150);
    };

    const handleMouseEnterUser = () => {
        if (openCart) setOpenCart(false);
        clearTimeout(timeoutUser);
        setOpenUser(true);
    };

    const handleMouseLeaveUser = () => {
        timeoutUser = setTimeout(() => {
            setOpenUser(false);
        }, 150);
    };

    return (
        <div
            className={`appPadding flex w-full items-center justify-between bg-white lg:border-b-[1px] lg:border-[#dddddd] ${isAccountPage ? 'hidden' : ''}`}
            id="main-top">
            <Link
                href={'/'}
                target="_self">
                <Image
                    src={'/images/logo.avif'}
                    alt="brand-logo"
                    width={1000}
                    height={1000}
                    className="h-[30px] w-full object-cover"
                />
            </Link>

            <div className="flex items-center gap-x-6 text-black">
                {!isHideCart && (
                    <div
                        className="relative"
                        onMouseEnter={handleMouseEnterCart}
                        onMouseLeave={handleMouseLeaveCart}>
                        <FiShoppingCart
                            className="h-5 w-5 cursor-pointer"
                            onClick={() => router.push('/cart')}
                        />

                        {openCart && <CartPopup list={listCart} />}
                    </div>
                )}

                {!isHideAccount && (
                    <>
                        {user ? (
                            <div
                                className="relative flex items-end gap-x-2"
                                onMouseEnter={handleMouseEnterUser}
                                onMouseLeave={handleMouseLeaveUser}>
                                <FaRegUser
                                    className="h-5 w-5 cursor-pointer"
                                    onClick={() => router.push('/account')}
                                />

                                {openUser && <AccountPopup />}
                            </div>
                        ) : (
                            <div
                                className="flex cursor-pointer items-center gap-x-2"
                                onClick={() => {
                                    storage.setItem('path', pathname);
                                    router.push('/auth/login');
                                }}>
                                <FaRegUser className="h-5 w-5" />
                                <div className="mt-0.5">Sign in</div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
