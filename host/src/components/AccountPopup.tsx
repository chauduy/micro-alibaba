import React, { useContext } from 'react';

import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { accountLink } from '@/constants';
import { auth } from '@/lib/firebase';
import { customToast } from '@/utils';

import { AppRedirectContext } from './AppRedirectContext';
import { Button } from './ui/button';

function AccountPopup() {
    const { user } = useContext(AppRedirectContext);
    const router = useRouter();

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            toast.error('Something went wrong!', customToast('error'));
            console.error(error);
        }
    };
    return (
        <div className="top-8 z-50 hidden rounded-2xl bg-gray-100 pb-4 pt-6 text-sm shadow-black lg:absolute lg:left-[-345px] lg:block lg:w-96">
            <div className="absolute right-3.5 top-0 h-0 w-0 -translate-x-1/2 -translate-y-full border-b-8 border-l-8 border-r-8 border-b-gray-100 border-l-transparent border-r-transparent"></div>

            <div className="mx-6 mb-4 border-b border-[#dddddd] pb-4 font-bold">
                Hi,{' '}
                {`${
                    user?.display_name
                        ? user.display_name
                        : user?.first_name! + ' ' + user?.last_name!
                }`}
            </div>
            <div className="flex flex-col">
                {accountLink.map((item) => (
                    <Link
                        href={item.link}
                        key={item.label}
                        className="px-6 py-2 hover:bg-white hover:font-bold">
                        {' '}
                        {item.label}
                    </Link>
                ))}
            </div>

            <div
                className="mt-4 border-t-[1px] border-[#dddddd] px-6 pt-2 hover:bg-white hover:font-bold hover:text-black"
                onClick={handleLogOut}>
                <Button
                    variant={'ghost'}
                    className="m-0 p-0 font-normal hover:bg-transparent hover:font-bold">
                    Sign out{' '}
                </Button>
            </div>
        </div>
    );
}

export default AccountPopup;
