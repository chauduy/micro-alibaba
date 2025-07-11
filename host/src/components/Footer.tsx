import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { footerLink, footerPayment, footerSocial } from '@/constants';

import { AccordionWrapper } from './AccordionWrapper';

function Footer() {
    const router = useRouter();
    const isAccount = router?.pathname?.includes('account');

    return (
        <div
            className={`border-t-[1px] border-[#dddddd] p-4 pb-6 lg:pb-8 ${isAccount ? 'hidden' : ''}`}>
            <div className="ml-2 xl:hidden">
                <AccordionWrapper />
            </div>
            <div className="mx-auto hidden justify-between p-10 xl:flex xl:max-w-screen-2xl">
                {footerLink.map((item) => (
                    <div key={item.id}>
                        <h4 className="mb-5 text-[16px] font-bold">{item.title}</h4>
                        {item.children.map((child) => (
                            <div
                                key={child.title}
                                className="mb-5 text-sm">
                                <Link
                                    className="hover:underline"
                                    href={child.link}
                                    target="_blank">
                                    {child.title}
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="ml-2 mt-6 flex flex-col gap-y-4 lg:mt-0 lg:flex-row lg:gap-x-2 xl:mx-auto xl:flex xl:max-w-screen-2xl xl:px-10">
                <div className="flex items-center gap-x-2">
                    {footerPayment.slice(0, 5).map((item) => (
                        <Image
                            key={item}
                            src={item}
                            alt="footer-icon"
                            width={1000}
                            height={1000}
                            className="h-7 w-auto"
                        />
                    ))}
                </div>
                <div className="flex items-center gap-x-2">
                    {footerPayment.slice(5, 11).map((item) => (
                        <Image
                            key={item}
                            src={item}
                            alt="footer-icon"
                            width={1000}
                            height={1000}
                            className="h-7 w-auto"
                        />
                    ))}
                </div>
            </div>
            <div className="ml-2 mt-6 flex items-center gap-x-6 lg:mt-8 xl:mx-auto xl:flex xl:max-w-screen-2xl xl:px-10">
                {footerSocial.map((item) => (
                    <Link
                        className="text-secondary"
                        href={item.link}
                        key={item.key}>
                        {item.icon}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Footer;
