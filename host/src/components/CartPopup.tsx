'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Product } from '@/types';

import { Button } from './ui/button';

function CartPopup({ list }: { list: Product[] }) {
    const router = useRouter();
    const totalQuantity = list ? list!.reduce((total, item) => total + item.quantity!, 0) : 0;
    const emptyCart = totalQuantity === 0;
    const navigateToCart = () => {
        router.push('/cart');
    };

    return (
        <div className="top-8 z-50 hidden rounded-2xl bg-gray-100 p-6 shadow-black lg:absolute lg:left-[-340px] lg:block lg:w-96">
            <div className="absolute right-3.5 top-0 h-0 w-0 -translate-x-1/2 -translate-y-full border-b-8 border-l-8 border-r-8 border-b-gray-100 border-l-transparent border-r-transparent"></div>

            <h2 className="mb-4 text-xl font-bold">Shopping cart</h2>
            <div className="mb-4 flex justify-center">
                <Image
                    src={emptyCart ? '/images/empty-card.png' : '/images/cart-full.png'}
                    alt="Empty cart"
                    width={1000}
                    height={1000}
                    className={`w-[150px] ${emptyCart ? 'ml-10' : ''}`}
                />
            </div>
            <div className="mb-4 text-center font-medium text-gray-700">
                {emptyCart ? (
                    'Your cart is empty'
                ) : (
                    <div className="font-normal">
                        You have <span className="font-bold">{list!.length} products</span> in your
                        cart with a total of{' '}
                        <span className="font-bold">{totalQuantity} items</span>.
                    </div>
                )}
            </div>
            <Button
                variant={'ghost'}
                className="w-full rounded-full border border-black py-2 font-medium hover:bg-gray-100"
                onClick={navigateToCart}>
                Go to cart
            </Button>
        </div>
    );
}

export default CartPopup;
