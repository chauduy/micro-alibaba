'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { FaXmark } from 'react-icons/fa6';

import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { storage } from '@/utils';

function Cancel() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isValidURL =
        searchParams.get('code') !== null && searchParams.get('code') === storage.getItem('code');

    if (!isValidURL && typeof window !== 'undefined') {
        router.back();
        return (
            <div className="screenWrapperLoading">
                <Loading />
            </div>
        );
    }

    return (
        <div className="flex h-[700px] flex-col items-center justify-center px-6 md:h-[1000px] lg:h-[800px]">
            <div className="flex flex-col items-center gap-y-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-red-600 md:h-10 md:w-10">
                    <FaXmark className="h-4 w-4 text-red-600 md:h-6 md:w-6" />
                </div>
                <h4 className="text-lg font-extrabold md:text-4xl">Order Canceled</h4>
                <div className="text-center text-sm text-gray-500 md:max-w-[70%] md:text-lg">
                    {`We're sorry, but your order has been canceled due to an issue with payment
                    processing. Please try again or contact our support team if you need assistance.`}
                </div>
                <Button
                    variant={'default'}
                    className="mt-2 rounded-full text-white"
                    onClick={() => router.push('/')}>
                    Return to Home page
                </Button>
            </div>
        </div>
    );
}

export default Cancel;
