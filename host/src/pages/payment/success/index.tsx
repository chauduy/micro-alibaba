'use client';

import { useContext, useEffect, useState } from 'react';

import { doc, setDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaCheck } from 'react-icons/fa6';
import { v4 as uuidv4 } from 'uuid';

import { AppRedirectContext } from '@/components/AppRedirectContext';
import Confetti from '@/components/Confetti';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { storage } from '@/utils';

function Success() {
    const { user, listCart, handleClearCart } = useContext(AppRedirectContext);
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isChecking, setIsChecking] = useState(true);
    const [isValidURL, setIsValidURL] = useState(false);

    useEffect(() => {
        const codeFromURL = searchParams.get('code');
        const codeFromStorage = storage.getItem('code');

        if (!codeFromURL || codeFromURL !== codeFromStorage) {
            router.back();
            return;
        }

        setIsValidURL(true);
        setIsChecking(false);
    }, [searchParams, router]);

    useEffect(() => {
        if (!isValidURL || !user?.uid || !listCart?.length) return;

        const submitOrder = async () => {
            const orderId = uuidv4();
            const orderData = {
                list: listCart,
                order_time: new Date(),
                delivery_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                orderId
            };

            try {
                const orderRef = doc(db, 'customers', user.uid, 'orders', orderId);
                await setDoc(orderRef, orderData);
                handleClearCart();
            } catch (err) {
                console.error('Order submit failed:', err);
            }
        };

        submitOrder();
    }, [isValidURL, user, listCart]);

    if (isChecking) {
        return (
            <div className="screenWrapperLoading">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex h-[700px] flex-col items-center justify-center px-6">
            <div className="flex flex-col items-center gap-y-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                    <FaCheck className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-2xl font-extrabold">Congratulations!</h4>
                <p className="text-center text-gray-500">
                    Thank you for your order. We appreciate your business.
                </p>
                <Button onClick={() => router.push('/')}>Continue shopping</Button>
            </div>
            <Confetti />
        </div>
    );
}

export default Success;
